<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Shutter from "@/components/Shutter.vue";
import Projects from "@/components/home/Projects.vue";
import Home from "@/components/home/Home.vue";
import "@/assets/shared.css";
import {onMounted, reactive, Ref, ref} from "vue";
import {ScrollData} from "@/inject";
import * as utils from "@/utils";

const relativeScrollY: Ref<number> = ref(0);

/**
 * Elements with this style will be sticky until a threshold is passed.
 * After that, they will scroll normally.
 */
function styleStickyUntilThreshold(relativeScrollThreshold: number) {
    if (relativeScrollY.value >= relativeScrollThreshold) {
        return {
            transform: `translateY(${-(relativeScrollY.value - relativeScrollThreshold) * window.innerHeight}px)`,
        }
    }
    return {
        transform: "none",
    }
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
    <div>
        <Navbar class="navbar"/>
        <div class="home-section-space-occupant full-window"/>
        <div id="home" class="home-section-space-occupant full-window"/>
        <Home class="home" :style="styleStickyUntilThreshold(1)"/>
        <Shutter class="shutter" :shutter-style="styleStickyUntilThreshold(1)"/>
        <Projects id="projects" class="projects"/>
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

.shutter {
    z-index: 50;

}

.home {
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
