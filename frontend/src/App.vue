<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
    <div>
        <Navbar class="navbar" />
        <RouterView />
    </div>
</template>

<style scoped>
.navbar {
    z-index: 100;
}
</style>
