import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ChatController } from "./chat.controller";
import { AgentService } from "./agent/agent.service";
import { HttpModule } from "@nestjs/axios";
import { MessagesGateway } from "./messages.gateway";

@Module({
  imports: [HttpModule],
  controllers: [AppController, ChatController],
  providers: [AgentService, MessagesGateway],
})
export class AppModule {}
