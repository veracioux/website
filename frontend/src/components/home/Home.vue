<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ScrollData} from "@/inject";
import * as utils from "@/utils";
import SelfPraiseManager from "@/components/home/SelfPraiseManager.vue";
import type {SelfPraiseProps} from "@/components/home/SelfPraiseCard.vue";

const texts = ["Hi, I'm veracioux.", "Programmer", "Engineer", "Tinkerer"];
const selfPraiseItems: SelfPraiseProps[] = [
    {
        title: "A principled programmer",
        content: "I don't just code. I respect the art. I write quality documentation. I study best practices, and create my own.",
    },
    {
        title: "On-demand perfectionist",
        content: "I have a tendency towards precision and diligence, but I can work under pressure too.",
    },
    {
        title: "Constantly evolving",
        content: "I have touched a lot of technologies during my lifetime. I improve my workflow with new tools all the time."
    },
    {
        title: "Problem solver by nature and nurture",
        content: "I have been programming since age 12. It's my profession, hobby, way of life."
    },
];

const shutterFullyOpenedScrollThreshold = 0.25;
// The relativeScrollY value at which the self praise appears.
const selfPraiseAppearRelativeScrollY = 0.5;

let intervalId = ref<any>(undefined);
let typedOutLength = ref(0);
let fadeableStyle = ref({
    opacity: 1,
});
let hello = ref<HTMLElement>();
let traits = ref<HTMLElement>();
let root = ref<HTMLElement>();
let helloInitialTop = 0;
let traitsInitialBottom = 0;

const {relativeScrollY} = ScrollData.inject();

function startTyping() {
    intervalId.value = setInterval(typeOut, 120);
    typeOut();
}

function typeOut() {
    ++typedOutLength.value;
    // Adjust this value heuristically
    if (typedOutLength.value === 30) {
        clearInterval(intervalId.value);
    }
}

function onScroll() {
    fadeableStyle.value.opacity = 1 - Math.min(relativeScrollY.value * 5, 1);

    if (!hello.value) return;

    const helloStyle = hello.value!.style;
    const traitsStyle = traits.value!.style;

    if (fadeableStyle.value.opacity == 0) {
        helloStyle.opacity = "0";
    } else {
        helloStyle.opacity = "1";
    }

    const sectionRelativeScroll = ScrollData.sectionRelativeScrollY(
        root.value!,
        relativeScrollY.value
    );

    // Make the traits snap to the bottom once section relative scroll
    // reaches a threshold.
    if (
        sectionRelativeScroll >=
        shutterFullyOpenedScrollThreshold -
            (0.5 * hello.value!.offsetHeight) / window.innerHeight
    ) {
        helloStyle.position = "absolute";
        traitsStyle.position = "absolute";
        helloStyle.top = "0";
        traitsStyle.bottom = "0";
    } else {
        helloStyle.position = "relative";
        traitsStyle.position = "relative";
        helloStyle.top = -1.5 * window.scrollY + "px";
        traitsStyle.bottom = -1.45 * window.scrollY + "px";
    }
}

onMounted(() => {
    utils.onScroll(onScroll);
    setTimeout(startTyping, 500);
    helloInitialTop = hello.value!.offsetTop;
    traitsInitialBottom =
        window.innerHeight -
        traits.value!.offsetTop -
        traits.value!.offsetHeight;
});
</script>

<template>
    <div class="home section" ref="root">
        <div class="hello" ref="hello" style="white-space-collapse: discard">
            <span :style="fadeableStyle">{{
                texts[0].slice(0, typedOutLength).slice(0, 8)
            }}</span>
            <span ref="veracioux">{{
                texts[0].slice(8, typedOutLength).slice(0, 9)
            }}</span>
            <span :style="fadeableStyle">{{
                texts[0].slice(-1, typedOutLength)
            }}</span>
        </div>
        <div ref="traits" :class="{traits, makeRoomForSelfPraise: relativeScrollY > selfPraiseAppearRelativeScrollY}">
            <div class="trait" style="align-items: flex-start">
                <div class="dummy">Programmer</div>
                <div>
                    {{
                        texts[1].slice(
                            0,
                            Math.max(typedOutLength - texts[0].length, 0)
                        )
                    }}
                </div>
            </div>
            <div class="trait" style="align-items: flex-end">
                <div class="dummy">Engineer</div>
                <div>
                    {{
                        texts[2].slice(
                            0,
                            Math.max(typedOutLength - texts[0].length, 0)
                        )
                    }}
                </div>
            </div>
            <div class="trait" style="align-items: flex-start">
                <div class="dummy">Tinkerer</div>
                <div>
                    {{
                        texts[3].slice(
                            0,
                            Math.max(typedOutLength - texts[0].length, 0)
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
@import "@/assets/global.scss";
.hello {
    position: relative;
    top: 0;
    justify-self: end;
    padding: 0.2em;
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
