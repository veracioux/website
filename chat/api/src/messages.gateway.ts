import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import type { ChatMessage, WebSocketMessage } from "@veracioux/chat-lib";
import { IncomingMessage } from "http";
import typia from "typia";
import WebSocket from "ws";
import * as url from "url";
import { v4 as uuidv4 } from "uuid";
import { InjectQueue } from "@nestjs/bull";
import { Jobs, MESSAGE_QUEUE } from "./agent/queues";
import { Queue } from "bullmq";

type Query = {
  chatId: string;
};

type EnrichedWebSocket = WebSocket & {
  query: Query;
};

@WebSocketGateway({
  path: "messages",
})
export class MessagesGateway implements OnGatewayConnection {
  constructor(
    @InjectQueue(MESSAGE_QUEUE)
    private readonly messageQueue: Queue<Jobs.LLM_REPLY.Payload>
  ) {}

  handleConnection(socket: WebSocket, request: IncomingMessage) {
    const query = typia.assert<Query>(url.parse(request.url!, true).query);
    (socket as EnrichedWebSocket).query = query;
  }

  @SubscribeMessage("message")
  async handleMessage(
    @MessageBody() data: ChatMessage<"create">,
    @ConnectedSocket() socket: EnrichedWebSocket
  ): Promise<WebSocketMessage> {
    const query = socket.query;
    const body = typia.assert<ChatMessage<"create">>(data);
    const messageId = uuidv4();
    const requestData: Jobs.LLM_REPLY.Payload = {
      chatId: query.chatId,
      messageId: messageId,
      content: body.content,
    };
    await this.messageQueue.add(Jobs.LLM_REPLY.NAME, requestData);
    return {
      event: "ack",
      data: {
        type: "received",
        id: messageId,
        timestamp: new Date().toISOString(),
      },
    };
  }
}
