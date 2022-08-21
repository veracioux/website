<script setup lang="ts">
import {ref} from "vue";

defineProps<{
    progress: number;
}>();

const content = ref<HTMLElement>();
</script>

<template>
    <div style="position: relative">
        <div ref="content">
            <slot />
        </div>
        <div class="indicator">
            <b>To be continued...</b><span class="cursor">█</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/about.module.scss" as a;
.indicator {
    line-height: 2.5em;
}

.cursor {
    @include a.cursor;
}
</style>
