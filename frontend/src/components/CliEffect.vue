<script setup lang="ts">
import { computed } from "vue";
import { clip } from "@/utils";
import { ClientOnly } from "#components";

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
  <div class="relative">
    <div class="fallback" :style="end <= text.length && { opacity: 0 }">
      <slot></slot>
    </div>
    <ClientOnly>
      <div
        :class="[
          'opacity-0',
          'pointer-events-none',
          'cli',
          end >= 0 && end <= text.length ? 'opacity-100' : null,
          $slots.default ? 'absolute inset-0' : null,
        ]"
      >
        <span v-if="prompt">{{ prompt }}</span>
        <span
          :class="[
            'dynamicText',
            end >= 0 && end <= text.length ? 'opacity-100' : null,
          ]"
        >
          <span class="invisible w-0">|</span>
          {{ text.slice(0, clip(end, [0, props.text.length])) }}
        </span>
        <span style="position: relative">
          <span v-if="showCursor && end <= text.length" class="cursor">█</span>
        </span>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
@use "@/assets/about.module.scss" as a;
@use "@/assets/standard-fade-transition.module.scss" as t;

.cursor {
  position: absolute;
  @include a.cursor;
}

.fallback,
.dynamicText,
.cursor {
  @include t.standardFadeTransition;
}
</style>

<!-- Standard fade transition style -->
<style scoped lang="scss">
// TODO: Works?
@forward "@/assets/standard-fade-transition.module.scss";
</style>
