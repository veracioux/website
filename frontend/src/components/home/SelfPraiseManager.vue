<script setup lang="ts">
import type {SelfPraiseProps} from "@/components/home/SelfPraiseCard.vue";
import SelfPraiseCard from "@/components/home/SelfPraiseCard.vue";
import {ScrollData} from "@/inject";
import {computed, ref, watch} from "vue";
import {useFastScrollingDetector} from "@/utils";

const {selfPraiseItems, appearRelativeScrollY} = defineProps<{
    selfPraiseItems: SelfPraiseProps[];
    /* The relativeScrollY value at which the self praise should appear. */
    appearRelativeScrollY: number;
}>();

const scrollMaxValue = 0.5;

// TODO update description
// The SelfPraiseCards exchange as you scroll down. There are always two cards displayed.
// Each card's visibility changes based on the ratio of the current scroll level relative
// to the top of the scrollPivot.
//
// Let's call each scroll level at which a card is exchanged a step. The stepSize is the
// scroll amount between two consecutive steps.

const {relativeScrollY} = ScrollData.inject();
const progress = ref(-1);

const numSteps = Math.ceil(selfPraiseItems.length / 2);
const currentStep = ref(-1);
const cardInSlot1 = ref(0);
const cardInSlot2 = ref(1);
const {scrollingFast} = useFastScrollingDetector(0.03);

watch(relativeScrollY, (value) => {
    if (progress.value < 0 && value < appearRelativeScrollY) return;
    progress.value =
        (relativeScrollY.value - appearRelativeScrollY) / scrollMaxValue;
});

watch(progress, () => {
    currentStep.value = Math.floor(progress.value * numSteps);
});

watch(currentStep, (value, oldValue) => {
    // After numSteps have passed, keep the cards as they are
    if (oldValue > numSteps) return;
    if (value > numSteps) value = numSteps;

    cardInSlot1.value = Math.floor((value + 1) / 2) * 2;
    cardInSlot2.value = Math.floor(value / 2) * 2 + 1;
});
</script>
<template>
    <div class="container">
        <div
            :class="{
                [s.wrapper]: true,
                fastTransition: scrollingFast || progress < 0,
            }"
        >
            <div :class="[s.slot, s.slot1]">
                <Transition name="slide-fade-1">
                    <SelfPraiseCard
                        v-if="currentStep >= 0"
                        v-bind="selfPraiseItems[cardInSlot1]"
                        :key="cardInSlot1"
                    />
                </Transition>
            </div>
            <div :class="s.spacer">
                <!--
                    Item that occupies approximately the same space as the mugshot,
                    thereby making sure that the slots do not overlap with the mugshot
                    and can be centered between the mugshot and the window boundary.
                -->
            </div>
            <div :class="[s.slot, s.slot2]">
                <Transition name="slide-fade-2">
                    <SelfPraiseCard
                        v-if="currentStep >= 0"
                        v-bind="selfPraiseItems[cardInSlot2]"
                        :key="cardInSlot2"
                    />
                </Transition>
            </div>
        </div>
    </div>
</template>

<style module="s" lang="scss">
@import "@/assets/global.scss";

.wrapper {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @include screenWidthAbove($large) {
        flex-direction: row;
    }
}

.slot {
    display: flex;
    align-items: center;
    justify-content: center;

    width: auto;
    height: 100%;

    @include screenWidthAbove($large) {
        width: 100%;
        height: auto;
    }

    &.slot1 {
        align-items: end;
        padding-bottom: 50px;

        @include screenWidthAbove($large) {
            align-items: center;
            justify-content: center;
            padding: 0;
        }
        @include screenWidthAbove($xlarge) {
            justify-content: end;
            padding: 0 50px 0 0;
        }
    }

    &.slot2 {
        align-items: start;
        padding-top: 50px;

        @include screenWidthAbove($large) {
            align-items: center;
            justify-content: center;
            padding: 0;
        }
        @include screenWidthAbove($xlarge) {
            justify-content: start;
            padding: 0 0 0 50px;
        }
    }
}

/* Occupies approximately the same size as the mugshot exposed by the shutter. */
.spacer {
    --size: 240px;

    @include screenWidthAbove(640px) {
        --size: 350px;
    }

    max-width: var(--size);
    min-width: var(--size);
    max-height: var(--size);
    min-height: var(--size);
}
</style>

<style scoped lang="scss">
@import "@/assets/global.scss";

.fastTransition {
    --transition-duration: 0.2s;
    color: red;
}

@mixin translateLeftOrUp {
    transform: translateX(-0.5em);
    @include screenWidthAbove($large) {
        transform: translateY(-0.5em);
    }
}

@mixin translateRightOrDown {
    transform: translateX(0.5em);
    @include screenWidthAbove($large) {
        transform: translateY(0.5em);
    }
}

.slide-fade-1-enter-from {
    opacity: 0;
    @include translateLeftOrUp;
}

.slide-fade-1-leave-to {
    opacity: 0;
    @include translateRightOrDown;
}

.slide-fade-2-enter-from {
    opacity: 0;
    @include translateRightOrDown;
}

.slide-fade-2-leave-to {
    opacity: 0;
    @include translateLeftOrUp;
}

.slide-fade-1-leave-active,
.slide-fade-2-leave-active {
    position: absolute;
}

.slide-fade-1-enter-active,
.slide-fade-1-leave-active,
.slide-fade-2-enter-active,
.slide-fade-2-leave-active {
    // If I don't use a Sass variable here, I get an error.
    $transition-duration: var(--transition-duration, 0.7s);
    transition: all $transition-duration ease-in-out;
}
</style>
