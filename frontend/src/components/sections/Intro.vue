<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { ScrollData } from "@/inject";
import SelfPraiseManager from "@/components/intro/SelfPraiseManager.vue";
import type { SelfPraiseProps } from "@/components/intro/SelfPraiseCard.vue";
import type { CSSProperties } from "vue";
import { shutterFullyOpenedScrollThreshold } from "@/constants";

defineProps<{
  /** Style of the 'veracioux' text. */
  veraciouxStyle?: CSSProperties;
  /** Controls whether the 'veracioux' part should fade along with the rest of the greeting.  */
  veraciouxTextFadeable?: boolean;
}>();

const emit = defineEmits<{
  (e: "veraciouxMounted", element: HTMLElement): void;
  (
    e: "veraciouxCrossedThreshold",
    where: "above" | "below",
    boundingRect: DOMRect
  ): void;
}>();

const hi = "Hi, I'm veracioux.";
const selfPraiseItems: SelfPraiseProps[] = [
  {
    title: "A principled programmer",
    content:
      "I don't just code. I respect the art. I write quality documentation. I study best practices, and create my own.",
  },
  {
    title: "On-demand perfectionist",
    content:
      "I have a tendency towards precision and diligence, but I can work under pressure too.",
  },
  {
    title: "Constantly evolving",
    content:
      "I have touched a lot of technologies during my lifetime. I improve my workflow with new tools all the time.",
  },
  {
    title: "Problem solver by nature and nurture",
    content:
      "I have been programming since age 12. It's my profession, hobby, way of life.",
  },
];

// Config

/** relativeScrollY value at which the self praise appears. */
const selfPraiseAppearRelativeScrollY = 0.3;
/** Interval (ms) between subsequent characters being typed out. */
const defaultTypingInterval = 90;
const minTypingInterval = 15;
const veraciouxThresholdScroll = 0.2;
// The length of all typed out characters combined. It can be calculated,
// but I just hardcoded it since it won't change often (maybe never).
const finalTypedOutLength = 30;

// Note: Initialized to the final length so search engines see the full text on initial load
const typedOutLength = ref(finalTypedOutLength);
onMounted(() => {
  typedOutLength.value = 0;
  rootStyle.visibility = "visible";
});
const rootStyle = reactive<CSSProperties>({
  visibility: "hidden",
});

const fadeableStyle = reactive<CSSProperties>({
  opacity: 1,
});
const hello = ref<HTMLElement>();
const helloStatic = ref<HTMLElement>();
const veracioux = ref<HTMLElement>();
const traits = ref<HTMLElement>();
const traitsStatic = ref<HTMLElement>();
const root = ref<HTMLElement>();

// Styles
const helloStyle = reactive<CSSProperties>({});
const traitsStyle = reactive<CSSProperties>({});

const { relativeScrollY } = ScrollData.inject();

let typingIntervalId: NodeJS.Timeout | undefined = undefined;

function typeOut() {
  ++typedOutLength.value;
  if (typedOutLength.value === finalTypedOutLength) {
    clearInterval(typingIntervalId);
    typingIntervalId = undefined;
  }
}

/**
 * Calculate the interval with which the hello message and trait texts
 * are typed out, based on the current scroll value.
 *
 * The typing interval reduces the more you scroll down the page. This is for
 * purely aesthetic reasons.
 */
function calculateTypingInterval() {
  return Math.min(
    Math.max(
      defaultTypingInterval -
        ((defaultTypingInterval - minTypingInterval) /
          shutterFullyOpenedScrollThreshold) *
          relativeScrollY.value,
      minTypingInterval
    ),
    defaultTypingInterval
  );
}

/**
 * Control the position of the greeting text and traits, based on scroll.
 * Snap them to the window edges when a threshold is crossed, and un-snap
 * them as necessary.
 */
function positionGreetingAndTraits() {
  console.assert(
    hello.value !== undefined,
    "`hello.value` is expected to be defined."
  );
  if (!helloStatic.value) return;
  const helloTopY = helloStatic.value.offsetTop;
  const traitsBottomY =
    traitsStatic.value!.offsetTop + traitsStatic.value!.offsetHeight;
  Object.assign(helloStyle, {
    transform: `translate(0, ${
      -helloTopY *
      Math.max(relativeScrollY.value / shutterFullyOpenedScrollThreshold, 0)
    }px)`,
  });
  Object.assign(traitsStyle, {
    transform: `translate(0, ${
      (root.value!.clientHeight - traitsBottomY) *
      Math.min(relativeScrollY.value / shutterFullyOpenedScrollThreshold, 1)
    }px)`,
  });
}

