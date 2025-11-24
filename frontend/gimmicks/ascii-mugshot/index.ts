// @ts-expect-error No types available
import * as asciify from "asciify-image";
// @ts-expect-error No types available
import * as Convert from "ansi-to-html";
import path from "path";
import { minify } from "html-minifier";

async function convert(
  imagePath: string,
  outputColumns: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    asciify(
      imagePath,
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
        path.resolve(__dirname, "../../src/assets/mugshot.jpg"),
        mugshotColumnWidth
      );
      return "export default " + JSON.stringify(minify(html)) + ";";
    },
  };
}

export { convert, rollupPlugin };
