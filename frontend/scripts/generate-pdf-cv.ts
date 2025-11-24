import { launch } from "puppeteer";
import { writeFileSync, mkdirSync } from "fs";

// TODO document env variable
const variant: string = process.env.VARIANT ?? "";

async function printPdf(): Promise<void> {
  const browser = await launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://localhost:3000/cv?render=pdf&variant=${variant}`, {
    waitUntil: "networkidle2",
  });
  const pdf = await page.pdf({ format: "A4", printBackground: true });

  await browser.close();

  const dir = __dirname + "/../dist";
  mkdirSync(dir, { recursive: true });
  writeFileSync(dir + "/cv.pdf", pdf);
}

printPdf();
