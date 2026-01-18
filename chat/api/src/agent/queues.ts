export const MESSAGE_QUEUE = "message";

export namespace Jobs {
  export namespace LLM_REPLY {
    export const NAME = "llm-reply";
    export type Payload = {
      chatId: string;
      messageId: string;
      content: string;
    };
  }
}