let relativeScrollYAtLastIntervalUpdate = 0;
let veraciouxPosition: "above" | "below" = "below";

function onScroll(value: number) {
  // Update opacity of fade-able part of the greeting text
  fadeableStyle.opacity = Math.max(1 - value / veraciouxThresholdScroll, 0);

  // As the user scrolls down, the typing interval must reduce proportionally.
  if (
    Math.abs(value - relativeScrollYAtLastIntervalUpdate) > 0.1 &&
    typingIntervalId
  ) {
    clearInterval(typingIntervalId);
    typingIntervalId = setInterval(typeOut, calculateTypingInterval());
    relativeScrollYAtLastIntervalUpdate = value;
  }

  /* Ensure proper positioning of greeting and traits based on scroll. */
  if (relativeScrollY.value < shutterFullyOpenedScrollThreshold) {
    // Using a `watch` here ensures that positionGreetingAndTraits will be
    // called even the first time after the condition is false.
    const unwatch = watch(relativeScrollY, () => {
      positionGreetingAndTraits();
      unwatch();
    });
  }

  if (value > veraciouxThresholdScroll && veraciouxPosition === "below") {
    emit(
      "veraciouxCrossedThreshold",
      "above",
      veracioux.value!.getBoundingClientRect()
    );
    veraciouxPosition = "above";
  } else if (
    value < veraciouxThresholdScroll &&
    veraciouxPosition === "above"
  ) {
    emit(
      "veraciouxCrossedThreshold",
      "below",
      veracioux.value!.getBoundingClientRect()
    );
    veraciouxPosition = "below";
  }
}

watch(relativeScrollY, onScroll);

onMounted(() => {
  setTimeout(() => {
    typingIntervalId = setInterval(typeOut, calculateTypingInterval());
    typeOut();
  }, 300);
  emit("veraciouxMounted", veracioux.value!);
  // // TODO for some reason, `traitsStatic` initially doesn't have the proper
  // //  offset. This is a temporary fix.
  // setTimeout(positionGreetingAndTraits, 400);
});
</script>

<template>
  <div class="intro" ref="root" :style="rootStyle">
    <div data-nosnippet>
      <!-- Provides vertical spacing -->
    </div>
    <div ref="helloStatic" id="hello-static">
      <div class="hello" :style="helloStyle" ref="hello">
        <span :style="fadeableStyle">{{
          hi.slice(0, typedOutLength).slice(0, 8)
        }}</span>
        <span
          ref="veracioux"
          class="veracioux"
          :style="{
            ...veraciouxStyle,
            ...(veraciouxTextFadeable && fadeableStyle),
          }"
        >
          {{ hi.slice(8, typedOutLength).slice(0, 9) }}
        </span>
        <span :style="fadeableStyle">{{ hi.slice(-1, typedOutLength) }}</span>
      </div>
    </div>
    <div ref="traitsStatic" id="traits-static" class="w-full">
      <div
        ref="traits"
        :class="{
          traits: true,
          makeRoomForSelfPraise:
            relativeScrollY > selfPraiseAppearRelativeScrollY,
        }"
        :style="traitsStyle"
      >
        <div class="trait">
          {{ "Programmer".slice(0, Math.max(typedOutLength - hi.length, 0)) }}
        </div>
        <div class="trait">
          {{ "Engineer".slice(0, Math.max(typedOutLength - hi.length, 0)) }}
        </div>
        <div class="trait">
          {{ "Tinkerer".slice(0, Math.max(typedOutLength - hi.length, 0)) }}
        </div>
      </div>
    </div>
    <SelfPraiseManager
      :appear-relative-scroll-y="selfPraiseAppearRelativeScrollY"
      :self-praise-items="selfPraiseItems"
    />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;
@use "@/assets/global.scss";

.hello {
  @include common.veracioux;
  position: relative;
  text-align: center;
}

.traits {
  position: relative;
  margin-bottom: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  opacity: 0.5;

  /**
     * When the screen size is such that the traits and self-praise cards would
     * overlap, hide the traits.
     */
  &.makeRoomForSelfPraise {
    @include global.screenWidthBelow(global.$large) {
      opacity: 0;
    }
  }

  transition: opacity 0.3s ease-in-out;
}

.trait {
  display: flex;
  font-size: 1.4em;

  &::before {
    content: "\200B"; /* zero-width space to ensure height */
  }
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6rem;

  color: var(--color-primary);
  font-family: monospace;

  pointer-events: none;
}
</style>
