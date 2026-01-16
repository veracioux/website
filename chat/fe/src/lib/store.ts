import {
  createSlice,
  type PayloadAction,
  configureStore,
} from "@reduxjs/toolkit";
import type { ChatMessage } from "@veracioux/chat-lib";
import customLocalStorage from "./customLocalStorage";

export type QueuedMessage = ChatMessage<"create"> & {
  requestId: string;
  failed?: boolean;
};

const currentChatSlice = createSlice({
  name: "currentChat",
  initialState: {
    id: null as string | null,
    messages: [] as ChatMessage[],
    queuedMessages: [] as QueuedMessage[],
  },
  reducers: {
    loadFromLocalStorage: (state, _: PayloadAction<void>) => {
      state.id = customLocalStorage.currentChatId;
      state.messages = state.id ? customLocalStorage.getMessages(state.id) : [];
      console.debug("Loaded chat from localStorage", state);
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
      customLocalStorage.currentChatId = action.payload;
    },
    appendMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
      customLocalStorage.setMessages(state.id!, state.messages);
    },
    addMessageToQueue: (state, action: PayloadAction<QueuedMessage>) => {
      console.log("Queueing message", action.payload);
      state.queuedMessages.push(action.payload);
    },
    /** Pop the oldest queued message from the queue. */
    popQueuedMessage: (state, action: PayloadAction<{ requestId: string }>) => {
      const index = state.queuedMessages.findIndex(
        (msg) => msg.requestId === action.payload.requestId
      );
      if (index === -1)
        throw new Error("Tried to remove a message from an empty queue");
      state.queuedMessages.splice(index, 1);
    },
    markQueuedMessageAsFailed: (
      state,
      action: PayloadAction<{ requestId: string }>
    ) => {
      console.debug(
        "Marking queued message as failed",
        action.payload.requestId
      );
      const msg = state.queuedMessages.find(
        (msg) => msg.requestId === action.payload.requestId
      );
      if (!msg) throw new Error("Tried to mark a non-existing queued message");
      msg.failed = true;
    },
  },
});

const store = configureStore({
  reducer: {
    currentChat: currentChatSlice.reducer,
  },
});

export type State = ReturnType<typeof store.getState>;

export default {
  currentChat: currentChatSlice.actions,
  store,
};
