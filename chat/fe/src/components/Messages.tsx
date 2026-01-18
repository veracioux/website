"use client";
import { useMessaging } from "@/hooks/messaging";
import type { QueuedMessage } from "@/lib/types";
import { Paper } from "@mui/material";
import type { ChatMessage } from "@veracioux/chat-lib";
import { sleep } from "@veracioux/lib/utils";
import clsx from "clsx";
import { useEffect, useRef } from "react";

function Message(props: {
  message: ChatMessage | QueuedMessage;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-stretch gap-4">
      <div className="w-10 h-10 bg-red-500 rounded-full"></div>
      <Paper className="p-4 flex-auto">{props.message.content}</Paper>
    </div>
  );
}

export default function Messages(props: {
  chatId: string;
  messages: ChatMessage[];
  queuedMessages: QueuedMessage[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const messaging = useMessaging();
  useEffect(() => {
    const scrollToBottom = async () => {
      await sleep(0);
      rootRef.current!.scrollTo({
        top: rootRef.current!.scrollHeight,
        behavior: "smooth",
      });
    };
    messaging.events.on("ack", scrollToBottom);
    return () => {
      messaging.events.off("ack", scrollToBottom);
    };
  }, []);
  return (
    <div
      ref={rootRef}
      className={clsx(
        "flex flex-col gap-6 overflow-x-visible overflow-y-scroll p-4",
        props.className
      )}
    >
      {props.messages.map((message) => (
        <Message key={message.id} message={message} className="w-full" />
      ))}
      {props.queuedMessages?.map((message) => (
        <div key={message.requestId} className={clsx("opacity-35")}>
          {message.content}
        </div>
      ))}
    </div>
  );
}
