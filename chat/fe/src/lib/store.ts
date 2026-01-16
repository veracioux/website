import {
  createSlice,
  type PayloadAction,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { ChatMessage } from "@veracioux/chat-lib";
import customLocalStorage from "./customLocalStorage";
import { type QueuedMessage } from "./types";
import { useDispatch } from "react-redux";

const loadFromLocalStorage = createAsyncThunk(
  "currentChat/loadFromLocalStorage",
  async () => {
    const id = customLocalStorage.currentChatId;
    const state = {
      id: id,
      messages: id ? customLocalStorage.getMessages(id) : [],
      queuedMessages: id ? customLocalStorage.getQueuedMessages(id) : [],
    };
    console.debug("Loaded chat from localStorage", state);
    return state;
  }
);

const currentChatSlice = createSlice({
  name: "currentChat",
  initialState: {
    id: null as string | null,
    messages: [] as ChatMessage[],
    queuedMessages: [] as QueuedMessage[],
  },
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
      customLocalStorage.currentChatId = action.payload;
    },
    appendMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
      customLocalStorage.setMessages(state.id!, state.messages);
    },
    addMessageToQueue: (state, action: PayloadAction<QueuedMessage>) => {
      console.debug("Queueing message", action.payload);
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
  extraReducers: (builder) => {
    builder.addCase(loadFromLocalStorage.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.messages = action.payload.messages;
      state.queuedMessages = action.payload.queuedMessages;
    });
  },
});

const store = configureStore({
  reducer: {
    currentChat: currentChatSlice.reducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default {
  currentChat: { ...currentChatSlice.actions, loadFromLocalStorage },
  useAppDispatch: useDispatch as () => AppDispatch,
  store,
};
