import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import cvCommand from "./cv";
import passCommand from "./pass";

const cli = yargs(hideBin(process.argv))
  .scriptName("@veracioux/cli")
  .command(cvCommand)
  .command(passCommand)
  .help()
  .alias("help", "h");

await cli.parseAsync();
