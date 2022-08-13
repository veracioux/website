<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import CV from "@/components/home/CV.vue";
</script>

<template>
    <div class="viewportContainer">
        <Navbar :class="s.navbar" />
        <div :class="s.content">
            <CV />
        </div>
    </div>
</template>

<style module="s" lang="scss">
:global(.viewportContainer) {
    .navbar {
        top: 0;
        position: sticky;
    }

    .content {
        position: relative;
        height: 100%;
        overflow: auto;
    }
}
</style>
