<script setup lang="ts">
defineProps<{
    startDate: string | number;
    endDate?: string | number;
    displayDate?: string;
    first?: boolean;
    last?: boolean;
}>();
</script>

<template>
    <tr :class="s.timeLineItem">
        <td>
            <div :class="s.timeSpan">
                {{ displayDate ?? `${startDate} - ${endDate}` }}
            </div>
        </td>
        <td :class="s.lineCell">
            <div :class="s.line" />
            <div :class="s.dot" />
        </td>
        <td>
            <div :class="s.text">
                <slot />
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
            position: absolute;
            width: var(--width);
            inset: 0;
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
        margin: 2px 0;

        @include screenSizeAbove($tablet) {
            margin: 4px 0;
        }

        @include screenSizeAbove($small) {
            margin: 6px 0;
        }

        @include screenSizeAbove($large, $small) {
            margin: 8px 0;
        }
    }
}
</style>
