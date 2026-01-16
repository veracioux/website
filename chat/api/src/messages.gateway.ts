import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import type {
  ChatMessage,
  MessageAck,
  WebSocketMessage,
} from "@veracioux/chat-lib";
import { IncomingMessage } from "http";
import typia from "typia";
import WebSocket from "ws";
import * as url from "url";
import { v4 as uuidv4 } from "uuid";

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
  ): WebSocketMessage {
    const query = socket.query;
    const body = typia.assert<ChatMessage<"create">>(data);
    return {
      event: "ack",
      data: {
        type: "received",
        id: uuidv4(),
        timestamp: new Date().toISOString(),
      },
    };
  }
}
