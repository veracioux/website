export function iife<T>(fn: () => T): T {
  return fn();
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}