const asciify = require("asciify-image");
const Convert = require("ansi-to-html");
const path = require("path");
const { minify } = require("html-minifier");

async function convert(imagePath, outputColumns) {
  return new Promise((resolve, reject) => {
    asciify(
      imagePath,
      { fit: "width", width: outputColumns },
      (err, asciified) => {
        if (err) {
          return reject(err);
        }
        const convert = new Convert();
        resolve(convert.toHtml(asciified));
      }
    );
  });
}

function rollupPlugin() {
  const regex0 = /^virtual:ascii-mugshot\//;
  const regex1 = /^\x00virtual:ascii-mugshot\/(.+)/;

  return {
    name: "ascii-mugshot",
    resolveId(id) {
      if (regex0.test(id)) {
        return `\0${id}`;
      }
      return null;
    },
    async load(id) {
      const match = regex1.exec(id);
      if (!match) return null;
      const mugshotColumnWidth = Number(regex1.exec(id)[1]);
      const html = await convert(
        path.resolve(__dirname, "../../src/assets/mugshot.jpg"),
        mugshotColumnWidth
      );
      return "export default " + JSON.stringify(minify(html)) + ";";
    },
  };
}

module.exports = {
  convert,
  rollupPlugin,
};
