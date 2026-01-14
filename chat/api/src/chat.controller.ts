import { TypedBody, TypedRoute } from "@nestia/core";
import {
  Controller,
  HttpCode,
  HttpStatus,
  NotImplementedException,
} from "@nestjs/common";
import type { ChatMetadata } from "@veracioux/chat-lib";
import { AgentService } from "./agent/agent.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Chat")
@Controller("chats")
export class ChatController {
  constructor(private agentService: AgentService) {}

  @TypedRoute.Get()
  getChat(id: string): string {
    // TODO
    throw new NotImplementedException();
  }

  /**
   * @summary Create a new chat session.
   */
  @TypedRoute.Post()
  @HttpCode(HttpStatus.CREATED)
  createChat(@TypedBody() body: ChatMetadata<"create">): ChatMetadata<"query"> {
    // FIXME
    return {
      id: "chat-id-todo",
    };
  }
}
