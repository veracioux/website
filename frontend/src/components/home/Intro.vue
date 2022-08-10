<script setup lang="ts">
import {onActivated, onMounted, reactive, ref, watch} from "vue";
import {ScrollData} from "@/inject";
import SelfPraiseManager from "@/components/home/SelfPraiseManager.vue";
import type {SelfPraiseProps} from "@/components/home/SelfPraiseCard.vue";
import type {CSSProperties} from "vue";

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

/** relativeScrollY value at which the shutter is fully opened. */
const shutterFullyOpenedScrollThreshold = 0.28;
/** relativeScrollY value at which the self praise appears. */
const selfPraiseAppearRelativeScrollY = 0.3;
/** Interval (ms) between subsequent characters being typed out. */
const defaultTypingInterval = 90;
const minTypingInterval = 15;
const veraciouxThresholdScroll = 0.15;
let stopScrollingDetectorId: number | undefined = undefined;

// Refs
const typedOutLength = ref(0);
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

const {relativeScrollY} = ScrollData.inject();

let intervalId: number | undefined = undefined;

function typeOut() {
    ++typedOutLength.value;
    // The RHS value is the length of all typed out characters combined. It can be calculated,
    // but I just hardcoded it since it won't change often (maybe never).
    if (typedOutLength.value === 30) {
        clearInterval(intervalId);
        intervalId = undefined;
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
    Object.assign(hello.value!.style, {
        translate: `0 ${
            -helloTopY *
            Math.max(
                (relativeScrollY.value / shutterFullyOpenedScrollThreshold) *
                    0.2,
                0
            )
        }px`,
        top: -1.5 * window.scrollY + "px",
    });
    Object.assign(traits.value!.style, {
        translate: `0 ${
            (window.innerHeight - traitsBottomY) *
            Math.min(
                relativeScrollY.value / shutterFullyOpenedScrollThreshold,
                1
            )
        }px`,
    });
}

/**
 * Use a timeout to detect if scrolling has stopped and fully open/close the
 * shutter based on `scrollingDirection`. This is done so the shutter isn't
 * left in a partially opened state.
 */
function fullyOpenOrCloseShutterWhenStoppedScrolling(
    scrollingDirection: "up" | "down"
) {
    if (stopScrollingDetectorId !== undefined) {
        clearTimeout(stopScrollingDetectorId);
    }

    if (relativeScrollY.value < shutterFullyOpenedScrollThreshold) {
        stopScrollingDetectorId = setTimeout(() => {
            if (relativeScrollY.value >= shutterFullyOpenedScrollThreshold)
                return;
            if (scrollingDirection === "up") window.scrollTo(0, 0);
            else document.getElementById("home")?.scrollIntoView();
        }, 200);
    } else {
        stopScrollingDetectorId = undefined;
    }
}

let relativeScrollYAtLastIntervalUpdate = 0;
let veraciouxPosition: "above" | "below" = "below";

function onScroll(value: number, oldValue: number) {
    // Update opacity of fade-able part of the greeting text
    fadeableStyle.opacity = Math.max(1 - value * 6.5, 0);

    // As the user scrolls down, the typing interval must reduce proportionally.
    if (
        Math.abs(value - relativeScrollYAtLastIntervalUpdate) > 0.1 &&
        intervalId
    ) {
        clearInterval(intervalId);
        intervalId = setInterval(typeOut, calculateTypingInterval());
        relativeScrollYAtLastIntervalUpdate = value;
    }

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

    fullyOpenOrCloseShutterWhenStoppedScrolling(
        value < oldValue ? "up" : "down"
    );
}

watch(relativeScrollY, onScroll);

onMounted(() => {
    setTimeout(() => {
        intervalId = setInterval(typeOut, calculateTypingInterval());
        typeOut();
    }, 300);
    emit("veraciouxMounted", veracioux.value!);
    // TODO for some reason, `traitsStatic` initially doesn't have the proper
    //  offset. This is a temporary fix.
    setTimeout(positionGreetingAndTraits, 400);
});
</script>

<template>
    <div class="home section" ref="root">
        <!-- TODO this is an indicator for testing mugshot centering
        <div style="display: flex; position: fixed; height: 100%; align-items: center; justify-content: center">
            <div style="width: 20px; height: 20px; background: red; border-radius: 50%;"></div>
        </div>
        -->
        <div ref="helloStatic">
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
                <span :style="fadeableStyle">{{
                    hi.slice(-1, typedOutLength)
                }}</span>
            </div>
        </div>
        <div ref="traitsStatic">
            <div
                ref="traits"
                :class="{
                    traits,
                    makeRoomForSelfPraise:
                        relativeScrollY > selfPraiseAppearRelativeScrollY,
                }"
                :style="traitsStyle"
            >
                <div class="trait" style="align-items: flex-start">
                    <div class="dummy">Programmer</div>
                    <div>
                        {{
                            "Programmer".slice(
                                0,
                                Math.max(typedOutLength - hi.length, 0)
                            )
                        }}
                    </div>
                </div>
                <div class="trait" style="align-items: flex-end">
                    <div class="dummy">Engineer</div>
                    <div>
                        {{
                            "Engineer".slice(
                                0,
                                Math.max(typedOutLength - hi.length, 0)
                            )
                        }}
                    </div>
                </div>
                <div class="trait" style="align-items: flex-start">
                    <div class="dummy">Tinkerer</div>
                    <div>
                        {{
                            "Tinkerer".slice(
                                0,
                                Math.max(typedOutLength - hi.length, 0)
                            )
                        }}
                    </div>
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
@import "@/assets/global.scss";

.hello {
    @include common.veracioux;
    position: relative;
    top: 0;
    justify-self: end;
    text-align: center;
    margin-bottom: 3em;
    font-size: 2rem;
}

.traits {
    position: relative;
    bottom: 0;
    margin-bottom: 1em;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    opacity: 0.5;

    /**
     * When the screen size is such that the traits and self-praise cards would
     * overlap, hide the traits.
     */
    &.makeRoomForSelfPraise {
        @include screenWidthBelow($large) {
            opacity: 0;
        }
    }

    transition: opacity 0.3s ease-in-out;
}

.trait {
    display: flex;
    flex-direction: column;
    min-height: 1em;
    max-height: 1em;
    font-size: 1.4em;
}

.dummy {
    opacity: 0;
    height: 0;
}

.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: var(--color-primary);
    font-family: monospace;
}
</style>
