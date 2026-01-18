import { Injectable, OnModuleInit } from "@nestjs/common";
import NodeCache from "node-cache";
import { promisify } from "util";

import { exec as _exec } from "child_process";

const exec = promisify(_exec);

type SecretConfig = {
  /** Name of the secret in `pass` */
  pass?: string | true;
  /** Environment variable name */
  env?: string;
};

@Injectable()
export class SecretService implements OnModuleInit {
  private static readonly config = {
    "gemini/api-key": {
      pass: true,
    },
    "openai/api-key": {
      pass: true,
    },
  } as const;
  private static readonly cache = new NodeCache({
    stdTTL: 300,
    checkperiod: 600,
  });

  async onModuleInit() {
    // Preload secrets to validate their existence
    for (const name of Object.keys(SecretService.config) as Array<
      keyof typeof SecretService.config
    >) {
      try {
        await this.get(name);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async get(name: keyof typeof SecretService.config) {
    const cached = SecretService.cache.get<string>(name);
    if (cached) return cached;

    const config: SecretConfig | undefined =
      SecretService.config[name as keyof typeof SecretService.config];
    if (!config) throw new Error(`No secret config found for ${name}`);

    let err: Error | undefined = undefined;
    let secret: string | undefined;
    try {
      if (config.env) {
        secret = process.env[config.env];
      } else if (config.pass) {
        const passName = config.pass === true ? name : config.pass;
        secret = (
          await exec(`pass ${passName}`, { encoding: "utf-8" })
        ).stdout.trim();
      }
    } catch (e) {
      err = e as Error;
    }
    if (!secret)
      throw new Error(
        `Failed to retrieve secret ${name} from ${config.env ? "env" : "pass"}` +
          (err ? `: ${err.message}` : "")
      );
    SecretService.cache.set(name, secret);
    return secret;
  }
}
