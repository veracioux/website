<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
    <div>
        <Navbar class="navbar" />
        <RouterView />
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/global.scss";

.navbar {
    z-index: 100;
}
</style>
