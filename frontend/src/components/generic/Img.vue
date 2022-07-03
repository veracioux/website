<!-- <img> that fades in when loaded. -->
<template>
    <img v-bind="$props" onload="this.style.opacity = 1" :class="s.image" />
</template>

<style lang="scss" module="s">
// When an <img> loads, we want its opacity to transition to 1.
// Corresponding JS code is in App.vue.
.image {
    opacity: 0;
    transition: opacity 0.5s;
}
</style>
