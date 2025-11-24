<script setup lang="ts">
import { NuxtPage } from "#components";
import { useHead } from "nuxt/app";
import { ScrollData } from "./inject";

useHead({
  title: "veracioux | Haris Gušić",
  htmlAttrs: {
    lang: "en",
  },
});

ScrollData.provide();
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
