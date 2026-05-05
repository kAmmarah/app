import { chromium } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3000/');
  
  // Wait for login screen and enter a name
  await page.waitForSelector('input[placeholder="Your Name"]', { timeout: 10000 });
  await page.fill('input[placeholder="Your Name"]', 'Admin');
  await page.click('button:has-text("Enter Workspace")');
  
  // Wait for dashboard to load
  await page.waitForSelector('h1:has-text("Dashboard Overview")', { timeout: 10000 });
  
  // Take screenshot
  const screenshotPath = '/Users/ammarah/.gemini/antigravity/brain/d4971768-cac0-44ed-8dd5-84d73c82eb72/dashboard.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  
  console.log('Screenshot saved to:', screenshotPath);
  await browser.close();
})();
