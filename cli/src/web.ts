import dns from "dns";
import { exec } from "child_process";
import { promisify } from "util";
import chalk from "chalk";
import { cmd } from "./lib";
import { iife } from "@veracioux/lib";
import undici from "undici";

const execAsync = promisify(exec);

export default cmd({
  command: "web",
  describe: "Manage web server",
  builder: (yargs) =>
    yargs.command({
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
                  console.error(e);
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
    }),
  handler: (args) => {
    throw new Error("Function not implemented.");
  },
});
