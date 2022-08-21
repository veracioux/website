<script setup lang="ts">
import {computed, watch} from "vue";
import {clip} from "@/utils";

const props = defineProps<{
    /** The shell prompt text to show, or, in case of a boolean, whether to show the default prompt. */
    prompt?: string | boolean;
    text: string;
    /** Percentage of the command line that must be typed out. */
    progress: number;
}>();

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
        <Transition name="standard-fade">
            <div v-if="end >= 0 && end <= text.length" class="cli">
                <span v-if="prompt">{{ prompt }}</span>
                <span>{{
                    text.slice(0, clip(end, [0, props.text.length]))
                }}</span>
                <span v-if="end <= text.length" class="cursor">█</span>
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
@use "@/assets/about.module.scss" as a;

.cli {
    @include c.fillParent;
    padding: 12px;
    .cursor {
        @include a.cursor;
    }
}
</style>

<!-- Standard fade transition style -->
<style scoped lang="scss">
@import "@/assets/standard-fade-transition.module.scss";
</style>
