import type { ChatMessage } from "@veracioux/chat-lib";
import type { QueuedMessage } from "./types";

export default {
  get currentChatId() {
    return localStorage.getItem("currentChatId");
  },
  set currentChatId(value: string | null) {
    if (value === null) {
      localStorage.removeItem("currentChatId");
    } else {
      localStorage.setItem("currentChatId", value);
    }
  },
  getMessages(chatId: string) {
    const data = localStorage.getItem(`chat-messages-${chatId}`);
    if (data) {
      return JSON.parse(data) as Array<ChatMessage>;
    }
    return [];
  },
  setMessages(chatId: string, messages: Array<ChatMessage>) {
    localStorage.setItem(`chat-messages-${chatId}`, JSON.stringify(messages));
  },
  getQueuedMessages(chatId: string) {
    const data = localStorage.getItem(`chat-queued-messages-${chatId}`);
    if (data) {
      return JSON.parse(data) as Array<QueuedMessage>;
    }
    return [];
  },
  setQueuedMessages(chatId: string, messages: Array<QueuedMessage>) {
    localStorage.setItem(
      `chat-queued-messages-${chatId}`,
      JSON.stringify(messages)
    );
  },
};
