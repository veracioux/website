import { EventEmitter } from "events";
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import * as api from "@/lib/api";
import type {
  ChatMessage,
  MessageAck,
  WebSocketMessage,
} from "@veracioux/chat-lib";
import { iife } from "@veracioux/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import store from "@/lib/store";
import { createContext } from "react";
import type { State } from "@/lib/store";

type DataForEvent<E extends WebSocketMessage["event"]> = Extract<
  WebSocketMessage,
  { event: E }
>["data"];

type Events = {
  [K in Exclude<WebSocketMessage["event"], "message">]: [DataForEvent<K>];
};

type MessagingContext = {
  sendMessage: (message: ChatMessage<"create">) => Promise<void>;
  events: EventEmitter<Events>;
};

const context = createContext<MessagingContext | null>(null);

export function MessagingProvider(props: PropsWithChildren) {
  const currentChat = useSelector((state: State) => state.currentChat);

  const dispatch = useDispatch();

  const events = useRef(new EventEmitter<Events>()).current;

  const [connection, setConnection] = useState<ReturnType<
    typeof api.connectToMessages
  > | null>(null);

  // Clean up connection on unmount
  useEffect(() => () => connection?.close(), []);

  return (
    <context.Provider
      value={{
        sendMessage: async (message: ChatMessage<"create">) => {
          // Create a new chat if needed
          const id = await iife(async () => {
            if (currentChat.id) return currentChat.id;
            return (await api.createChat()).id;
          });
          if (!currentChat.id) dispatch(store.currentChat.setId(id));

          new Promise<ReturnType<typeof api.connectToMessages>>((resolve) => {
            let conn = connection;
            if (!conn) {
              conn = api.connectToMessages(id, {
                onMessage: (msg) => events.emit(msg.event, msg.data),
                onConnect: () => resolve(conn!),
              });
              setConnection(conn);
            } else {
              resolve(conn);
            }
          }).then((conn) => conn.sendMessage(message));

          const requestId = crypto.randomUUID();
          const queuedMessage = { ...message, requestId };

          dispatch(store.currentChat.addMessageToQueue(queuedMessage));
          let received = false;
          const onAck = (ack: MessageAck) => {
            if (ack.type === "received") {
              console.debug("Ack received", ack);
              received = true;
              dispatch(store.currentChat.popQueuedMessage({ requestId }));
              dispatch(
                store.currentChat.appendMessage({
                  ...queuedMessage,
                  id: ack.id,
                  timestamp: ack.timestamp,
                })
              );
            }
          };
          events.on("ack", onAck);
          setTimeout(() => {
            console.debug("Ack timeout for message", requestId);
            events.off("ack", onAck);
            if (!received)
              store.currentChat.markQueuedMessageAsFailed({ requestId });
          }, 2000);
        },
        events,
      }}
    >
      {props.children}
    </context.Provider>
  );
}

export function useMessaging() {
  const ctx = useContext(context);
  if (!ctx)
    throw new Error(
      `${useMessaging.name} must be used within a ${MessagingProvider.name}`
    );
  return ctx;
}
