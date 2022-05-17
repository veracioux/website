<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Shutter from "@/components/Shutter.vue";
import Projects from "@/components/home/Projects.vue";
import Home from "@/views/HomeView.vue";
import "@/assets/shared.css";
import {onMounted, ref} from "vue";
import {ScrollData} from "@/inject";
import * as utils from "@/utils";

const relativeScrollY = ref(0);

onMounted(() => {
    utils.onScroll(() => {
        relativeScrollY.value = window.scrollY / window.innerHeight;
    });
});

ScrollData.provide({
    relativeScrollY,
})

</script>
<template>
    <div>
        <Navbar class="navbar"/>
        <!-- TODO: Use events for this. -->
        <div class="background full-window"/>
        <img alt="mugshot"
             class="mugshot"
             :style="{
                filter:
                    'blur(' + 15 * Math.max(1 - 4 * relativeScrollY, 0) + 'px)',
             }"
             src="@/assets/mugshot.jpg"
        />
        <div class="home-section-space-occupant full-window"/>
        <div id="home" class="home-section-space-occupant full-window"/>
        <Shutter class="shutter"/>
        <Home class="home"/>
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

/* Selectors are ordered by z-index, ascending */
.mugshot {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    width: 280px;
    z-index: 5;
    transform: translate(1.5%, 3%);
}

@media screen and (max-width: 640px), screen and (max-height: 640px) {
    .mugshot {
        width: 200px;
    }
}

.background {
    width: 100%;
    height: 100%;
    position: fixed;
    background: #e1d8d1;
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
