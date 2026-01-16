type Variant = "query" | "update" | "create";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type Dto<
  V extends Variant,
  T extends { query: infer Q; create: infer C },
> = V extends "query" ? Prettify<T["query"]> : Prettify<T["create"]>;

type ChatMessageCreate = {
  content: string;
  recipient: "haris" | "agent" | "user";
};

type ChatMessageResponse = {
  id: string;
  content: string;
  timestamp: string;
};

type UserCreate = {
  email?: string;
};

type UserResponse = {
  id: string;
  email?: string;
};

// Exports

export type ChatMessage<V extends Variant = "query"> = Dto<
  V,
  {
    query: ChatMessageResponse;
    create: ChatMessageCreate;
  }
>;

export type User<V extends Variant = "query"> = Dto<
  V,
  {
    create: UserCreate;
    query: UserResponse;
  }
>;

export type ChatMetadata<V extends Variant = "query"> = Dto<
  V,
  {
    query: { id: string };
    create: {};
  }
>;

export type MessageAck = {
  id: string;
  type: "received";
  timestamp: string;
};

export type MessageError = { error: string };

export type WebSocketMessage =
  | {
      event: "ack";
      data: MessageAck;
    }
  | {
      event: "message";
      data: ChatMessage<"create">;
    };
