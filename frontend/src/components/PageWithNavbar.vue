<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="fixed inset-0 h-screen w-full">
    <slot name="navbar">
      <Navbar />
    </slot>
    <div
      class="relative h-full overflow-y-auto overflow-x-hidden scroll-smooth"
    >
      <slot></slot>
    </div>
  </div>
</template>
