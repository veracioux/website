/**
 * Wrapper around window.addEventListener("scroll", ...).
 */
import { ScrollData } from "@/inject";
import { ref, watch } from "vue";
import type { Ref } from "vue";

export function registerScrollListener(
  fn: (event?: Event) => void,
  element?: HTMLElement
) {
  let residualScrollTimerId: NodeJS.Timeout;

  function handler(ev: Event) {
    fn(ev);
    // If the user scrolls too fast, we might not get a scroll event fired at the final position.
    // For example, this can leave a tiny opening in the shutter when the user scrolls to the top.
    // That's why we call the callback again after a short timeout after the last "scroll" event was fired.
    clearTimeout(residualScrollTimerId);
    residualScrollTimerId = setTimeout(() => fn(ev), 80);
  }

  const target = element ?? window;

  target.addEventListener("scroll", handler, {
    passive: true,
  });

  return () => target.removeEventListener("scroll", handler);
}

/**
 * Watches for changes in `ScrollData.relativeScrollY` and returns `{scrollingFast: true}` if
 * the difference is greater than `threshold`.
 */
export function useFastScrollingDetector(threshold = 0.05) {
  const { relativeScrollY } = ScrollData.inject();
  const scrollingFast = ref<boolean>(false);
  watch(relativeScrollY, (value, oldValue) => {
    scrollingFast.value = Math.abs(value - oldValue) > threshold;
  });
  return { scrollingFast };
}

/** Map `value` linearly from `sourceRange` to `targetRange`. */
export function mapRange(
  value: number,
  sourceRange: [number, number],
  targetRange: [number, number]
) {
  const [x1, x2] = sourceRange;
  const [y1, y2] = targetRange;
  return ((y2 - y1) / (x2 - x1)) * (value - x1) + y1;
}

export function clip(value: number, range: [number, number]) {
  return Math.max(range[0], Math.min(value, range[1]));
}

/** Map `value` linearly from `sourceRange` to `targetRange`, clipping the output value within `targetRange`. */
export function mapRangeClipped(
  value: number,
  sourceRange: [number, number],
  targetRange: [number, number]
) {
  return clip(mapRange(value, sourceRange, targetRange), targetRange);
}

/** Log changes to a ref to the debug channel. */
export function logChanges(
  ref: Ref,
  ...consoleLogPrefixArgs: Parameters<typeof console.debug>
) {
  watch(ref, (value) => {
    console.debug(...consoleLogPrefixArgs, value);
  });
}

export function isMobile() {
  return (
    process.client && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  );
}

export function iife<T>(fn: () => T): T {
  return fn();
}

export function dependsOn(...refs: Ref[]) {
  refs.forEach((r) => r.value);
}
