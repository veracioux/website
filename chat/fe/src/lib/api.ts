import type { ChatMessage, ChatMetadata } from "@veracioux/chat-lib";
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
  onMessage: (data: ChatMessage) => void
) {
  const url = new URL(`${config.API_BASE_URL}/messages`);
  url.searchParams.append("chatId", chatId);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  const websocket = new WebSocket(url);
  websocket.onmessage = (event) => {
    onMessage(JSON.parse(event.data) as ChatMessage);
  };
  return {
    async sendMessage(message: ChatMessage<"create">) {
      websocket.send(JSON.stringify({ event: "message", data: message }));
    },
    close() {
      websocket.close();
    },
  };
}
