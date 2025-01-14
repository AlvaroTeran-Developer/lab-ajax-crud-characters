const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5500/index.html");
  setInterval(async () => {
    await page.waitForSelector("#new-character-form");
    await page.type("#nameNew", "BotSmashTheAPI");
    await page.waitForSelector("#new-character-form");
    await page.type("#occupationNew", "BotSmashTheAPI");
    await page.waitForSelector("#new-character-form");
    await page.type("#weaponNew", "BotSmashTheAPI");
    await page.waitForSelector("#new-character-form");
    await page.click("#send-data");
    await page.alert("KABOOOM");
  }, 1000);
})();
