<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
</script>
<template>
    <div class="section">
        <SectionTitle class="sectionTitle"> Contact </SectionTitle>
    </div>
</template>
<style scoped lang="scss">
.section {
    background: var(--color-background-2);

    :deep(.titleDecoration) {
        fill: var(--color-background-1);
    }
}
</style>
