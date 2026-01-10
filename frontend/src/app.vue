<script setup lang="ts">
import { NuxtPage } from "#components";
import { useHead } from "nuxt/app";
import { ScrollData } from "./inject";

useHead({
  title: "Haris Gušić | veracioux",
  htmlAttrs: {
    lang: "en",
  },
});

ScrollData.provide();
</script>

<template>
  <NuxtPage />
</template>

<style lang="scss">
// NOTE: BUG?: Without this <style> tag and this comment, sass fails
</style>
