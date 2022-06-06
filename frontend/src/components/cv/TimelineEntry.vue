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
    <tr :class="s.timelineItem">
        <td :class="s.timeSpan">
            {{ displayDate ?? `${startDate} - ${endDate}` }}
        </td>
        <td>
            <div :class="s.timeLine">
                <div :class="{[s.line]: true, first: first, last: last}" />
                <div :class="s.dot"></div>
            </div>
        </td>
        <td :class="s.text">
            <slot />
        </td>
    </tr>
</template>

<style module="s" lang="scss">
.timelineItem,
.timelineItem > :global(td) {
    height: 100%;
}
.timeSpan {
    text-align: right;
    color: rgba(var(--color-secondary-rgb), 0.7);
    font-weight: bold;
}
.timeLine {
    position: relative;
    min-height: 48px;
    inset: 0;
    height: 100%;
    width: 28px;
    margin: 0;

    .line {
        position: absolute;
        inset: 0;
        width: 3px;
        margin: 0 auto;
        background: rgba(var(--color-secondary-rgb), 0.3);

        &:global(.first) {
            top: 50%;
        }
        &:global(.last) {
            bottom: 50%;
        }
    }
    .dot {
        position: absolute;
        inset: 0;
        margin: auto;
        width: 16px;
        height: 16px;

        background: var(--color-primary);
        border-radius: 50%;
    }
}
.text {
    max-width: 560px;
}
</style>
