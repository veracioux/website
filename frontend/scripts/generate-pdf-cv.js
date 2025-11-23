const puppeteer = require("puppeteer");
const fs = require("fs");

// TODO document env variable

const variant = process.env.VARIANT ?? "";

async function printPdf() {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  // TODO do not hardcode variant
  await page.goto(`http://localhost:3000/cv?render=pdf&variant=${variant}`, {
    waitUntil: "networkidle2",
  });
  const pdf = await page.pdf({format: "A4", printBackground: true});

  browser.close();

  const dir = __dirname + "/../dist";
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(dir + "/cv.pdf", pdf);
}

printPdf();
