/**
 * @file A registry of all values that can be provided/injected.
 */
import {
    inject as _inject,
    onMounted,
    provide as _provide,
    reactive,
    Ref,
    ref
} from "vue";
import * as utils from "@/utils";
import {useRoute} from "#app";

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
        scrollData: ScrollData
    ): number {
        const {relativeScrollY, scrollContainer} = scrollData;
        const height =
            scrollContainer.value instanceof Window
                ? scrollContainer.value.innerHeight
                : scrollContainer.value?.offsetHeight;
        if (!height) {
            return 0;
        }
        return relativeScrollY.value - element.offsetTop / height;
    }

    static inject(): ScrollData {
        return _inject<ScrollData>("scrollData")!;
    }

    static provide() {
        const scrollContainer = ref<HTMLElement>();
        const relativeScrollY = ref(0);

        function onScroll() {
            if (scrollContainer.value) {
                relativeScrollY.value =
                    scrollContainer.value.scrollTop / scrollContainer.value.clientHeight;
            }
        }

        onMounted(() => {
            utils.onScroll(onScroll, scrollContainer.value);
            window.addEventListener("resize", onScroll);
        });

        const value = {scrollContainer, relativeScrollY};
        _provide("scrollData", value);
        return value
    }
}

// TODO: move into CvContext
export class ContextIsPdf {
    static inject(): Ref<boolean> {
        return _inject("isPdf") ?? ref(false);
    }

    static provide(value: Ref<boolean>) {
        _provide("isPdf", value);
    }
}

export class CvContext {
    static inject() {
        const {variant, resume, render} = useRoute().query;
        return reactive({
            variant,
            resume: resume === "true",
            render: render as "pdf" | "html" | undefined,
        });
    }
}