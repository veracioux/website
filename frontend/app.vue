<script setup lang="ts">
import _zindex from "@/zindex";
import {reactive} from "vue";
import {NuxtPage} from "#components";

const zindex = reactive(_zindex);
</script>

<template>
    <NuxtPage />
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
// NOTE: BUG?: Without this <style> tag and this comment, sass fails
</style>
