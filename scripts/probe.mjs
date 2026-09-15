// Measure a rendered page with headless Chrome over CDP, so claims about the
// measure and about horizontal overflow come from geometry rather than from
// reading a screenshot.
//
//   node scripts/probe.mjs <url> <width> [height] [screen|print]
//
// The width is set on the layout viewport rather than on the window, because
// headless Chrome clamps its window to 500px and the interesting breakpoints
// here are all narrower than that. Pass `print` to measure under the print
// stylesheet without producing a PDF.

import { spawn } from 'node:child_process';

const [url, w = '1280', h = '900', media = 'screen'] = process.argv.slice(2);
const port = 9222;

const proc = spawn(
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    `--window-size=${w},${h}`,
    '--user-data-dir=/tmp/probe-profile',
    'about:blank',
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cdpTarget() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/new?${url}`, {
        method: 'PUT',
      });
      if (res.ok) return await res.json();
    } catch {
      /* chrome not up yet */
    }
    await sleep(200);
  }
  throw new Error('chrome did not start');
}

const target = await cdpTarget();
await sleep(800);

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};
const send = (method, params) =>
  new Promise((resolve) => {
    const myId = ++id;
    pending.set(myId, resolve);
    ws.send(JSON.stringify({ id: myId, method, params }));
  });

// Headless Chrome refuses a window narrower than 500px, so the width is set on
// the layout viewport instead. `mobile: false` keeps the media queries honest.
await send('Emulation.setDeviceMetricsOverride', {
  width: Number(w),
  height: Number(h),
  deviceScaleFactor: 1,
  mobile: false,
});
await send('Page.enable');
if (media === 'print') {
  await send('Emulation.setEmulatedMedia', { media: 'print' });
}
await send('Page.reload');
await sleep(1500);

const expression = `(() => {
  const out = {};
  const de = document.documentElement;
  out.pageWidth = de.scrollWidth;
  out.viewport = de.clientWidth;
  out.overflow = de.scrollWidth - de.clientWidth;
  // An element that reaches past the viewport is only a defect if no ancestor
  // scrolls it: a wide display equation inside an overflow-x:auto block is the
  // intended shape.
  const contained = (el) => {
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      const ox = getComputedStyle(n).overflowX;
      if (ox === 'auto' || ox === 'scroll' || ox === 'hidden') return true;
    }
    return false;
  };
  const wide = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.getBoundingClientRect().right > de.clientWidth + 1 && !contained(el)) {
      wide.push(el.tagName.toLowerCase() + '.' + (el.className || '') + ' -> ' + Math.round(el.getBoundingClientRect().right));
    }
  }
  out.uncontained = wide.slice(0, 10);
  const p = document.querySelector('.page-head p, .post-body p');
  if (p) out.paraWidth = Math.round(p.getBoundingClientRect().width);
  const main = document.querySelector('main');
  if (main) out.mainWidth = Math.round(main.getBoundingClientRect().width);
  const row = document.querySelector('.index-row');
  if (row) out.rowWidth = Math.round(row.getBoundingClientRect().width);
  const rail = document.querySelector('.rail');
  if (rail) out.railWidth = Math.round(rail.getBoundingClientRect().width);
  const railNav = document.querySelector('.rail-nav');
  if (railNav) out.railPosition = getComputedStyle(railNav).position;
  // The heading is the first child of its year group, so the thing above it
  // is the group's previous sibling, not the heading's own.
  const headings = [...document.querySelectorAll('.year-heading')].map((el) => {
    const above =
      el.previousElementSibling ??
      el.parentElement.previousElementSibling;
    return above
      ? Math.round(el.getBoundingClientRect().top - above.getBoundingClientRect().bottom)
      : 'first';
  });
  if (headings.length) out.gapAboveYearHeading = headings;
  // A listing row is a three-column grid on screen. If print collapses it, the
  // type label, the title and the links stack, which is what the printed
  // /publications/ PDF appeared to do.
  const pr = document.querySelector('.index-block--pub .index-row');
  if (pr) {
    out.rowDisplay = getComputedStyle(pr).display;
    out.rowCols = getComputedStyle(pr).gridTemplateColumns;
    out.rowItems = [...pr.children].map((el) => ({
      cls: el.className,
      x: Math.round(el.getBoundingClientRect().left),
      w: Math.round(el.getBoundingClientRect().width),
    }));
  }
  return JSON.stringify(out);
})()`;

const res = await send('Runtime.evaluate', { expression, returnByValue: true });
console.log(res.result?.result?.value ?? JSON.stringify(res));
ws.close();
proc.kill();
process.exit(0);
