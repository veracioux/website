import { EventEmitter } from "events";
import { useEffect, useRef, useState } from "react";
import * as api from "@/lib/api";
import type { ChatMessage } from "@veracioux/chat-lib";
import { iife } from "@veracioux/lib/utils";

export function useMessaging() {
  const [chatId, setChatId] = useState<string | null>(null);
  const [connection, setConnection] = useState<ReturnType<
    typeof api.connectToMessages
  > | null>(null);
  const events = useRef(
    new EventEmitter<{
      response: [ChatMessage];
    }>()
  );

  // Clean up connection on unmount
  useEffect(() => () => connection?.close(), []);

  const sendMessage = async (message: ChatMessage<"create">) => {
    const id = await iife(async () => {
      if (chatId) return chatId;
      return (await api.createChat()).id;
    });
    if (!chatId) setChatId(id);

    let conn = connection;
    if (!conn) {
      conn = api.connectToMessages(id, (msg) => {
        events.current.emit("response", msg);
      });
      setConnection(conn);
    }

    conn.sendMessage(message);
  };

  return {
    sendMessage,
    events: events.current,
  };
}

export type MessagingContext = ReturnType<typeof useMessaging>;
