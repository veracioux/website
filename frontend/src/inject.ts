/**
 * @file A registry of all values that can be provided/injected.
 */
import {inject as _inject, provide as _provide, ref} from "vue";
import type {Ref} from "vue";

export class ScrollData {
    /* The document scroll amount expressed as a number of sections. */
    relativeScrollY = ref(0);

    /*
     * Get the scroll amount from the beginning of the section expressed as a number of sections.
     *
     * This is basically the amount of a section that the user has covered so far.
     */
    static sectionRelativeScrollY(element: HTMLElement, relativeScrollY: number): number {
        return relativeScrollY - element.offsetTop / window.innerHeight;
    }

    static inject() {
        return _inject<ScrollData>("scrollData")!;
    }

    static provide(value: ScrollData) {
        return _provide("scrollData", value);
    }
}

export class VeraciouxNavbarButton {
    static inject() {
        return _inject<HTMLElement>("veraciouxNavbarButton");
    }

    static provide(value: Ref<HTMLElement>) {
        return _provide("veraciouxNavbarButton", value);
    }
}
