import { test, expect } from '@playwright/test';

const monkeyPatch = () => {
  Math.random = () => 42;
};

test('Page.workers @smoke', async function({ page}) {
  page.on('console', msg => console.log(msg));
  await page.addInitScript(monkeyPatch);
  // such api does not exist
  // await worker.addInitScript(monkeyPatch);
  
  // while initializing the worker, the monkey patch is not applied.
  await Promise.all([
    page.waitForEvent('worker'),
    page.goto('http://localhost:5173/')]);
  const worker = page.workers()[0];
  
  // this works but comes too late.
  await worker.evaluate(monkeyPatch);
  expect(await page.evaluate(() => self['workerFunction']())).toBe('42');
  expect(await worker.evaluate(() => self['workerFunction']())).toBe('42');
});