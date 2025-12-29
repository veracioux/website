import { CommandModule } from "yargs";
import * as childProcess from "child_process";

export default {
  command: "web",
  describe: "Manage web server",
  builder: (yargs) =>
    yargs.command({
      command: "info",
      describe: "Show web server info",
      async handler() {
        // TODO
      }
    }),
} satisfies CommandModule;
