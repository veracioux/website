<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";

let timeout: NodeJS.Timeout;

const opaque = ref(false);

onMounted(() => {
  timeout = setTimeout(() => {
    opaque.value = true;
  }, 1000);
});

onUnmounted(() => {
  clearTimeout(timeout);
});
</script>

<template>
  <img v-bind="$props" :class="[s.image]" :style="{opacity: opaque ? 1 : 0}" />
</template>

<style lang="scss" module="s">
.image {
  color: transparent;
  transition: opacity 1s;
}
</style>
