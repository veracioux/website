<script setup lang="ts">
import Intro from "@/components/sections/Intro.vue";
import { onMounted, reactive, ref } from "vue";
import type { CSSProperties } from "vue";
import { ScrollData } from "@/inject";
import _zindex from "@/zindex";
import Navbar from "@/components/Navbar.vue";
import PageWithNavbar from "@/components/PageWithNavbar.vue";
import Shutter from "@/components/intro/Shutter.vue";
import Projects from "@/components/sections/Projects.vue";
import CV from "@/components/sections/CV.vue";
import { useRoute } from "#app";
import * as utils from "@/utils";

const zindex = reactive(_zindex);

const veraciouxStyle = reactive<CSSProperties>({});
const animatableVeraciouxTextElement = ref<HTMLElement>();
const veraciouxTextFadeable = ref(false);
const navbarOpaque = ref(useRoute().hash !== "");
const navbar = ref<HTMLElement>();
const pageWithNavbar = ref<InstanceType<typeof PageWithNavbar>>();

const isMobile = utils.isMobile();

const { relativeScrollY, scrollContainer } = ScrollData.provide();

const showCover = ref(true);

/**
 * Elements with this style will be sticky until a threshold is passed.
 * After that, they will scroll normally.
 */
function styleStickyUntilThreshold(relativeScrollThreshold: number) {
  if (relativeScrollY.value >= relativeScrollThreshold) {
    return { position: "absolute", top: `-${navbar.value!.clientHeight}px` };
  }
  return { position: "fixed" };
}

let veraciouxTextAnimation: Animation | undefined = undefined;

function onVeraciouxCrossedThreshold(
  where: "above" | "below",
  boundingRect: DOMRect
) {
  if (!animatableVeraciouxTextElement.value) return;

  const sourceRect = boundingRect,
    targetRect = animatableVeraciouxTextElement.value!.getBoundingClientRect();
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
      veraciouxTextAnimation = animatableVeraciouxTextElement.value!.animate(
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
        { duration: 300, easing: "ease-in-out" }
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
  scrollContainer.value = pageWithNavbar.value?.scrollContainer;
  // Avoid the mugshot flashing to the user on initial load
  showCover.value = false;
  // TODO temporary fix for a strange behavior: when the page is not scrolled
  //  to the top and is then reloaded, the Intro section misbehaves.
  scrollContainer.value?.scrollTo({
    top: 0,
    behavior: "instant",
  });
});
</script>
<template>
  <PageWithNavbar ref="pageWithNavbar">
    <template #navbar>
      <div ref="navbar" class="navbar">
        <Navbar
          :class="{ opaque: navbarOpaque }"
          @animatableVeraciouxTextElementMounted="
            onAnimatableVeraciouxTextElementMounted
          "
        />
      </div>
    </template>
    <div class="%home-section-space-occupant" style="min-height: 40vh" />
    <div
      id="home"
      class="%home-section-space-occupant"
      style="min-height: 60vh"
    ></div>
    <div class="relative">
      <Shutter
        class="shutter absolute inset-0"
        :style="styleStickyUntilThreshold(1)"
      />
      <Intro
        class="absolute inset-0"
        :style="{
          ...styleStickyUntilThreshold(1),
          ...(isMobile ? { transform: 'translateY(-30px)' } : {}),
        }"
        :veracioux-style="veraciouxStyle"
        :veracioux-text-fadeable="veraciouxTextFadeable"
        @veraciouxCrossedThreshold="onVeraciouxCrossedThreshold"
      />
      <div v-if="showCover" class="mugshotCover"></div>
    </div>
    <div class="%home-section-space-occupant fullWindow" />
    <Projects id="projects" class="projects" />
    <CV id="cv" class="cv" />
    <!--            <About id="about" class="about" />-->
    <!--            <Contact id="contact" class="contact" />-->
  </PageWithNavbar>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;

.navbar :deep(.navbar) {
  position: sticky;

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

.shutter {
  z-index: v-bind("zindex.shutter");
}

.mugshotCover {
  position: fixed;
  inset: 0;
  background: var(--color-background-0);
  z-index: v-bind("zindex.mugshotCover");
}

.intro {
  z-index: v-bind("zindex.introSection");
}

.projects,
.cv,
.about,
.contact {
  z-index: v-bind("zindex.section");
}
</style>
