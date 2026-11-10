import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {parseArgs} from 'node:util';

const {values,positionals}=parseArgs({allowPositionals:true,options:{'static-only':{type:'boolean'},'playwright-module':{type:'string'},'browser-executable':{type:'string'},'output-dir':{type:'string'},help:{type:'boolean'}}});
if(values.help){console.log('node scripts/check_canvas.mjs [canvas.html] [--static-only] [--playwright-module /path/to/playwright] [--browser-executable /path/to/chrome] [--output-dir /path/to/previews]');process.exit(0)}
const url=positionals[0]?pathToFileURL(path.resolve(positionals[0])):new URL('../assets/ecosystem-canvas-starter.html',import.meta.url);
const source=await fs.readFile(url,'utf8');
assert.ok(!/(?:src|href)\s*=\s*["']https?:/i.test(source),'External HTML dependency');
assert.ok(!/url\(\s*["']?https?:/i.test(source),'External CSS dependency');
const data=JSON.parse(source.match(/<script id="ecosystem-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
new vm.Script(source.match(/<script>([\s\S]*?)<\/script>/)[1]);
assert.ok(data.nodes.length&&data.edges.length,'Build the example model before validation');
const ids=[...source.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'Duplicate static ID');
if(values['static-only']){console.log('Passed: runtime syntax, embedded model, unique static IDs and offline dependencies. Browser behavior is unverified.');process.exit(0)}
const require=createRequire(import.meta.url);
const playwright=values['playwright-module']?require(path.resolve(values['playwright-module'])):await import('playwright');
const browser=await playwright.chromium.launch({headless:true,...(values['browser-executable']?{executablePath:path.resolve(values['browser-executable'])}:{})});
const page=await browser.newPage({viewport:{width:1680,height:1000},reducedMotion:'reduce'});
const errors=[],requests=[];const watch=p=>{p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url())})};watch(page);
const output=values['output-dir']?path.resolve(values['output-dir']):null;if(output)await fs.mkdir(output,{recursive:true});
const frame=p=>p.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
const fit=async p=>{await p.locator('#zoom-reset').click();const s=await p.evaluate(()=>({w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight,vw:document.documentElement.clientWidth,vh:document.documentElement.clientHeight,b:document.getElementById('canvas').getBoundingClientRect().bottom,t:document.querySelector('.zoom-controls').getBoundingClientRect().top}));assert.ok(s.w<=s.vw&&s.h<=s.vh,JSON.stringify(s));assert.ok(s.b<s.t-8,JSON.stringify(s))};
const camera=p=>p.evaluate(()=>{const r=document.getElementById('canvas').getBoundingClientRect();return {left:r.left,top:r.top,width:r.width,height:r.height,x:scrollX,y:scrollY,scale:visualViewport?.scale||1}});
try{
 await page.goto(url.href);assert.equal(new URL(page.url()).hash,'#ecosystem');await fit(page);
 assert.equal(await page.locator('[data-node]').count(),data.nodes.length);assert.equal(await page.locator('[data-edge]').count(),data.edges.length);
 if(output)await page.screenshot({path:path.join(output,'ecosystem.png'),fullPage:true});
 const first=data.nodes[0].id;
 await page.locator('[data-node="'+first+'"]').press('Enter');assert.equal(await page.locator('[data-node="'+first+'"]').getAttribute('aria-pressed'),'true');
 assert.equal(await page.locator('[data-edge][data-active="true"]').count(),data.edges.filter(e=>e.start===first||e.end===first).length);
 await page.locator('#map-clear').click();assert.equal(await page.locator('#scene').getAttribute('data-has-focus'),'false');
 for(const [id,j] of Object.entries(data.journeys)){
  await page.locator('[data-journey="'+id+'"]').press('Space');assert.equal(await page.locator('[data-edge][data-active="true"]').count(),j.links.length);assert.equal(await page.locator('#journey-select').inputValue(),id);
  await page.reload();assert.equal(await page.locator('#journey-select').inputValue(),id);
 }
 await page.locator('#map-clear').click();await page.locator('#toggle-detail').click();assert.equal(new URL(page.url()).hash,'#ecosystem?details=1');
 await page.reload();assert.equal(await page.locator('#toggle-detail').getAttribute('aria-pressed'),'true');
 const bounds=await page.locator('[data-node]').evaluateAll(nodes=>nodes.flatMap(n=>{const r=n.querySelector('[data-node-box]');return [...n.querySelectorAll('text')].filter(t=>{const b=t.getBBox();return b.x<0||b.y<0||b.x+b.width>+r.getAttribute('width')-6||b.y+b.height>+r.getAttribute('height')-4}).map(t=>({node:n.dataset.node,text:t.textContent}))}));assert.deepEqual(bounds,[]);
 const crossings=await page.locator('[data-edge]').evaluateAll(edges=>{const cards=[...document.querySelectorAll('[data-node]')].map(n=>{const m=n.transform.baseVal.consolidate().matrix,r=n.querySelector('[data-node-box]');return {id:n.dataset.node,x:m.e,y:m.f,w:+r.getAttribute('width'),h:+r.getAttribute('height')}});return edges.flatMap(e=>{const p=e.querySelector('.eco-link-base'),length=p.getTotalLength(),bad=new Set();for(let d=4;d<length-4;d+=4){const q=p.getPointAtLength(d);for(const c of cards)if(q.x>c.x+2&&q.x<c.x+c.w-2&&q.y>c.y+2&&q.y<c.y+c.h-2)bad.add(c.id)}return [...bad].map(id=>({edge:e.dataset.edge,card:id}))})});assert.deepEqual(crossings,[]);
 const j=Object.keys(data.journeys)[0];if(j){await page.locator('#journey-select').selectOption(j);await page.goBack();assert.equal(await page.locator('#journey-select').inputValue(),'all');await page.goForward();assert.equal(await page.locator('#journey-select').inputValue(),j)}
 await page.goto(url.href+'#invalid?journey=constructor&details=garbage');await page.waitForFunction(()=>location.hash==='#ecosystem');assert.equal(new URL(page.url()).hash,'#ecosystem');
 await page.emulateMedia({reducedMotion:'no-preference'});
 const kinds=[...new Set(data.edges.map(e=>e.kind))];
 const styles=await page.evaluate(kinds=>kinds.map(k=>{const e=document.querySelector('.eco-edge.'+k);const a=getComputedStyle(e.querySelector('.eco-link-base')),b=getComputedStyle(e.querySelector('.eco-packet'));return {color:a.stroke,pattern:b.strokeDasharray,duration:b.animationDuration}}),kinds);
 for(const k of ['color','pattern','duration'])assert.equal(new Set(styles.map(s=>s[k])).size,kinds.length);
 const packet=page.locator('.eco-packet').first(),before=await packet.evaluate(e=>getComputedStyle(e).strokeDashoffset);await page.waitForTimeout(170);assert.notEqual(await packet.evaluate(e=>getComputedStyle(e).strokeDashoffset),before);
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await packet.evaluate(e=>getComputedStyle(e).display),'none');
 await fit(page);const c=await camera(page),point={x:900,y:300},anchor={x:(point.x-c.left)/c.width,y:(point.y-c.top)/c.height};const cdp=await page.context().newCDPSession(page);
 await cdp.send('Input.dispatchMouseEvent',{type:'mouseWheel',x:point.x,y:point.y,deltaX:0,deltaY:-90,modifiers:2});await frame(page);const zoom=await camera(page);assert.ok(zoom.width>c.width);assert.ok(Math.abs(zoom.left+zoom.width*anchor.x-point.x)<3);assert.ok(Math.abs(zoom.top+zoom.height*anchor.y-point.y)<3);assert.equal(zoom.scale,1);
 await fit(page);
 for(const size of [{width:1280,height:720},{width:390,height:844},{width:844,height:390}]){await page.setViewportSize(size);await fit(page);const r=await page.locator('.zoom-controls').boundingBox();assert.ok(r.x>=0&&r.y>=0&&r.x+r.width<=size.width&&r.y+r.height<=size.height)}
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});const phone=await context.newPage();watch(phone);await phone.goto(url.href);await fit(phone);
 if(j){await phone.locator('#journey-select').selectOption(j);assert.equal(await phone.locator('[data-edge][data-active="true"]').count(),data.journeys[j].links.length)}
 await phone.locator('#map-clear').tap();await phone.locator('[data-node="'+first+'"]').tap();assert.equal(await phone.locator('[data-node="'+first+'"]').getAttribute('aria-pressed'),'true');await phone.locator('#map-clear').tap();
 const touch=await context.newCDPSession(phone),initial=await camera(phone),center={x:195,y:140};const points=span=>[{id:1,x:center.x-span/2,y:center.y,radiusX:4,radiusY:4,force:1},{id:2,x:center.x+span/2,y:center.y,radiusX:4,radiusY:4,force:1}];await touch.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points(70)});for(let n=1;n<=7;n++){await touch.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:points(70+n*18)});await frame(phone)}await touch.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await frame(phone);assert.ok((await camera(phone)).width>initial.width*2);assert.equal((await camera(phone)).scale,1);await fit(phone);
 for(const button of await phone.locator('.zoom-controls button').all()){const r=await button.boundingBox();assert.ok(r.width>=44&&r.height>=44)}
 if(output)await phone.screenshot({path:path.join(output,'phone.png')});await context.close();
 await page.locator('[data-node="'+first+'"]').press('Enter');await page.emulateMedia({media:'print'});assert.equal(await page.locator('.zoom-controls').isVisible(),false);assert.equal(await packet.evaluate(e=>getComputedStyle(e).display),'none');assert.equal(await page.locator('[data-node]').last().evaluate(e=>getComputedStyle(e).opacity),'1');
 assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
 const result={result:'passed',checks:['Model counts and evidence-preserving endpoints','Journeys, station focus, keyboard/touch reset','Detail/hash reload and back/forward','Text bounds and route/card separation','Distinct functional flow styles and reduced motion','Fit, focal wheel zoom and touchscreen pinch','Touch controls in both orientations','Complete print view and offline operation'],limit:'Chrome emulation does not verify physical trackpad/native Safari/iPhone/iPad behavior.'};
 if(output)await fs.writeFile(path.join(output,'verification.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
}finally{await browser.close()}
