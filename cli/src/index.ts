import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import cvCommand from "./cv";

function failExit(msg: string, exitCode = 1) {
  if (msg) console.error("Error:", msg);
  process.exit(exitCode);
}

const cli = yargs(hideBin(process.argv))
  .scriptName("@veracioux/cli")
  .command(cvCommand)
  .help()
  .alias("help", "h");

await cli.parseAsync();
