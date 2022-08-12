<script setup lang="ts">
import Intro from "@/components/home/Intro.vue";
import {defineAsyncComponent, onMounted, reactive, ref} from "vue";
import type {CSSProperties} from "vue";
import {ScrollData} from "@/inject";
import * as utils from "@/utils";
// noinspection ES6UnusedImports
import zindex from "@/zindex";
import Navbar from "@/components/Navbar.vue";

const Shutter = defineAsyncComponent(() => import("@/components/Shutter.vue"));
const Projects = defineAsyncComponent(() => import("@/components/home/Projects.vue"));
const CV = defineAsyncComponent(() => import("@/components/home/CV.vue"));
const About = defineAsyncComponent(() => import("@/components/home/About.vue"));

const relativeScrollY = ref(0);
const veraciouxStyle = reactive<CSSProperties>({});
const animatableVeraciouxTextElement = ref<HTMLElement>();
const veraciouxTextFadeable = ref(false);
const navbarOpaque = ref(false);

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

function styleWithRelativeHeight(relativeHeight: number) {
    return {
        minHeight: `${relativeHeight * 100}vh`,
    };
}

function onScroll() {
    relativeScrollY.value = window.scrollY / window.innerHeight;
}

let veraciouxTextAnimation: Animation | undefined = undefined;

function onVeraciouxCrossedThreshold(
    where: "above" | "below",
    boundingRect: DOMRect
) {
    if (!animatableVeraciouxTextElement.value) return;

    const sourceRect = boundingRect,
        targetRect =
            animatableVeraciouxTextElement.value!.getBoundingClientRect();
    if (where === "above") {
        if (navbarOpaque.value)
            // Navbar is already fully visible. The animation is not needed anymore.
            return;
        navbarOpaque.value = true;
        veraciouxStyle.visibility = "hidden";
        veraciouxTextAnimation?.cancel();
        if (
            sourceRect.y >= sourceRect.height &&
            sourceRect.y <= 0.3 * window.innerHeight
        ) {
            veraciouxTextAnimation =
                animatableVeraciouxTextElement.value!.animate(
                    [
                        {
                            position: "fixed",
                            top: `${sourceRect.y}px`,
                            left: `${sourceRect.x}px`,
                        },
                        {
                            position: "fixed",
                            top: `${targetRect.y}px`,
                            left: `${targetRect.x}px`,
                        },
                    ],
                    {duration: 300, easing: "ease-in-out"}
                );
        }
    } else {
        veraciouxTextFadeable.value = true;
        veraciouxStyle.visibility = undefined;
    }
}

function onAnimatableVeraciouxTextElementMounted(element: HTMLElement) {
    animatableVeraciouxTextElement.value = element;
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
    <Navbar
        :class="{opaque: navbarOpaque}"
        @animatableVeraciouxTextElementMounted="
            onAnimatableVeraciouxTextElementMounted
        "
    />
    <div class="container">
        <div
            class="%home-section-space-occupant"
            :style="styleWithRelativeHeight(0.4)"
        />
        <div
            id="home"
            class="%home-section-space-occupant fullWindow"
            :style="styleWithRelativeHeight(0.6)"
        />
        <div style="position: relative" v-if="relativeScrollY <= 2">
            <Shutter class="shutter" :style="styleStickyUntilThreshold(1)" />
            <Intro
                class="home"
                :style="styleStickyUntilThreshold(1)"
                :veracioux-style="veraciouxStyle"
                :veracioux-text-fadeable="veraciouxTextFadeable"
                @veraciouxCrossedThreshold="onVeraciouxCrossedThreshold"
            />
        </div>
        <div class="-home-section-space-occupant fullWindow" />
        <Projects id="projects" class="projects" />
        <CV id="cv" class="cv" />
        <About id="about" class="about" />
    </div>
</template>

<style lang="scss">
.navbar {
    .background,
    .contentLeft,
    .contentRight {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.6s;
    }

    &:not(.opaque) .veracioux {
        visibility: hidden;
    }

    &.opaque {
        .background,
        .contentLeft,
        .contentRight {
            opacity: 1;
            pointer-events: unset;
        }
    }
}
</style>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
.container {
    position: relative;
}

.shutter {
    @include c.fillParent;
    z-index: v-bind("zindex.shutter");
}

.home {
    @include c.fillParent;
    z-index: v-bind("zindex.introSection");
}

.projects,
.cv,
.about {
    position: relative;
    background: var(--color-background-2);
    z-index: v-bind("zindex.section");
}

</style>
