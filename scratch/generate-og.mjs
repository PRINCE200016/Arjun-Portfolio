import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  
  const page = await browser.newPage();
  
  // 1200x630 is standard OG size. using exact 1 deviceScaleFactor so output matches.
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  
  const fileUrl = `file:///${__dirname.replace(/\\/g, '/')}/og-design.html`;
  console.log(`Loading: ${fileUrl}`);
  
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  
  // Wait for fonts to be ready
  await page.evaluateHandle('document.fonts.ready');
  // Extra wait for any glowing effects
  await new Promise(r => setTimeout(r, 1500));
  
  const outputPath = path.resolve(__dirname, '../public/images/og-image.png');
  console.log(`Saving to: ${outputPath}`);
  
  await page.screenshot({ path: outputPath, type: 'png' });
  
  await browser.close();
  console.log(`Done! Saved to ${outputPath}`);
})();
