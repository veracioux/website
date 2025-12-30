import { CommandModule } from "yargs";

export default {
  command: "web",
  describe: "Manage web server",
  builder: (yargs) =>
    yargs.command({
      command: "info",
      describe: "Show web server info",
      async handler() {
        // TODO
      },
    }),
  handler: (args) => {
    throw new Error("Function not implemented.");
  },
} satisfies CommandModule;
