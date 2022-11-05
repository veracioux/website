<script setup lang="ts">
import {computed, watch} from "vue";
import {clip} from "@/utils";

const props = withDefaults(
    defineProps<{
        /** The shell prompt text to show, or, in case of a boolean, whether to show the default prompt. */
        prompt?: string | boolean;
        text: string;
        /** Percentage of the command line that must be typed out. */
        progress: number;
        /** Whether to show a blinking text cursor (default: true) */
        showCursor?: boolean;
    }>(),
    {
        showCursor: true,
    }
);

const defaultPrompt = "$ ";

const end = computed(() => Math.floor(props.progress * props.text.length));
const prompt = computed(() =>
    props.prompt === true
        ? defaultPrompt
        : props.prompt === false
        ? ""
        : props.prompt ?? defaultPrompt
);
</script>

<template>
    <div style="position: relative">
        <div :style="end <= text.length + 1 && {opacity: 0}">
            <slot />
        </div>
        <div
            :class="[
                'cli',
                end >= 0 && end <= text.length ? 'visible' : null,
                $slots.default ? 'fillParent' : null,
            ]"
        >
            <span v-if="prompt">{{ prompt }}</span>
            <span
                :class="[end >= 0 && end <= text.length ? 'visible' : null]"
                >{{ text.slice(0, clip(end, [1, props.text.length])) }}</span
            >
            <span style="position: relative">
                <span v-if="showCursor && end <= text.length" class="cursor"
                    >█</span
                >
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
@use "@/assets/about.module.scss" as a;
@use "@/assets/standard-fade-transition.module.scss" as t;

.cli {
    padding: 12px;
    opacity: 0;
    pointer-events: none;

    .cursor {
        position: absolute;
        @include a.cursor;
    }

    &.visible {
        opacity: 1;
        @include t.standardFadeTransition;
    }
}

.fillParent {
    @include c.fillParent;
}
</style>

<!-- Standard fade transition style -->
<style scoped lang="scss">
@import "@/assets/standard-fade-transition.module.scss";
</style>
