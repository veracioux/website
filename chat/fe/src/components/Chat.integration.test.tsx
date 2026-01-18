// Mock the API to return a mock websocket instance
vi.mock("@/lib/api", () => ({
  connectToMessages: vi.fn(),
  createChat: vi.fn(),
}));

vi.mock("@/lib/customLocalStorage", () => ({
  default: {
    currentChatId: "test-chat-id",
    getMessages: vi.fn(() => []),
    setMessages: vi.fn(),
    getQueuedMessages: vi.fn(() => []),
    setQueuedMessages: vi.fn(),
  } satisfies typeof import("@/lib/customLocalStorage").default,
}));

const mockLocalStorage = vi.mocked(
  await import("@/lib/customLocalStorage")
).default;

import {
  render,
  screen,
  fireEvent,
  waitFor as originalWaitForDoNotUseDirectly,
} from "@testing-library/react";
import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import Chat from "./Chat";
import store from "@/lib/store";
import type { QueuedMessage } from "@/lib/types";
import { MESSAGE_ACK_TIMEOUT_MS } from "@/lib/constants";
import { act } from "react";

/** {@link waitFor} that handles fake timers */
const _waitFor: typeof originalWaitForDoNotUseDirectly = async (
  fn,
  options
) => {
  const isFake = vi.isFakeTimers();
  vi.useRealTimers();
  const result = await originalWaitForDoNotUseDirectly(fn, options);
  if (isFake) vi.useFakeTimers();
  return result;
};

describe("Chat Component Integration Tests", () => {
  let mockConnection: {
    _callbacks: Parameters<typeof import("@/lib/api").connectToMessages>[1];
    sendMessage: ReturnType<typeof vi.fn>;
    close: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockConnection = {
      _callbacks: {
        onMessage: () => {
          throw new Error("Not implemented by test");
        },
        onConnect: () => {
          throw new Error("Not implemented by test");
        },
      },
      sendMessage: vi.fn(),
      close: vi.fn(),
    };
    const mockApi = vi.mocked(await import("@/lib/api"));
    mockApi.connectToMessages.mockImplementation((_, options) => {
      mockConnection._callbacks = options;
      options.onConnect();
      return mockConnection as any;
    });
    mockApi.createChat.mockResolvedValue({ id: "test-chat-id" });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Page Load", () => {
    it(`should mark all queued messages as failed after ${MESSAGE_ACK_TIMEOUT_MS}ms on page load`, async () => {
      // Arrange: Set up mock localStorage to return queued messages
      const queuedMessages: QueuedMessage[] = [
        {
          content: "Test message 1",
          recipient: "haris",
          requestId: "req-1",
          requestTimestamp: new Date().toISOString(),
        },
        {
          content: "Test message 2",
          recipient: "haris",
          requestId: "req-2",
          requestTimestamp: new Date().toISOString(),
        },
      ];
      // @ts-expect-error
      mockLocalStorage.getQueuedMessages.mockReturnValue(queuedMessages);

      // Act: Render the Chat component
      await act(async () => {
        render(<Chat />);
      });
      await act(() =>
        vi.advanceTimersByTimeAsync(MESSAGE_ACK_TIMEOUT_MS * 1.1)
      );

      // Assert: Check that messages are marked as failed
      const state = store.store.getState();
      expect(state.currentChat.queuedMessages[0]!.failed).toBe(true);
      expect(state.currentChat.queuedMessages[1]!.failed).toBe(true);
    });
  });

  // Add other integration test cases here
  describe("Chat Interactions", () => {
    it("should render welcome message when no current chat", () => {
      // Test implementation here
    });

    it("should render messages when current chat exists", () => {
      // Test implementation here
    });

    it("should submit prompt to websocket", async () => {
      act(() => render(<Chat />));

      const textField = screen
        .getByTestId("prompt-textfield")
        .querySelector("textarea")!;
      const submitButton = screen.getByTestId("prompt-submit-button");

      act(() => {
        fireEvent.change(textField, { target: { value: "Hello, world!" } });
        fireEvent.click(submitButton);
      });

      await _waitFor(() => {
        expect(mockConnection.sendMessage).toHaveBeenCalledWith({
          content: "Hello, world!",
          recipient: "haris",
        });
      });
    });
  });
});
