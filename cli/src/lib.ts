import * as fs from "fs/promises";
import * as path from "path";
import { CommandModule } from "yargs";

export async function findUpwardFile(
  startDir: string,
  targetFile: string
): Promise<string | null> {
  while (true) {
    const targetPath = path.join(startDir, targetFile);
    try {
      await fs.access(targetPath);
      return targetPath;
    } catch {
      const parentDir = path.dirname(startDir);
      if (parentDir === startDir) {
        return null;
      }
      startDir = parentDir;
    }
  }
}

export async function getRepoRoot() {
  const repoRootFile = await findUpwardFile(
    process.cwd(),
    ".veracioux-website-repo-root"
  );

  if (repoRootFile) {
    return path.dirname(repoRootFile);
  }

  return undefined;
}

export async function getEnv(): Promise<"stg" | "prod" | "dev"> {
  if (
    await fs
      .access("/etc/veracioux", fs.constants.R_OK)
      .then(() => true)
      .catch(() => false)
  ) {
    const hostname = (await fs.readFile("/etc/hostname", "utf-8")).trim();
    if (hostname === "prod-vm") {
      return "prod";
    } else if (hostname === "stg-vm") {
      return "stg";
    } else {
      throw new Error(
        `Unable to determine env: Hostname ${hostname} does not match {prod|stg}-vm`
      );
    }
  }

  if (await getRepoRoot()) {
    return "dev";
  }

  throw new Error(
    "Please run this command in the veracioux/website repository or on a prod/stg VM."
  );
}

export function failExit(msg: string, exitCode = 1) {
  if (msg) console.error("Error:", msg);
  process.exit(exitCode);
}

export function cmd<T, U>(command: CommandModule<T, U>): CommandModule<T, U> {
  return command;
}
