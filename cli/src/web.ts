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

const TIMEOUT = 1000;

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
          for (const domain of domains) {
            promises.push(
              iife(async () => {
                try {
                  const addresses = await dns.promises.resolve4(domain);
                  let status: string = "";
                  try {
                    await execAsync(`ping -c 1 ${domain}`, {
                      signal: AbortSignal.timeout(TIMEOUT),
                    });
                    status += "  " + chalk.green(`PING ✅`);
                  } catch (e: any)  {
                    if (e.name === "AbortError")
                      status += "  " + chalk.red(`PING ⌛`);
                    else status += "  " + chalk.red(`PING ❌`);
                  }
                  try {
                    const response = await undici.fetch(
                      `https://${domain}/status`,
                      {
                        signal: AbortSignal.timeout(TIMEOUT),
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
                  let tlsInfo = await getTLSInfo(domain);
                  console.log(`${chalk.bold(domain)}: ${addresses.join(", ")}`);
                  console.log(status + "  " + tlsInfo);
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

          if (!isIPv4(argv.ip)) failExit("Invalid IPv4 address format.");

          const log = (msg: string) =>
            console.log(chalk.bgYellow.black.bold(" " + msg + " "));

          const hostname = argv.stg ? "stg.veracioux.me" : "veracioux.me";
          log("Removing SSH host key");
          await $`ssh-keygen -R ${hostname}`;
          log(`Updating DNS A record for ${hostname}`);
          await $`gcloud dns record-sets update --type=A ${hostname} --rrdatas=${argv.ip} --zone=veracioux`;
          log("Updating SSH known hosts");
          await $`ssh ${hostname} true`;
          log("Flushing local DNS cache");
          await $`sudo systemd-resolve --flush-caches`;
          if (argv.prod) {
            await $`sudo hostess add me ${argv.ip}`;
            await $`ssh me true`;
          }
        },
      }),
  handler: () => {
    console.log("Use a subcommand, see --help for more info.");
  },
});

async function getTLSInfo(domain: string): Promise<string> {
  let tlsInfo = "";
  try {
    const result = await execAsync(
      `openssl s_client -connect ${domain}:443 -servername ${domain} < /dev/null 2>/dev/null | openssl x509 -noout -dates`,
      { timeout: TIMEOUT }
    );
    const lines = result.stdout.trim().split("\n");
    const notAfterLine = lines.find((l) => l.startsWith("notAfter="));
    if (notAfterLine) {
      const notAfter = notAfterLine.split("=")[1];
      const expDate = new Date(notAfter);
      const now = new Date();
      const diffMs = expDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      const expiresIn = diffDays > 0 ? `${diffDays} days` : "EXPIRED";
      const color =
        diffDays > 30 ? chalk.green : diffDays > 7 ? chalk.yellow : chalk.red;
      tlsInfo += color(`${color.bold(" TLS " + expiresIn)} (${color(expDate.toISOString())})`);
    } else {
      tlsInfo += `  ${chalk.red("TLS info unavailable")}`;
    }
  } catch (e: any) {
    if (e.signal === "SIGTERM") {
      tlsInfo += chalk.red(" TLS timeout");
    } else {
      tlsInfo += chalk.red(" TLS info unavailable");
    }
  }
  return tlsInfo;
}
