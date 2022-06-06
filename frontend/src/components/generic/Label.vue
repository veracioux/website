<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div :class="$style.container" :title="title">{{ title }}</div>
</template>

<style module lang="scss">
.container {
    display: inline-block;
    font-size: 12px;
    border-radius: 4px;
    padding: 6px;
    // Avoids the height being stretched out when displayed in the CV timeline
    line-height: 1em;

    text-align: center;
    white-space: nowrap;
    background: rgba(var(--color-primary-rgb), 0.2);
    color: white;

    user-select: none;
}

.container[title="C++"] {
    background: orange;
}

.container[title="Qt"] {
    background: orange;
}
</style>
