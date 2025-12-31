import dns from "dns";
import { exec, execFileSync, spawn } from "child_process";
import { promisify } from "util";
import { isIPv4 } from "net";
import chalk from "chalk";
import { cmd, failExit } from "./lib";
import { iife } from "@veracioux/lib";
import undici from "undici";
import { $ } from "bun";

const execAsync = promisify(exec);

export default cmd({
  command: "web",
  describe: "Manage web server",
  builder: (yargs) =>
    yargs
      .command({
        command: "info",
        describe: "Show web server info",
        async handler() {
          const domains = ["veracioux.me", "stg.veracioux.me"];
          const promises = [];
          const timeout = 1000;
          for (const domain of domains) {
            promises.push(
              iife(async () => {
                try {
                  const addresses = await dns.promises.resolve4(domain);
                  let status: string = "";
                  try {
                    await execAsync(`ping -c 1 ${domain}`, {
                      signal: AbortSignal.timeout(timeout),
                    });
                    status += "  " + chalk.green(`PING ✅`);
                  } catch (e: any) {
                    if (e.name === "AbortError")
                      status += "  " + chalk.red(`PING ⌛`);
                    else status += "  " + chalk.red(`PING ❌`);
                  }
                  try {
                    const response = await undici.fetch(
                      `https://${domain}/status`,
                      {
                        signal: AbortSignal.timeout(timeout),
                        dispatcher: new undici.Agent({
                          connect: { rejectUnauthorized: false },
                        }),
                      }
                    );
                    const statusEmoji = response.ok ? "✅" : "❌";
                    status += "  " + chalk.green(`/status ${statusEmoji}`);
                  } catch (e: any) {
                    if (e.name === "AbortError")
                      status += "  " + chalk.red(`/status ⌛`);
                    else status += "  " + chalk.red(`/status ❌`);
                  }
                  console.log(`${chalk.bold(domain)}: ${addresses.join(", ")}`);
                  console.log(status);
                } catch (err) {
                  console.log(chalk.red(`${chalk.bold(domain)}: ${err}`));
                }
              })
            );
          }
          await Promise.all(promises);
        },
      })
      .command({
        command: "update-ip <ip>",
        builder: (yargs) =>
          yargs
            .positional("ip", {
              describe: "New IP address to set in DNS records",
              type: "string",
              demandOption: true,
            })
            .option("stg", {
              desc: "Use staging environment as target",
              type: "boolean",
            })
            .option("prod", {
              desc: "Use production environment as target",
              type: "boolean",
            })
            .conflicts("stg", "prod"),
        async handler(argv) {
          if (!argv.stg && !argv.prod)
            failExit("Please specify either --stg or --prod option.");

          if (!isIPv4(argv.ip))
            failExit("Invalid IPv4 address format.");

          const log = (msg: string) =>
            console.log(chalk.bgYellow.black.bold(" " + msg + " "));

          const hostname = argv.stg ? "stg.veracioux.me" : "veracioux.me";
          log("Removing SSH host key");
          await $`ssh-keygen -R ${hostname}`;
          log(`Updating DNS A record for ${hostname}`);
          await $`gcloud dns record-sets update --type=A ${hostname} --rrdatas=${argv.ip} --zone=veracioux`;
          log("Updating SSH known hosts");
          await $`ssh ${hostname} true`;
          if (argv.prod) {
            await $`sudo systemd-resolve --flush-caches`;
            await $`sudo hostess add me ${argv.ip}`;
            await $`ssh me true`;
          }
        },
      }),
  handler: () => {
    console.log("Use a subcommand, see --help for more info.");
  },
});
