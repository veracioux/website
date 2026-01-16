"use client";
import AppSwitcher from "@/components/AppSwitcher";
import Chat from "@/components/Chat";
import PromptArea from "@/components/PromptArea";
import WelcomeMessage from "@/components/WelcomeMessage";
import { MessagingProvider } from "@/hooks/messaging";
import store, { type State } from "@/lib/store";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

function InnerPage() {
  const currentChat = useSelector((state: State) => state.currentChat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(store.currentChat.loadFromLocalStorage());
  }, []);

  return (
    <>
      <main className="flex flex-col items-center w-full px-20">
        {currentChat.id ? (
          <Chat
            className="w-full"
            chatId={currentChat.id}
            messages={currentChat.messages}
            queuedMessages={currentChat.queuedMessages}
          ></Chat>
        ) : (
          <WelcomeMessage></WelcomeMessage>
        )}
      </main>
      <PromptArea className="w-full max-w-[60vw]" />
    </>
  );
}

export default function Page() {
  return (
    <div className="h-screen w-screen">
      <AppSwitcher></AppSwitcher>
      <div className="h-full p-12 flex flex-col items-center justify-between">
        <Provider store={store.store}>
          <MessagingProvider>
            <InnerPage></InnerPage>
          </MessagingProvider>
        </Provider>
      </div>
    </div>
  );
}
