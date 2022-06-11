<script setup lang="ts">
import Shutter from "@/components/Shutter.vue";
import Projects from "@/components/home/Projects.vue";
import Home from "@/components/home/Home.vue";
import CV from "@/components/home/CV.vue";
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

function onScroll() {
    relativeScrollY.value = window.scrollY / window.innerHeight;
}

onMounted(() => {
    utils.onScroll(onScroll);
    window.addEventListener("resize", onScroll);
});

ScrollData.provide({
    relativeScrollY,
});
</script>
<template>
    <div style="position: relative; top: 0">
        <div class="-home-section-space-occupant fullWindow" />
        <div id="home" class="-home-section-space-occupant fullWindow" />
        <div style="position: relative" v-if="relativeScrollY <= 3">
            <Shutter class="shutter" :style="styleStickyUntilThreshold(2)" />
            <Home class="home" :style="styleStickyUntilThreshold(2)" />
        </div>
        <div class="-home-section-space-occupant fullWindow" />
        <Projects id="projects" class="projects" />
        <CV id="cv" class="cv" />
    </div>
</template>

<style scoped lang="scss">
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

.projects,
.cv {
    z-index: 70;
    position: relative;
    background: var(--color-background-2);
}
</style>
