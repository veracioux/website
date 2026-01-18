import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ChatController } from "./chat.controller";
import { AgentService } from "./agent/agent.service";
import { HttpModule } from "@nestjs/axios";
import { MessagesGateway } from "./messages.gateway";
import { SecretService } from "./secret.service";

@Module({
  imports: [HttpModule],
  controllers: [AppController, ChatController],
  providers: [AgentService, SecretService, MessagesGateway],
})
export class AppModule {}
