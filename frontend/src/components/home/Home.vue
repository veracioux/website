<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import {ScrollData} from "@/inject";
import SelfPraiseManager from "@/components/home/SelfPraiseManager.vue";
import type {SelfPraiseProps} from "@/components/home/SelfPraiseCard.vue";

const emit = defineEmits<{
    (e: "veracioux-mounted", element: HTMLElement): void
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

// relativeScrollY value at which the shutter is fully opened.
const shutterFullyOpenedScrollThreshold = 0.25;
// relativeScrollY value at which the self praise appears.
const selfPraiseAppearRelativeScrollY = 0.26;
// Interval (ms) between subsequent characters being typed out.
const defaultTypingInterval = 90;
const minTypingInterval = 15;

// Refs
const typedOutLength = ref(0);
const fadeableStyle = ref({
    opacity: 1,
});
const hello = ref<HTMLElement>();
const veracioux = ref<HTMLElement>();
const traits = ref<HTMLElement>();
const root = ref<HTMLElement>();

const helloStyle = reactive<Partial<CSSStyleDeclaration>>({});
const traitsStyle = reactive<Partial<CSSStyleDeclaration>>({});

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
            (defaultTypingInterval - minTypingInterval) /
            shutterFullyOpenedScrollThreshold * relativeScrollY.value,
            minTypingInterval
        ),
        defaultTypingInterval
    );
}

/**
 * Snap traits element to the bottom of the screen if the scroll has crossed
 * a threshold. Also un-snap them when the user scrolls up from the threshold
 * value.
 */
function snapTraitsToBottomIfNeeded() {
    if (!hello.value) return;

    const helloStyle = hello.value!.style;
    const traitsStyle = traits.value!.style;

    const sectionRelativeScroll = ScrollData.sectionRelativeScrollY(
        root.value!,
        relativeScrollY.value
    );

    if (
        sectionRelativeScroll >=
        shutterFullyOpenedScrollThreshold
    ) {
        Object.assign(helloStyle, {
            position: "absolute",
            top: "0px",
        });
        Object.assign(traitsStyle, {
            position: "absolute",
            bottom: "0px",
        });
    } else {
        Object.assign(helloStyle, {
            position: "relative",
            top: -1.5 * window.scrollY + "px",
        });
        Object.assign(traitsStyle, {
            position: "relative",
            bottom: -1.45 * window.scrollY + "px",
        });
    }
}

let relativeScrollYAtLastIntervalUpdate = 0;
function onScroll(value: number) {
    // Update opacity of fade-able part of the greeting text
    fadeableStyle.value.opacity = 1 - Math.min(value * 4, 1);

    // As the user scrolls down, the typing interval must reduce proportionally.
    if (
        Math.abs(value - relativeScrollYAtLastIntervalUpdate) > 0.1 &&
        intervalId
    ) {
        clearInterval(intervalId);
        intervalId = setInterval(typeOut, calculateTypingInterval());
        relativeScrollYAtLastIntervalUpdate = value;
    }

    snapTraitsToBottomIfNeeded();
}

watch(relativeScrollY, onScroll);

onMounted(() => {
    setTimeout(() => {
        intervalId = setInterval(typeOut, calculateTypingInterval());
        typeOut();
    }, 300);
    emit("veracioux-mounted", veracioux.value!);
});
</script>

<template>
    <div class="home section" ref="root">
        <!-- TODO this is an indicator for testing mugshot centering
        <div style="display: flex; position: fixed; height: 100%; align-items: center; justify-content: center">
            <div style="width: 20px; height: 20px; background: red; border-radius: 50%;"></div>
        </div>
        -->
        <div class="hello" :style="helloStyle" ref="hello">
            <span :style="fadeableStyle">{{
                hi.slice(0, typedOutLength).slice(0, 8)
            }}</span>
            <span ref="veracioux">{{
                hi.slice(8, typedOutLength).slice(0, 9)
            }}</span>
            <span :style="fadeableStyle">{{
                hi.slice(-1, typedOutLength)
            }}</span>
        </div>
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
}

.traits {
    position: relative;
    bottom: 0;
    padding: 4em 0 1em 0;
    justify-self: end;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    font-size: 0.8em;
    opacity: 0.5;

    &.makeRoomForSelfPraise {
        @include screenWidthBelow($large) {
            opacity: 0;
        }
    }

    transition: opacity 0.2s ease-in-out;
}

.trait {
    display: flex;
    flex-direction: column;
    min-height: 1em;
    max-height: 1em;
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
    font-size: 2.5em;
}
</style>
