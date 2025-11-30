<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { ScrollData } from "~/inject";

const { scrollContainer } = ScrollData.inject();

defineExpose({
  scrollContainer,
});
</script>

<template>
  <div class="fixed inset-0 h-full w-full flex flex-col justify-stretch">
    <slot name="navbar">
      <Navbar class="no-print" />
    </slot>
    <div
      id="scroll-container"
      class="relative basis-full overflow-y-scroll overflow-x-hidden scroll-smooth"
      ref="scrollContainer"
    >
      <slot></slot>
    </div>
  </div>
</template>
