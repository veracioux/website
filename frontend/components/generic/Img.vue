<template>
    <img v-bind="$props" onload="this.style.opacity = 1" :class="[s.image, s.transparentAlt]" />
</template>

<style lang="scss" module="s">
// When an <img> loads, we want its opacity to transition to 1.
// Corresponding JS code is in App.vue.
.image {
    opacity: 0;
    transition: opacity 1s;
}

.transparentAlt {
    color: transparent;
}
</style>