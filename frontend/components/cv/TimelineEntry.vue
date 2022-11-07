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
    <tr class="timeLineItem">
        <td>
            <div :class="['timeSpan', { isPdf }]">
                {{ displayDate ?? `${startDate} - ${endDate}` }}
            </div>
        </td>
        <td class="lineCell">
            <div class="line" />
            <div class="dot" />
        </td>
        <td>
            <div :class="['text', 'acceptsMargin', { isPdf }]">
                <slot>
                    <component v-if="node" :is="node" />
                </slot>
                <div v-if="labels" class="labelContainer">
                    <Label v-for="label of labels" :title="label" />
                </div>
            </div>
        </td>
    </tr>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
@use "@/assets/timeline-entry.module.scss" as timeline;
@import "@/assets/global.scss";

.timeLineItem {
    position: relative;

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

    .acceptsMargin {
        margin-left: 0;
        margin-right: 0;
        @include timeline.responsiveVerticalMargin(10px, 10px);

        @media print {
            @include timeline.responsiveVerticalMargin(4px, 4px);
        }
    }
}

.labelContainer {
    @include c.labelContainer;
    justify-content: flex-start;
}
</style>
