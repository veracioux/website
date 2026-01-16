"use client";
import type { QueuedMessage } from "@/lib/types";
import type { ChatMessage } from "@veracioux/chat-lib";
import clsx from "clsx";

function Chat(props: {
  chatId: string;
  messages: ChatMessage[];
  queuedMessages: QueuedMessage[];
  className?: string;
}) {
  return (
    <div className={props.className}>
      {props.messages.map((message) => (
        <div key={message.id}>{message.content}</div>
      ))}
      {props.queuedMessages?.map((message) => (
        <div
          key={message.requestId}
          className={clsx(
            "opacity-35",
            message.failed && "bg-red-600 line-through"
          )}
        >
          {message.content}
        </div>
      ))}
    </div>
  );
}

export default Chat;
