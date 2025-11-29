/**
 * @file A registry of all values that can be provided/injected.
 */
import {
  inject as _inject,
  onMounted,
  provide as _provide,
  reactive,
  ref,
  watch,
  computed,
} from "vue";
import * as utils from "@/utils";
import { useRoute } from "#app";

// TODO: Add resize observer too
export class ScrollData {
  /* The document scroll amount expressed as a number of sections. */
  relativeScrollY = ref(0);
  scrollContainer = ref<HTMLElement>();

  static inject(): ScrollData {
    return _inject<ScrollData>("scrollData")!;
  }

  static provide() {
    const scrollContainer = ref<HTMLElement>();
    const relativeScrollY = ref(0);

    function onScroll() {
      if (scrollContainer.value) {
        relativeScrollY.value =
          scrollContainer.value.scrollTop / scrollContainer.value.offsetHeight;
      }
    }

    let dispose: undefined | (() => void) = undefined;

    watch(scrollContainer, () => {
      dispose?.();
      dispose = undefined;
      if (scrollContainer.value) {
        dispose = utils.registerScrollListener(onScroll, scrollContainer.value);
      }
    });

    onMounted(() => {
      window.addEventListener("resize", onScroll);
    });

    const value = { scrollContainer, relativeScrollY };
    _provide("scrollData", value);
    return value;
  }
}

export class CvContext {
  static inject() {
    const query = useRoute().query;
    return reactive({
      variant: query.variant,
      resume: computed(() => query.resume === "true"),
    });
  }
}
