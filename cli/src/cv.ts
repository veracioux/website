import { launch } from "puppeteer";
import { writeFile, mkdir } from "fs/promises";
import path, { dirname } from "path";
import { iife, sleep } from "@veracioux/lib";
import * as readline from "readline";
import { cmd, failExit } from "./lib";

export default cmd({
  command: "cv",
  describe: "Generate CV as PDF",
  builder: (yargs) =>
    yargs
      .option("output", {
        alias: "o",
        describe: "Output path for PDF file",
        type: "string",
      })
      .option("directory", {
        alias: "d",
        describe:
          "Output directory for PDF file (default file name: CV_Haris_Gusic.pdf or Resume_Haris_Gusic.pdf)",
        type: "string",
      })
      .option("resume", {
        alias: "r",
        describe: "Use resume format",
        type: "boolean",
        default: false,
      })
      .option("debug", {
        describe:
          "Run in headed mode and require confirmation before generating PDF from page",
        type: "boolean",
        default: false,
      }),
  handler: async (argv) => {
    const outputPath = iife(() => {
      if (!argv.output && !argv.directory) {
        failExit("Either --output or --directory must be specified");
      }
      return `${argv.directory ? argv.directory + path.sep : ""}${`${
        argv.resume ? "Resume" : "CV"
      }_Haris_Gusic.pdf`}`;
    });

    const browser = await launch({
      headless: !argv.debug ? "new" : false,
      devtools: argv.debug,
    });
    const [page] = await browser.pages();
    await page.setViewport({
      width: 1400,
      height: 1000,
      deviceScaleFactor: 1,
    });
    await page.setCacheEnabled(false);
    await page.goto(`http://localhost:8080/cv?resume=${argv.resume}`, {
      waitUntil: "networkidle2",
    });
    await page.emulateMediaType("print");

    // In debug mode, allow the user to inspect the page before generating the PDF
    if (argv.debug) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      await new Promise<void>((resolve) => {
        rl.question("Press Enter to generate PDF...", () => {
          rl.close();
          resolve();
        });
      });
    }

    await page.addStyleTag({
      content: `
          body {
            background: white !important;
          }
        `,
    });

    await sleep(1000); // Wait for any unsettled operations

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      displayHeaderFooter: false,
    });

    await browser.close();

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, pdf);
  },
});
