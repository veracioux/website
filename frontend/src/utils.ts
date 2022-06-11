/**
 * Wrapper around window.addEventListener("scroll", ...).
 */
import {ScrollData} from "@/inject";
import {ref, watch} from "vue";

export function onScroll(callback: (event?: Event) => void) {
    let residualScrollTimerId: any;
    window.addEventListener("scroll", (ev) => {
        // If the user scrolls too fast, we might not get a scroll event fired at the final position.
        // For example, this can leave a tiny opening in the shutter when the user scrolls to the top.
        // That's why we call the callback again after a short timeout after the last "scroll" event was fired.
        callback(ev);
        clearTimeout(residualScrollTimerId);
        residualScrollTimerId = setTimeout(() => callback(ev), 80);
    });
}

/**
 * Watches for changes in `ScrollData.relativeScrollY` and returns `{scrollingFast: true}` if
 * the difference is greater than `threshold`.
 */
export function useFastScrollingDetector(threshold = 0.05) {
    const {relativeScrollY} = ScrollData.inject();
    const scrollingFast = ref<boolean>(false);
    watch(relativeScrollY, (value, oldValue) => {
        scrollingFast.value = Math.abs(value - oldValue) > threshold;
    });
    return {scrollingFast};
}
