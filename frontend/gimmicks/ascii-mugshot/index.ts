import asciify from "asciify-image";
import Convert from "ansi-to-html";
import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import os from "os";
import puppeteer, { type Browser } from "puppeteer";

async function convert(
  imagePath: string,
  outputColumns: number,
  id: string,
  browser: Browser
): Promise<string> {
  // Convert webp to temporary jpg
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ascii-"));
  const jpgPath = path.join(tempDir, "mugshot.jpg");
  const screenshotPath = path.join(tempDir, "screenshot.png");
  const image = sharp(imagePath);
  const width = (await image.metadata()).width!;
  const height = (await image.metadata()).height!;
  await image.jpeg().toFile(jpgPath);

  try {
    const asciiString = await new Promise<string>((resolve, reject) => {
      asciify(
        jpgPath,
        { fit: "width", width: outputColumns },
        (err: Error | null, asciified: string | string[]) => {
          if (err) {
            return reject(err);
          }
          resolve(asciified as string);
        }
      );
    });

    const html = new Convert().toHtml(asciiString);
    const page = await browser.newPage();
    await page.setViewport({
      width: Math.floor(26 * outputColumns), // Empirically determined
      get height() {
        return Math.round((height / width) * this.width);
      },
    });
    const fullHtml = `
        <html>
          <body style="margin: 0; font-size: 22px; font-family: monospace">
            ${html}
          </body>
        </html>
      `;
    console.log(`Mugshot ${id}: Waiting for page to load...`);
    await page.setContent(fullHtml, {
      waitUntil: "domcontentloaded",
    });
    console.log(`Mugshot ${id}: Taking screenshot...`);
    await page.screenshot({
      path: screenshotPath,
      omitBackground: true,
      fullPage: true,
    });
    const buffer = await fs.readFile(screenshotPath);
    return `data:image/png;base64,${buffer.toString("base64")}`;
  } finally {
    // Clean up temp directory
    await fs.rm(tempDir, { recursive: true });
  }
}

function rollupPlugin() {
  const regex0 = /^virtual:ascii-mugshot\//;
  // eslint-disable-next-line no-control-regex
  const regex1 = /^\x00virtual:ascii-mugshot\/(.+)/;
  let browser: Browser | null = null;
  let browserLoadingInProgress = false;

  return {
    name: "ascii-mugshot",
    resolveId(id: string) {
      if (regex0.test(id)) {
        return `\0${id}`;
      }
      return null;
    },
    async load(id: string) {
      if (!browser && !browserLoadingInProgress) {
        console.log(
          "Launching puppeteer browser for ASCII mugshot generation..."
        );
        browserLoadingInProgress = true;
        try {
          browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox"],
          });
        } finally {
          browserLoadingInProgress = false;
        }
      }
      const match = regex1.exec(id);
      if (!match) return null;
      const mugshotColumnWidth = Number(regex1.exec(id)![1]);
      console.log(`Generating ASCII mugshot ${id}...`);
      const dataUrl = await convert(
        path.resolve(__dirname, "../../src/assets/mugshot.webp"),
        mugshotColumnWidth,
        id,
        browser!
      );
      console.log(`Generated ASCII mugshot ${id}.`);
      return "export default " + JSON.stringify(dataUrl) + ";";
    },
    generateBundle() {
      if (browser) {
        console.log("Closing puppeteer browser...");
        browser.close();
        browser = null;
      }
    },
  };
}

export { convert, rollupPlugin };
