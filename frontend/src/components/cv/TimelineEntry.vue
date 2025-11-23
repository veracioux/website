<script setup lang="ts">
import { defineProps, type VNode } from "vue";
import Label from "@/components/generic/Label.vue";

defineProps<{
  name?: string;
  node?: () => VNode;
  startDate?: string | number;
  endDate?: string | number;
  displayDate?: string;
  labels?: string[];
  hovered?: boolean;
  selected?: boolean;
  active?: boolean;
}>();
</script>

<template>
  <tr :class="['timeLineItem', { active, selected }]">
    <td>
      <div class="acceptsMargin">
        <div class="timeSpan">
          {{ displayDate ?? `${startDate} - ${endDate}` }}
        </div>
      </div>
    </td>
    <td class="lineCell">
      <div class="acceptsMargin">
        <div class="line" />
        <div class="dot" />
      </div>
    </td>
    <td>
      <div class="acceptsMargin">
        <div class="description">
          <slot>
            <component v-if="node" :is="node" />
          </slot>
          <div v-if="labels" class="labelContainer">
            <!-- TODO: Check if key is appropriate -->
            <Label
              v-bind:key="label"
              v-for="label of labels"
              :title="label"
            ></Label>
          </div>
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

  &:first-of-type .lineCell .line {
    top: 50%;
  }

  &:last-of-type .lineCell .line {
    bottom: 50%;
  }

  .lineCell {
    position: relative;
    --width: 12px;
    @include global.screenSizeAbove(global.$tablet) {
      --width: 14px;
    }
    @include global.screenWidthAbove(global.$small) {
      --width: 16px;
    }
    width: var(--width);

    .line {
      @include c.fillParent;
      width: var(--width);
      z-index: 0;

      &::after {
        display: block;
        width: 4px;
        height: 100%;
        margin: auto;
        background: rgba(var(--color-secondary-rgb), 0.3);
        content: "";
      }
    }

    .dot {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      aspect-ratio: 1;
      border-radius: 50%;

      background: var(--color-primary);
      z-index: 1;
    }
  }

  .timeSpan {
    text-align: right;
  }

  .acceptsMargin {
    margin-left: 0;
    margin-right: 0;
    @include timeline.responsiveVerticalMargin(10px, 10px);

    @media print {
      @include timeline.responsiveVerticalMargin(7px, 7px);
    }
  }
}

.labelContainer {
  @include c.labelContainer;
  justify-content: flex-start;
}
</style>
