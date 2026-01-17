import {
  createSlice,
  type PayloadAction,
  configureStore,
  createAsyncThunk,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import type { ChatMessage } from "@veracioux/chat-lib";
import customLocalStorage from "./customLocalStorage";
import { type QueuedMessage } from "./types";
import { useDispatch } from "react-redux";
import { MESSAGE_ACK_TIMEOUT_MS } from "./constants";

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
    messageSent: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
      customLocalStorage.setMessages(state.id!, state.messages);
    },
    messageQueued: (state, action: PayloadAction<QueuedMessage>) => {
      console.debug("Queueing message", action.payload);
      state.queuedMessages.push(action.payload);
    },
    /** Pop the oldest queued message from the queue. */
    queuedMessagePopped: (
      state,
      action: PayloadAction<{ requestId: string }>
    ) => {
      const index = state.queuedMessages.findIndex(
        (msg) => msg.requestId === action.payload.requestId
      );
      if (index === -1)
        throw new Error(
          "Tried to remove a non-existent message from the queue"
        );
      state.queuedMessages.splice(index, 1);
    },
    queuedMessageFailedToSend: (
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
      if (!msg)
        throw new Error(
          "Tried to mark a non-existing queued message as failed"
        );
      msg.failed = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFromLocalStorage.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.messages = action.payload.messages;
        state.queuedMessages = action.payload.queuedMessages;
      })
      .addCase(currentChatSlice.actions.messageQueued, (state) => {
        if (state.id)
          customLocalStorage.setQueuedMessages(state.id, state.queuedMessages);
      });
  },
});

// #region Set up listeners

/**
 * Middleware to monitor queued messages and mark them as failed if they
 * exceed the acknowledgement timeout.
 */
const queuedMessageStatusSyncMiddleware = createListenerMiddleware<
  State,
  AppDispatch
>();

/**
 * Use this function to document that message status is monitored by store middleware.
 * @see queuedMessageStatusSyncMiddleware
 */
const listenForMessageFailures = () => {};

queuedMessageStatusSyncMiddleware.startListening({
  matcher: (x): x is any => true, // catch all actions
  effect: async (_, listenerApi) => {
    const prevState = listenerApi.getOriginalState();
    const nextState = listenerApi.getState();

    if (
      prevState.currentChat.queuedMessages !==
      nextState.currentChat.queuedMessages
    ) {
      const requestIds = new Set(
        nextState.currentChat.queuedMessages.map((msg) => msg.requestId)
      );
      const oldRequestIds = new Set(
        prevState.currentChat.queuedMessages.map((msg) => msg.requestId)
      );
      requestIds.difference(oldRequestIds).forEach((requestId) => {
        setTimeout(() => {
          if (
            listenerApi
              .getState()
              .currentChat.queuedMessages.find(
                (msg) => msg.requestId === requestId
              ) === undefined
          ) {
            // Message was sent successfully in the meantime
            return;
          }
          console.debug(
            `Marking queued message ${requestId} as failed due to timeout`
          );
          listenerApi.dispatch(
            currentChatSlice.actions.queuedMessageFailedToSend({ requestId })
          );
        }, MESSAGE_ACK_TIMEOUT_MS);
      });
    }
  },
});

const store = configureStore({
  reducer: {
    currentChat: currentChatSlice.reducer,
  },
  middleware: (getDefaultMiddleware): any =>
    getDefaultMiddleware().prepend(
      queuedMessageStatusSyncMiddleware.middleware
    ),
});

// #endregion

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const currentChatActions = {
  ...currentChatSlice.actions,
  loadFromLocalStorage,
};

export default {
  currentChat: currentChatActions,
  useAppDispatch: useDispatch as () => (
    action: ReturnType<
      (typeof currentChatActions)[keyof typeof currentChatActions]
    >
  ) => void,
  store,
  listenForMessageFailures,
};
