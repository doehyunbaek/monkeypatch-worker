import { test, expect } from '@playwright/test';

// Script that monkeypatches WebAssembly.instantiate to collect the buffer lengths
const monkeyPatch = `
let bufferLengths = []
let originalInstantiate = WebAssembly.instantiate;
WebAssembly.instantiate = function (buffer, importObject) {
  bufferLengths.push(buffer.byteLength)
  importObjects.push(JSON.stringify(importObject))
  return originalInstantiate(buffer, importObject)
};
`

test('Page.workers @smoke', async function({ page}) {
  // Where actual script injection happens
  await page.route('**/worker.js', async route => {
    const response = await route.fetch();
    const script = await response.text();
    await route.fulfill({ response, body: monkeyPatch + script });
  });

  // Wait for the worker to be created
  await Promise.all([
    page.waitForEvent('worker'),
    page.goto('http://localhost:5173/')]);
  const worker = page.workers()[0];

  // Now we get the collected buffer length
  let bufferLengths = await expect.poll(async () => await worker.evaluate(() => bufferLengths)).toStrictEqual([41]);
});