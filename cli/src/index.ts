#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import cvCommand from "./cv";
import passCommand from "./pass";
import webCommand from "./web";

const cli = yargs(hideBin(process.argv))
  .scriptName("@veracioux/cli")
  .command(cvCommand)
  .command(passCommand)
  .command(webCommand)
  .help()
  .alias("help", "h");

await cli.parseAsync();
