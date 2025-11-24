<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div :class="s.viewportContainer">
    <slot name="navbar" :class="s.navbar">
      <Navbar />
    </slot>
    <div :class="s.content">
      <slot></slot>
    </div>
  </div>
</template>

<style module="s" lang="scss">
@use "@/assets/common.module.scss" as c;
.viewportContainer {
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100%;

  .content {
    @include c.scrollContainer;
  }
}
</style>
