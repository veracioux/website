import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import cvCommand from "./cv";

const cli = yargs(hideBin(process.argv))
  .scriptName("@veracioux/cli")
  .command(cvCommand)
  .help()
  .alias("help", "h");

await cli.parseAsync();