import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {parseArgs} from 'node:util';

const {values}=parseArgs({options:{'static-only':{type:'boolean'},'playwright-module':{type:'string'},'browser-executable':{type:'string'},'output-dir':{type:'string'},help:{type:'boolean'}}});
if(values.help){
  console.log('Usage: node scripts/check_starter.mjs [--static-only] [--playwright-module /path/to/playwright] [--browser-executable /path/to/browser] [--output-dir /path/to/previews]');
  console.log('Static mode checks syntax/offline structure. Browser mode uses Playwright from the current environment or the supplied package; it does not install dependencies.');
  process.exit(0);
}
const asset=new URL('../assets/architecture-canvas-starter.html',import.meta.url);
const source=await fs.readFile(asset,'utf8');
assert.ok(!/(?:src|href)\s*=\s*["']https?:/i.test(source),'External HTML dependency');
assert.ok(!/url\(\s*["']?https?:/i.test(source),'External CSS dependency');
const script=source.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script,'Missing inline runtime');new vm.Script(script);
const data=JSON.parse(source.match(/<script id="strategy-data" type="application\/json">([\s\S]*?)<\/script>/)?.[1]);
assert.ok(data.functions.length>0,'Empty example map');
const staticIds=[...source.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(new Set(staticIds).size,staticIds.length,'Duplicate static ID');
if(values['static-only']){console.log('Static checks passed: JavaScript syntax, JSON data, unique static IDs and no external HTML/CSS dependencies. Browser behavior is unverified in this mode.');process.exit(0)}
const require=createRequire(import.meta.url);
let playwright;
try{playwright=values['playwright-module']?require(path.resolve(values['playwright-module'])):await import('playwright')}
catch{throw new Error('Playwright is unavailable. Use the environment’s browser tooling, supply --playwright-module, or run --static-only and report the verification limit.')}
const browser=await playwright.chromium.launch({headless:true,...(values['browser-executable']?{executablePath:path.resolve(values['browser-executable'])}:{})});
const errors=[],requests=[];
const watch=page=>{page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url())})};
const page=await browser.newPage({viewport:{width:1680,height:1000},reducedMotion:'reduce'});watch(page);
const url=asset.href;
const frame=p=>p.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
const state=p=>p.evaluate(()=>{const r=document.getElementById('canvas').getBoundingClientRect();return{left:r.left,top:r.top,width:r.width,height:r.height,x:scrollX,y:scrollY,scale:visualViewport?.scale||1,hash:location.hash}});
const near=(a,b,description,tolerance=2)=>assert.ok(Math.abs(a-b)<=tolerance,`${description}: ${a} vs ${b}`);
const focus=(s,p)=>({x:(p.x-s.left)/s.width,y:(p.y-s.top)/s.height});
const fixed=(s,anchor,p)=>{near(s.left+s.width*anchor.x,p.x,'Horizontal anchor');near(s.top+s.height*anchor.y,p.y,'Vertical anchor')};
const view=name=>page.locator('[data-view-button="'+name+'"]');
const layer=name=>page.locator('[data-layer="'+name+'"]:visible');
const fit=async p=>{await p.locator('#zoom-reset').click();const s=await p.evaluate(()=>({w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight,vw:document.documentElement.clientWidth,vh:document.documentElement.clientHeight,plot:document.getElementById('canvas').getBoundingClientRect().bottom,controls:document.querySelector('.zoom-controls').getBoundingClientRect().top}));assert.ok(s.w<=s.vw&&s.h<=s.vh,JSON.stringify(s));assert.ok(s.plot<=s.controls-8,JSON.stringify(s))};
const output=values['output-dir']?path.resolve(values['output-dir']):null;
if(output)await fs.mkdir(output,{recursive:true});
try{
  await page.goto(url);assert.equal((await state(page)).hash,'#overview');await fit(page);
  const nodeBox=await page.locator('#scene-overview rect.node').first().boundingBox();
  await page.locator('#toggle-roles').click();await page.locator('#toggle-telemetry').click();
  assert.equal((await state(page)).hash,'#overview?layers=roles,telemetry');assert.ok(await layer('roles').count());assert.ok(await layer('telemetry').count());
  assert.deepEqual(await page.locator('#scene-overview rect.node').first().boundingBox(),nodeBox,'Layers moved the base nodes');
  await view('application').click();assert.equal(await page.locator('#scene-overview').isVisible(),true);assert.equal(await page.locator('#scene-application').isVisible(),true);
  assert.equal((await state(page)).hash,'#application?layers=roles,telemetry');await page.reload();assert.equal(await page.locator('#toggle-roles').getAttribute('aria-pressed'),'true');
  await page.locator('#toggle-roles').click();await page.goBack();assert.equal(await page.locator('#toggle-roles').getAttribute('aria-pressed'),'true');
  await view('analysis').press('Enter');assert.equal(await page.locator('#scene-overview').isVisible(),false);assert.equal(await page.locator('#scene-analysis').isVisible(),true);
  await view('strategy').press('Space');assert.equal(await page.locator('#scene-strategy').isVisible(),true);assert.equal(await page.locator('#toggle-roles').isVisible(),false);assert.equal(await page.locator('#map-clear').isVisible(),true);
  assert.equal(await page.locator('[data-strategy-function]').count(),data.functions.length);
  assert.equal(await page.locator('.map-leaf').count(),data.functions.reduce((total,item)=>total+item.examples.length,0));
  const duplicates=await page.locator('[id]').evaluateAll(nodes=>{const seen=new Set();return nodes.map(n=>n.id).filter(id=>seen.has(id)||!seen.add(id))});assert.deepEqual(duplicates,[]);
  const textOverflow=await page.locator('[data-strategy-function],.map-leaf').evaluateAll(nodes=>nodes.flatMap(node=>{const rect=node.querySelector('[data-function-box],[data-leaf-box]'),w=+rect.getAttribute('width'),h=+rect.getAttribute('height');return[...node.querySelectorAll('text')].filter(text=>{const b=text.getBBox();return b.x<0||b.y<0||b.x+b.width>w||b.y+b.height>h}).map(text=>text.textContent)}));assert.deepEqual(textOverflow,[]);
  const first=data.functions[0].id,second=data.functions[1]?.id||first;
  await page.locator('[data-strategy-function="'+first+'"]').click();assert.equal(await page.locator('[data-map-branch="'+first+'"]').getAttribute('data-active'),'true');
  await page.locator('[data-strategy-function="'+second+'"]').press('Enter');assert.equal(await page.locator('[data-strategy-function="'+second+'"]').getAttribute('aria-pressed'),'true');
  await page.locator('#map-clear').click();assert.equal(await page.locator('#scene-strategy').getAttribute('data-has-focus'),'false');
  await view('analysis').click();assert.equal(await page.locator('#toggle-roles').getAttribute('aria-pressed'),'true');assert.ok(await layer('telemetry').count());
  const historyLength=await page.evaluate(()=>history.length);await view('analysis').click();assert.equal(await page.evaluate(()=>history.length),historyLength);
  await page.goto(url+'#STRATEGY?layers=unknown,telemetry,roles,telemetry');assert.equal((await state(page)).hash,'#strategy?layers=roles,telemetry');
  await page.goto(url+'#constructor');assert.equal((await state(page)).hash,'#overview');
  for(const name of ['overview','application','analysis','strategy']){await page.goto(url+'#'+name+'?layers=roles,telemetry');await fit(page);if(output)await page.screenshot({path:path.join(output,name+'.png'),fullPage:true})}
  if(output){
    await page.goto(url+'#strategy');await fit(page);
    for(let n=0;n<8&&await page.locator('#zoom-in').isEnabled();n++)await page.locator('#zoom-in').click();
    await page.locator('[data-strategy-function="'+first+'"]').click();
    await page.locator('[data-map-branch="'+first+'"]').screenshot({path:path.join(output,'strategy-branch.png')});
    await page.locator('#map-clear').click();await fit(page);
  }
  await page.goto(url+'#overview');
  const wheel=await page.context().newCDPSession(page),point={x:1000,y:350};
  const start=await state(page),anchor=focus(start,point);
  await wheel.send('Input.dispatchMouseEvent',{type:'mouseWheel',x:point.x,y:point.y,deltaX:0,deltaY:-90,modifiers:2});await frame(page);
  const enlarged=await state(page);assert.ok(enlarged.width>start.width);fixed(enlarged,anchor,point);assert.equal(enlarged.scale,1);
  await page.mouse.move(800,400);await page.mouse.wheel(-70,-70);await frame(page);near((await state(page)).width,enlarged.width,'Ordinary wheel retained scale');
  await fit(page);assert.equal((await state(page)).x,0);assert.equal((await state(page)).y,0);
  for(const viewport of [{width:1280,height:720},{width:390,height:844}]){await page.setViewportSize(viewport);for(const name of ['overview','application','analysis','strategy']){await page.goto(url+'#'+name);await fit(page)}}
  const mobile=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  const phone=await mobile.newPage();watch(phone);await phone.goto(url+'#overview?layers=roles,telemetry');
  assert.equal(await phone.locator('#view-select').isVisible(),true);await fit(phone);
  const touch=await mobile.newCDPSession(phone),center={x:195,y:120};const initial=await state(phone),touchAnchor=focus(initial,center);
  const points=span=>[{id:1,x:center.x-span/2,y:center.y,radiusX:4,radiusY:4,force:1},{id:2,x:center.x+span/2,y:center.y,radiusX:4,radiusY:4,force:1}];
  await touch.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points(80)});
  for(let i=1;i<=8;i++){await touch.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:points(80+i*20)});await frame(phone)}
  await touch.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await frame(phone);
  const zoomed=await state(phone);assert.ok(zoomed.width>initial.width*2.5);fixed(zoomed,touchAnchor,center);assert.equal(zoomed.scale,1);
  await phone.locator('#zoom-reset').tap();await phone.locator('#view-select').selectOption('strategy');await fit(phone);
  await phone.locator('[data-strategy-function="'+first+'"]').tap();assert.equal(await phone.locator('[data-strategy-function="'+first+'"]').getAttribute('aria-pressed'),'true');
  await phone.locator('#map-clear').tap();assert.equal(await phone.locator('#scene-strategy').getAttribute('data-has-focus'),'false');
  await phone.reload();assert.equal(await phone.locator('#view-select').inputValue(),'strategy');
  for(const button of await phone.locator('.zoom-controls button:visible').all()){const b=await button.boundingBox();assert.ok(b.width>=44&&b.height>=44)}
  if(output)await phone.screenshot({path:path.join(output,'phone.png')});
  await phone.setViewportSize({width:844,height:390});await frame(phone);await fit(phone);if(output)await phone.screenshot({path:path.join(output,'phone-landscape.png')});
  await mobile.close();
  await page.emulateMedia({media:'print'});assert.equal(await page.locator('.zoom-controls').isVisible(),false);
  assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
  const report={result:'passed',checks:['Four views, direct links, refresh and history','Independent contextual layers without node movement','Mind-map data/leaf counts, unique IDs and text bounds','Click, keyboard and touch branch focus/reset','Fit, desktop pinch anchor and native scroll preservation','Mobile pinch, controls and both orientations','Print control hiding and no network requests'],limits:'Chrome emulation is not physical trackpad/iPhone/iPad/Safari verification.'};
  if(output)await fs.writeFile(path.join(output,'verification.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
}finally{await browser.close()}
