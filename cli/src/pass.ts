import { exec, execFile, spawn } from "child_process";
import { promisify } from "util";
import * as readline from "readline";
import { cmd, failExit } from "./lib";

const execAsync = promisify(exec);
const spawnAsync = promisify(spawn);

async function checkHtpasswdAvailable(): Promise<void> {
  try {
    await execAsync("which htpasswd");
  } catch (error) {
    failExit(
      "htpasswd utility is not available. Please install apache2-utils or httpd-tools."
    );
  }
}

async function runHtpasswd(args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = execFile("htpasswd", args, (_1, _2, stderr) => {
      if (stderr.includes("not found")) {
        return reject(new Error(stderr.trim()));
      }
      resolve();
    });
    child.on("error", (error) => {
      reject(error);
    });
  });
}

export default cmd({
  command: "pass",
  describe: "Manage htpasswd files",
  builder: (yargs) =>
    yargs
      .command({
        command: "set <username> [password]",
        describe: "Set a user's password (or create)",
        builder: (yargs) =>
          yargs
            .positional("username", {
              describe: "Username to update",
              type: "string",
              demandOption: true,
            })
            .positional("password", {
              describe:
                "Password for the user (read from stdin if provided)",
              type: "string",
            })
            .option("file", {
              alias: "f",
              describe: "Path to htpasswd file",
              type: "string",
              demandOption: true,
            }),
        handler: async (argv) => {
          await checkHtpasswdAvailable();
          let pass = argv.password;
          if (!pass) {
            const rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout,
            });
            pass = await new Promise<string>((resolve) => {
              rl.question("Enter password: ", (answer) => {
                rl.close();
                resolve(answer);
              });
            });
          }
          await runHtpasswd(["-Bb", argv.file, argv.username, pass]).catch(
            (e) => failExit(e.message)
          );
        },
      })
      .command({
        command: "rm <username>",
        describe: "Remove user from htpasswd file",
        builder: (yargs) =>
          yargs
            .positional("username", {
              describe: "Username to remove",
              type: "string",
              demandOption: true,
            })
            .option("file", {
              alias: "f",
              describe: "Path to htpasswd file",
              type: "string",
              demandOption: true,
            }),
        handler: async (argv) => {
          await checkHtpasswdAvailable();
          await runHtpasswd(["-D", argv.file, argv.username]).catch((e) =>
            failExit(e.message)
          );
        },
      })
      .demandCommand(1, "You need at least one command"),
  handler: () => {
    // This won't be called since we demand a subcommand
  },
});
