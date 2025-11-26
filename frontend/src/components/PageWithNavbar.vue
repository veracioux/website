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
      <Navbar class="opacity-0" />
    </slot>
    <div class="basis-full relative overflow-hidden">
      <div
        class="absolute inset-0 overflow-y-scroll overflow-x-hidden scroll-smooth"
        ref="scrollContainer"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
