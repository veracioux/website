<script setup lang="ts">
import {defineProps, VNode} from "vue";
import {ContextIsPdf} from "@/inject";
import Label from '@/components/generic/Label.vue';

const props = defineProps<{
    node?: () => VNode;
    startDate?: string | number;
    endDate?: string | number;
    displayDate?: string;
    labels?: string[];
}>();

const isPdf = ContextIsPdf.inject();

</script>

<template>
    <tr :class="s.timeLineItem">
        <td>
            <div :class="[s.timeSpan, { [s.isPdf]: isPdf }]">
                {{ displayDate ?? `${startDate} - ${endDate}` }}
            </div>
        </td>
        <td :class="s.lineCell">
            <div :class="s.line" />
            <div :class="s.dot" />
        </td>
        <td>
            <div :class="[s.text, { [s.isPdf]: isPdf }]">
                <slot>
                    <component v-if="node" :is="node" />
                </slot>
                <div v-if="labels" :class="s.labelContainer">
                    <Label v-for="label of labels" :title="label" />
                </div>
            </div>
        </td>
    </tr>
</template>

<style module="s" lang="scss">
@use "@/assets/common.module.scss" as c;
@import "@/assets/global.scss";

.timeLineItem {
    position: relative;

    &::before {
        position: relative;
        height: 10px;
        content: "";
    }

    &:first-child .lineCell .line {
        top: 50%;
    }

    &:last-child .lineCell .line {
        bottom: 50%;
    }

    .lineCell {
        position: relative;
        --width: 12px;
        @include screenSizeAbove($tablet) {
            --width: 14px;
        }
        @include screenWidthAbove($small) {
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

    .text,
    .timeSpan {
        --vertical-margin: 10px;

        &.isPdf {
            --vertical-margin: 5px;
        }

        margin: var(--vertical-margin) 0;

        @include screenSizeAbove($tablet) {
            margin: calc(var(--vertical-margin) * 1.2) 0;
        }

        @include screenSizeAbove($small) {
            margin: calc(var(--vertical-margin) * 1.4) 0;
        }

        @include screenSizeAbove($large, $small) {
            margin: calc(var(--vertical-margin) * 1.6) 0;
        }
    }
}

.labelContainer {
    @include c.labelContainer;
    justify-content: flex-start;
}
</style>
