import type {
  ChatMessage,
  ChatMetadata,
  WebSocketMessage,
} from "@veracioux/chat-lib";
import config from "@/config";

export function createChat() {
  return fetch(`${config.API_BASE_URL}/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({} satisfies ChatMetadata<"create">),
  }).then((res) => res.json() as Promise<ChatMetadata<"query">>);
}

export function connectToMessages(
  chatId: string,
  listeners: {
    onMessage: (message: WebSocketMessage) => void;
    onConnect: () => void;
  }
) {
  const url = new URL(`${config.API_BASE_URL}/messages`);
  url.searchParams.append("chatId", chatId);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  const websocket = new WebSocket(url);
  websocket.onopen = () => {
    console.debug("WebSocket connected");
    listeners.onConnect();
  };
  websocket.onmessage = (event) => {
    listeners.onMessage(JSON.parse(event.data));
  };
  return {
    async sendMessage(message: ChatMessage<"create">) {
      websocket.send(
        JSON.stringify({
          event: "message",
          data: message,
        } satisfies WebSocketMessage)
      );
    },
    close() {
      websocket.close();
    },
  };
}

export function fetchChatMessages(chatId: string) {
  return fetch(
    `${config.API_BASE_URL}/messages?chatId=${encodeURIComponent(chatId)}`
  ).then((res) => res.json() as Promise<ChatMessage[]>);
}
