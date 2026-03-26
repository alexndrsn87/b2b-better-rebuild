const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://built-better.vercel.app/');
  
  // Wait for the page to load and animations to settle
  await page.waitForTimeout(5000);
  
  // Take a full page screenshot
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  
  await browser.close();
})();
