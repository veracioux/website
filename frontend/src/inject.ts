/**
 * @file A registry of all values that can be provided/injected.
 */
import {inject as _inject, provide as _provide, ref} from "vue";

export class ScrollData {
    /* The document scroll amount expressed as a number of sections. */
    relativeScrollY = ref(0);
    scrollContainer = ref<HTMLElement | Window>();

    /*
     * Get the scroll amount from the beginning of the section expressed as a number of sections.
     *
     * This is basically the amount of a section that the user has covered so far.
     */
    static sectionRelativeScrollY(
        element: HTMLElement,
        relativeScrollY: number
    ): number {
        return relativeScrollY - element.offsetTop / window.innerHeight;
    }

    static inject(): ScrollData {
        return _inject<ScrollData>("scrollData")!;
    }

    static provide(value: ScrollData) {
        return _provide("scrollData", value);
    }
}
