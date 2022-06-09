<script setup lang="ts">
export interface SelfPraiseProps {
    title: string;
    content: string;
}

defineProps<SelfPraiseProps>();
</script>

<template>
    <div :class="s.container">
        <div :class="s.title">{{ title }}</div>
        <div :class="s.content">{{ content }}</div>
    </div>
</template>

<style module="s" lang="scss">
.container {
    max-width: 300px;

    text-align: center;
    color: var(--color-text);

    .title {
        font-weight: bold;
        font-size: 0.7em;
        margin-bottom: 16px;
    }

    .content {
        font-size: 0.5em;
    }
}
</style>
