import asciify from "asciify-image";
import Convert from "ansi-to-html";
import path from "path";
import { minify } from "html-minifier";
import sharp from "sharp";
import fs from "fs/promises";
import os from "os";

async function convert(
  imagePath: string,
  outputColumns: number
): Promise<string> {
  // Convert webp to temporary jpg
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ascii-"));
  const jpgPath = path.join(tempDir, "mugshot.jpg");
  await sharp(imagePath).jpeg().toFile(jpgPath);

  try {
    return await new Promise((resolve, reject) => {
      asciify(
        jpgPath,
        { fit: "width", width: outputColumns },
        (err: Error | null, asciified: string | string[]) => {
          if (err) {
            return reject(err);
          }
          const convert = new Convert();
          resolve(convert.toHtml(asciified as string));
        }
      );
    });
  } finally {
    // Clean up temp directory
    await fs.rm(tempDir, { recursive: true });
  }
}

function rollupPlugin() {
  const regex0 = /^virtual:ascii-mugshot\//;
  // eslint-disable-next-line no-control-regex
  const regex1 = /^\x00virtual:ascii-mugshot\/(.+)/;

  return {
    name: "ascii-mugshot",
    resolveId(id: string) {
      if (regex0.test(id)) {
        return `\0${id}`;
      }
      return null;
    },
    async load(id: string) {
      const match = regex1.exec(id);
      if (!match) return null;
      const mugshotColumnWidth = Number(regex1.exec(id)![1]);
      const html = await convert(
        path.resolve(__dirname, "../../src/assets/mugshot.webp"),
        mugshotColumnWidth
      );
      return "export default " + JSON.stringify(minify(html)) + ";";
    },
  };
}

export { convert, rollupPlugin };
