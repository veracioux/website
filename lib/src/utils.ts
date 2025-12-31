export function iife<T>(fn: () => T): T {
  return fn();
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function withDispose<T>(
  action: () => T,
  dispose: () => Promise<void> | void
) {
  return {
    result: action(),
    [Symbol.asyncDispose]: async () => dispose(),
  };
}
