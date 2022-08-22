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
    font-size: 0.8em;
    border-radius: 4px;
    padding: 6px;
    // Avoids the height being stretched out when displayed in the CV timeline
    line-height: 1em;

    text-align: center;
    white-space: nowrap;
    background: rgba(var(--color-primary-rgb), 0.25);
    color: white;

    user-select: none;
}

.container[title="C++"] {
    // TODO background: orange;
}

.container[title="Qt"] {
    // TODO background: orange;
}
</style>
