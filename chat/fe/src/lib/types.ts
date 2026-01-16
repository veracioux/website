import type { ChatMessage } from "@veracioux/chat-lib";

export type QueuedMessage = ChatMessage<"create"> & {
  requestId: string;
  requestTimestamp?: string;
  failed?: boolean;
};
