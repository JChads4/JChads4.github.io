// Screenshot a whole page at an exact CSS width. Headless Chrome clamps its
// window to a 500px minimum, so a 400px layout can only be reached through
// CDP's device metrics override.
//
//   node scripts/shot.mjs <url> <width> <out.png>

import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const [url, w = '400', out = '.shots/shot.png'] = process.argv.slice(2);
const port = 9223;

const proc = spawn(
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/shot-profile',
    'about:blank',
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 50 && !target; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/new?${url}`, {
      method: 'PUT',
    });
    if (res.ok) target = await res.json();
  } catch {
    /* not up yet */
  }
  if (!target) await sleep(200);
}
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

await send('Emulation.setDeviceMetricsOverride', {
  width: Number(w),
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await send('Page.enable');
await send('Page.reload');
await sleep(1500);

const metrics = await send('Page.getLayoutMetrics');
const full = Math.ceil(metrics.result.cssContentSize.height);

const shot = await send('Page.captureScreenshot', {
  format: 'png',
  captureBeyondViewport: true,
  clip: { x: 0, y: 0, width: Number(w), height: full, scale: 1 },
});
writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
console.log(`${out} ${w}x${full}`);
ws.close();
proc.kill();
process.exit(0);
