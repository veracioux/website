import { Process, Processor } from "@nestjs/bull";
import { Jobs, MESSAGE_QUEUE } from "./queues";
import type { Job } from "bull";
import { Inject, Logger } from "@nestjs/common";

@Processor(MESSAGE_QUEUE)
export class MessageProcessor {
  constructor(@Inject() private logger: Logger) {
    logger.log(`MessageProcessor initialized (queue: ${MESSAGE_QUEUE})`);
  }

  @Process(Jobs.LLM_REPLY.NAME)
  async handleLLMReply(job: Job<Jobs.LLM_REPLY.Payload>) {
    this.logger.log(`Processing job: ${JSON.stringify(job)}`);
  }
}
