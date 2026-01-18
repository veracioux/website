import { Logger, Module } from "@nestjs/common";
import { AgentService } from "./agent.service";
import { MessageProcessor } from "./message.processor";

@Module({
  providers: [AgentService, MessageProcessor, Logger],
  exports: [AgentService],
})
export class AgentModule {}
