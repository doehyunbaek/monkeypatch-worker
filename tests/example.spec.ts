import { test, expect } from '@playwright/test';

test('Page.workers @smoke', async function({ page}) {
  // await page.addInitScript(monkeyPatch);
  // await page.route('**/*.js', async route => {
  //   const response = await route.fetch();
  //   const script = await response.text();
  //   await route.fulfill({ response, body: monkeyPatch + script });
  // });
  // await Promise.all([
  //   page.waitForEvent('worker'),
  //   page.goto('http://localhost:5173/')]);
  // const worker = page.workers()[0];
  
  // expect(await page.evaluate(() => self['workerFunction']())).toBe('42');
  // expect(await worker.evaluate(() => self['workerFunction']())).toBe('42');
});