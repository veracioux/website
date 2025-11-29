<script setup lang="ts">
export interface SelfPraiseProps {
  title: string;
  content: string;
}

defineProps<SelfPraiseProps>();
</script>

<template>
  <div class="max-w-[300px] text-center text-[var(--color-text)]">
    <div class="font-bold text-lg mb-4">{{ title }}</div>
    <div class="text-base">{{ content }}</div>
  </div>
</template>
