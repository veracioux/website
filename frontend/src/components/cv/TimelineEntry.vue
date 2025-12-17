<script setup lang="ts">
import Label from "@/components/generic/Label.vue";
import zindex from "@/zindex";
import type { Entry } from "@/cv";

defineProps<
  Entry & {
    active: boolean;
    selected: boolean;
  }
>();
</script>

<template>
  <tr :class="['timeLineItem', { active, selected }]">
    <td>
      <div class="timeSpan">
        {{ displayDate ?? `${startDate} - ${endDate}` }}
      </div>
    </td>
    <td class="relative w-[40px]">
      <div class="absolute inset-0">
        <div
          class="line absolute inset-0 -top-8 -bottom-8 mx-auto w-[4px] z-0"
        ></div>
        <div
          class="dot absolute inset-0 m-auto w-[16px] aspect-square rounded-full"
          :style="{ zIndex: zindex.cvTimelineEntryDot }"
        ></div>
      </div>
    </td>
    <td>
      <div class="py-2">
        <div class="description">
          <slot>
            <component v-if="node" :is="node" />
          </slot>
          <div v-if="labels" class="labelContainer">
            <Label :key="label" v-for="label of labels" :title="label"></Label>
          </div>
          <ul
            v-if="accomplishments?.length"
            class="!mt-2 font-thin text-[0.95em]"
          >
            <li
              class="flex gap-1"
              v-for="accomplishment in accomplishments"
              :key="accomplishment"
            >
              <span>•</span> {{ accomplishment }}
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
@use "@/assets/timeline-entry.module.scss" as timeline;
@use "@/assets/global.scss";

.timeLineItem {
  position: relative;
  cursor: pointer;
  pointer-events: none;

  @mixin scaleAll($base) {
    .description {
      transform: scale(calc($base));
    }

    .timeSpan {
      transform: scale(calc(1.03 * $base));
    }

    .dot {
      transform: scale(calc(1.26 * $base));
    }
  }

  @include global.screenWidthAbove(global.$small) {
    pointer-events: revert;

    .dot,
    .timeSpan,
    .description {
      transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
    }

    .dot {
      transform-origin: 50%;
    }

    .timeSpan {
      transform-origin: 100%;
      font-size: 0.9em;
    }

    .description {
      transform-origin: 0;
    }

    &:hover,
    &.active,
    &.selected {
      .dot,
      .timeSpan,
      .description {
        text-shadow: 2px 2px 6px rgba(var(--color-text-rgb), 0.4);
      }

      .dot {
        background: var(--color-secondary) !important;
      }
    }

    &.selected,
    &.active {
      .dot {
        background: var(--color-tertiary) !important;
      }
    }

    &:hover {
      @include scaleAll(1.015);
    }

    &.active {
      @include scaleAll(1.02);
    }

    &:hover.active {
      @include scaleAll(1.025);
    }

    &.selected {
      @include scaleAll(1.035);
    }

    &:hover.selected {
      @include scaleAll(1.045);
    }
  }

  &::before {
    position: relative;
    height: 10px;
    content: "";
  }

  &:first-of-type .line {
    top: 50%;
  }

  &:last-of-type .line {
    bottom: 50%;
  }

  .line {
    background: #545a8e;

    @media print {
      background: #b19bd9;
    }
  }

  .dot {
    background: var(--color-primary);
  }

  .timeSpan {
    text-align: right;
  }
}

.labelContainer {
  @include c.labelContainer;
  justify-content: flex-start;
}
</style>
