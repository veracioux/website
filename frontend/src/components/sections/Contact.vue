<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
</script>
<template>
    <div class="section">
        <SectionTitle text="Contact" slug="contact" />
    </div>
</template>
<style scoped lang="scss">
.section {
    position: relative;
    background: var(--color-background-2);

    :deep(.titleDecoration) {
        fill: var(--color-background-1);
    }
}
</style>
