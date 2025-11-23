<script setup lang="ts">
import _zindex from "@/zindex";
import {reactive} from "vue";
import {NuxtPage} from "#components";
import { useHead } from "nuxt/app";

const zindex = reactive(_zindex);
useHead({
    title: "veracioux | Haris Gušić",
    htmlAttrs: {
        lang: "en",
    }
});
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
