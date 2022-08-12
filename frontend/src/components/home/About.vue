<script lang="ts">
import SectionTitle from "@/components/home/SectionTitle.vue";

export default {
    components: {SectionTitle}
}
</script>

<template>
    <div class="fullWindow section">
        <SectionTitle>
            About Me
        </SectionTitle>
    </div>
</template>

<style scoped lang="scss">
.section {
    background: var(--color-background-1);
}
</style>