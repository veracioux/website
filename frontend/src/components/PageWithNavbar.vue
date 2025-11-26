<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";

const scrollContainer = ref<HTMLElement>();

defineExpose({
  scrollContainer,
});
</script>

<template>
  <div class="fixed inset-0 h-screen w-full flex flex-col justify-stretch">
    <slot name="navbar">
      <Navbar class="no-print" />
    </slot>
    <div
      class="relative basis-full overflow-y-scroll overflow-x-hidden scroll-smooth"
      ref="scrollContainer"
    >
      <slot></slot>
    </div>
  </div>
</template>
