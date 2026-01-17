"use client";
import { useEffect } from "react";
import Messages from "./Messages";
import WelcomeMessage from "./WelcomeMessage";
import store, { type State } from "@/lib/store";
import { Provider, useSelector } from "react-redux";
import PromptArea from "./PromptArea";
import { MessagingProvider } from "@/hooks/messaging";

export function InnerChat() {
  const currentChat = useSelector((state: State) => state.currentChat);
  const dispatch = store.useAppDispatch();

  useEffect(() => {
    dispatch(store.currentChat.loadFromLocalStorage());
  }, []);

  return (
    <>
      <main className="flex flex-col overflow-hidden items-center w-full px-20">
        {currentChat.id ? (
          <Messages
            className="w-full"
            chatId={currentChat.id}
            messages={currentChat.messages}
            queuedMessages={currentChat.queuedMessages}
          ></Messages>
        ) : (
          <WelcomeMessage></WelcomeMessage>
        )}
      </main>
      <PromptArea className="mt-4 w-full max-w-[60vw]" />
    </>
  );
}

export default function Chat() {
  return (
    <Provider store={store.store}>
      <MessagingProvider>
        <InnerChat></InnerChat>
      </MessagingProvider>
    </Provider>
  );
}
