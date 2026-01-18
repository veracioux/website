import { DynamicModule, Inject, Module } from "@nestjs/common";
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from "@nestjs/config";
import typia from "typia";

type Config = {
  /** Used as default for REDIS_HOST */
  EXPOSED_IP?: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
};

export class ConfigService {
  constructor(
    @Inject()
    private readonly nestConfigService: NestConfigService<Config, true>
  ) {}
  get<T extends keyof Config>(key: T): Config[T] {
    return this.nestConfigService.get(key, { infer: true });
  }
}

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          validate: (config: Record<string, any>) => {
            const configWithDefaults = {
              ...config,
              REDIS_HOST: config.REDIS_HOST ?? config.EXPOSED_IP ?? "localhost",
              REDIS_PORT: config.REDIS_PORT ?? 6379,
            };
            typia.assert<Config>(configWithDefaults);
            return config;
          },
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
