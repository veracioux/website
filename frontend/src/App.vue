<script setup lang="ts">
// noinspection ES6UnusedImports
import zindex from "@/zindex";
</script>

<template>
    <RouterView />
</template>

<style>
html,
body {
    background: var(--color-background-0);
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
}
</style>

<style lang="scss">
@import "@/assets/global.scss";
// The navbar is included in each view separately, because different views will
// want to customize its props. This is the common style for all of them.
.navbar {
    z-index: v-bind("zindex.navbar");
}
</style>
