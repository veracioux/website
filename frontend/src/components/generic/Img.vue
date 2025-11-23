<script setup lang="ts">

import {onMounted, ref} from "vue";

const img = ref<HTMLElement>();

onMounted(() => {
    setTimeout(() => {
        img.value!.classList.add("opaque");
    }, 1000);
    img.value!.classList.add("transition");
});
</script>

<template>
    <img ref="img" v-bind="$props" :class="[s.image]" />
</template>

<style lang="scss" module="s">
// When an <img> loads, we want its opacity to transition to 1.
// Corresponding JS code is in App.vue.
.image {
    opacity: 0;
    color: transparent;
}

</style>

<style scoped lang="scss">
.transition {
    transition: opacity 1s;
}
.opaque {
    opacity: 1;
}
</style>