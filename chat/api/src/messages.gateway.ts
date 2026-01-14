import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import type { ChatMessage } from "@veracioux/chat-lib";
import { IncomingMessage } from "http";
import typia from "typia";
import WebSocket from "ws";
import * as url from "url";

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
  handleConnection(socket: WebSocket, request: IncomingMessage) {
    const query = typia.assert<Query>(url.parse(request.url!, true).query);
    (socket as EnrichedWebSocket).query = query;
  }

  @SubscribeMessage("message")
  handleMessage(
    @MessageBody() data: ChatMessage<"create">,
    @ConnectedSocket() socket: EnrichedWebSocket
  ): ChatMessage {
    const query = socket.query;
    const body = typia.assert<ChatMessage<"create">>(data);
    return {
      id: "TODO",
      content: `Received message ${body.content} for chat ${query.chatId}`,
      timestamp: new Date().toISOString(),
    } satisfies ChatMessage<"query">;
  }
}
