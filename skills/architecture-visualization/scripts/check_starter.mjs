import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

// Tests the bundled starter's JavaScript in a small DOM/history simulation.
// It does not test browser rendering, animation, print or real accessibility.
const source = fs.readFileSync(new URL('../assets/architecture-canvas-starter.html', import.meta.url), 'utf8');
const code = source.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(code, 'Starter script is missing');
assert.ok(!/(?:src|href)\s*=\s*["']https?:/i.test(source), 'External HTML dependency');
assert.ok(!/url\(\s*["']?https?:/i.test(source), 'External CSS dependency');

function boot(hash = '') {
  const elements = {};
  for (const match of source.matchAll(/\bid="([^"]+)"/g)) {
    assert.ok(!elements[match[1]], `Duplicate ID: ${match[1]}`);
    elements[match[1]] = {
      events: {},
      addEventListener(name, callback) { this.events[name] = callback; },
      setAttribute(name, value) { this[name] = value; },
      toggleAttribute(name, value) { this[name] = value; }
    };
  }
  const names = [...source.matchAll(/data-view-button="([^"]+)"/g)].map(match => match[1]);
  const buttons = names.map(name => ({
    events: {},
    getAttribute() { return name; },
    addEventListener(event, callback) { this.events[event] = callback; },
    setAttribute(key, value) { this[key] = value; }
  }));
  const listeners = {}, styles = {}, entries = [hash];
  let index = 0;
  const window = {
    innerWidth: 1366, innerHeight: 768, location: { hash },
    addEventListener(event, callback) { listeners[event] = callback; }
  };
  const emit = event => listeners[event]?.();
  window.history = {
    pushState(_state, _title, fragment) {
      entries.splice(index + 1); entries.push(fragment); index++;
      window.location.hash = fragment;
    },
    replaceState(_state, _title, fragment) {
      entries[index] = fragment; window.location.hash = fragment;
    },
    back() {
      if (index) { window.location.hash = entries[--index]; emit('popstate'); emit('hashchange'); }
    },
    forward() {
      if (index < entries.length - 1) { window.location.hash = entries[++index]; emit('popstate'); emit('hashchange'); }
    }
  };
  const document = {
    documentElement: { style: { setProperty(key, value) { styles[key] = value; } } },
    getElementById(id) { assert.ok(elements[id], `Unknown ID: ${id}`); return elements[id]; },
    querySelectorAll() { return buttons; }
  };
  vm.runInNewContext(code, { window, document, Math, String });
  const active = name => assert.equal(buttons[names.indexOf(name)]['aria-pressed'], 'true', `Inactive view: ${name}`);
  const fit = () => {
    const [, , width, height] = elements.canvas.viewBox.split(' ').map(Number);
    const rendered = Number.parseFloat(styles['--diagram-width']);
    assert.ok(rendered + 84 <= window.innerWidth + 0.01, 'Does not fit horizontally');
    assert.ok(rendered * height / width + 94 <= window.innerHeight + 0.01, 'Does not fit vertically');
  };
  return { window, elements, buttons, names, styles, entries, emit, active, fit };
}

const test = boot();
test.active('overview'); test.fit();
assert.equal(test.window.location.hash, '#overview');
test.buttons[1].events.click(); test.active('application');
assert.equal(test.elements['scene-overview'].hidden, false, 'Application lost its system context');
assert.equal(test.elements['scene-application'].hidden, false);
let prevented = false;
test.buttons[2].events.keydown({ key: 'Enter', preventDefault() { prevented = true; } });
assert.ok(prevented); test.active('analysis'); test.fit();
assert.equal(test.elements['scene-overview'].hidden, true);
assert.equal(test.elements['scene-analysis'].hidden, false);
boot(test.window.location.hash).active('analysis'); // Refresh the selected hash.
test.window.history.back(); test.active('application');
test.window.history.back(); test.active('overview');
test.window.history.forward(); test.active('application');
test.window.history.forward(); test.active('analysis');
const count = test.entries.length;
test.buttons[2].events.click();
assert.equal(test.entries.length, count, 'Repeated selection duplicated history');
test.window.location.hash = '#application'; test.emit('hashchange'); test.active('application');
for (const name of ['overview', 'application', 'analysis']) { const direct = boot('#' + name); direct.active(name); direct.fit(); }
boot('#ANALYSIS').active('analysis');
const fallback = boot('#invalid'); fallback.active('overview'); assert.equal(fallback.window.location.hash, '#overview');
const zoom = boot('#analysis');
const initialWidth = Number.parseFloat(zoom.styles['--diagram-width']);
zoom.elements['zoom-in'].events.click();
assert.ok(Number.parseFloat(zoom.styles['--diagram-width']) > initialWidth);
zoom.elements['zoom-reset'].events.click(); zoom.fit();
zoom.window.innerWidth = 1024; zoom.window.innerHeight = 600; zoom.emit('resize'); zoom.fit();
for (let n = 0; n < 20; n++) zoom.elements['zoom-out'].events.click();
assert.equal(zoom.elements['zoom-out'].disabled, true);
for (let n = 0; n < 20; n++) zoom.elements['zoom-in'].events.click();
assert.equal(zoom.elements['zoom-in'].disabled, true);
console.log('Starter logic passed: hash/default/direct links, refresh, history, keyboard, fit, zoom limits and resize.');
console.log('This check does not validate browser rendering, animation, print or accessibility.');
