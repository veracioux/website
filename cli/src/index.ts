#!/usr/bin/env bun

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import cvCommand from "./cv";
import passCommand from "./pass";
import webCommand from "./web";
import { failExit, findUpwardFile, getEnv } from "./lib";
import path from "path";
import chalk from "chalk";

const env = await getEnv().catch((e) => failExit(e.message));

if (env === "dev" && !process.env.VERACIOUX_IS_DEV_CLI) {
  const projectRoot = path.dirname(
    (await findUpwardFile(process.cwd(), ".veracioux-website-repo-root"))!
  );
  console.log(chalk.yellow.bold("Running local @veracioux/cli in dev mode..."));
  await Bun.spawn({
    cmd: ["bun", "run", "cli", ...hideBin(process.argv)],
    cwd: projectRoot,
    stdout: "inherit",
    env: {
      ...process.env,
      BUN_OPTIONS: "",
      NODE_OPTIONS: "",
    },
  }).exited;
} else {
  const cli = yargs(hideBin(process.argv))
    .scriptName(
      process.argv[0] === "veracioux" ? "veracioux" : "@veracioux/cli"
    )
    .command(cvCommand)
    .command(passCommand)
    .command(webCommand)
    .help()
    .alias("help", "h");

  await cli.parseAsync();
}
