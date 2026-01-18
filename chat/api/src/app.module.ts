import { Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ChatController } from "./chat.controller";
import { HttpModule } from "@nestjs/axios";
import { MessagesGateway } from "./messages.gateway";
import { SecretService } from "./secret.service";
import { ConfigModule, ConfigService } from "./config.module";
import { AgentModule } from "./agent/agent.module";
import { BullModule } from "@nestjs/bull";
import { MESSAGE_QUEUE } from "./agent/queues";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    AgentModule,
    BullModule.registerQueueAsync({
      name: MESSAGE_QUEUE,
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get("REDIS_HOST"),
          port: config.get("REDIS_PORT"),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, ChatController],
  providers: [SecretService, MessagesGateway, Logger],
})
export class AppModule {}
