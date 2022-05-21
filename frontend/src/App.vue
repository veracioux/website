<script setup lang="ts">
import Shutter from "@/components/Shutter.vue";
import Projects from "@/components/home/Projects.vue";
import Home from "@/components/home/Home.vue";
import {onMounted, ref} from "vue";
import type {Ref} from "vue";
import {ScrollData} from "@/inject";
import * as utils from "@/utils";

const relativeScrollY: Ref<number> = ref(0);

/**
 * Elements with this style will be sticky until a threshold is passed.
 * After that, they will scroll normally.
 */
function styleStickyUntilThreshold(relativeScrollThreshold: number) {
    if (relativeScrollY.value >= relativeScrollThreshold) {
        return {position: "absolute"};
    }
    return {position: "fixed"};
}

onMounted(() => {
    utils.onScroll(() => {
        relativeScrollY.value = window.scrollY / window.innerHeight;
    });
});

ScrollData.provide({
    relativeScrollY,
});
</script>
<template>
    <div style="position: relative; top: 0">
        <Navbar class="navbar" />
        <div id="home" class="-home-section-space-occupant fullWindow" />
        <div style="position: relative">
            <Home class="home" :style="styleStickyUntilThreshold(1)" />
            <Shutter class="shutter" :style="styleStickyUntilThreshold(1)" />
        </div>
        <div id="home" class="-home-section-space-occupant fullWindow" />
        <Projects id="projects" class="projects" />
    </div>
</template>

<style>
html,
body {
    background: var(--color-background);
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
}
</style>

<style scoped>
.shutter {
    position: absolute;
    inset: 0;
    z-index: 50;
}

.home {
    position: absolute;
    inset: 0;
    z-index: 60;
}

.projects {
    z-index: 70;
    position: relative;
    background: #12131d;
}

.navbar {
    z-index: 100;
}
</style>
