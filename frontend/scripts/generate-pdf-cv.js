const puppeteer = require("puppeteer");
const fs = require("fs");

async function printPdf() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/cv", {waitUntil: "networkidle0"});
    const pdf = await page.pdf({format: "A4"});

    browser.close();

    const dir = __dirname + "/../.output";
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dir + "/cv.pdf", pdf);
}

printPdf();