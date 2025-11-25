<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";

const scrollContainer = ref<HTMLElement>();

defineExpose({
  scrollContainer,
});
</script>

<template>
  <div class="fixed inset-0 h-screen w-full">
    <slot name="navbar">
      <Navbar />
    </slot>
    <div
      class="relative h-full overflow-y-auto overflow-x-hidden scroll-smooth"
      ref="scrollContainer"
    >
      <slot></slot>
    </div>
  </div>
</template>
