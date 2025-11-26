<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import CV from "@/components/cv/CV.vue";
import CVMenu from "@/components/cv/CVMenu.vue";
import { computed, ref } from "vue";
import { CvContext } from "@/inject";
import { type DisplayMode } from "@/cv";
import * as utils from "@/utils";

const { resume } = CvContext.inject();
const isMobile = utils.isMobile();

const title = computed(() => (resume ? "Resume" : "Curriculum Vitae"));
const displayMode = ref<DisplayMode>("timeline");

function onDisplayModeChanged(value: DisplayMode) {
  displayMode.value = value;
}
</script>

<template>
  <div class="section">
    <SectionTitle class="sectionTitle" :text="title" slug="cv" />
    <CV class="cv" :display-mode="displayMode" />
    <div class="overlayContainer">
      <div class="overlay top" />
      <div class="overlay bottom">
        <CVMenu
          v-if="!isMobile"
          class="cvMenu"
          @displayModeChanged="onDisplayModeChanged"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;
@use "@/assets/global.scss";

$colorDimText: rgba(var(--color-text-rgb), 0.7);

.section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $colorDimText;
  background: var(--color-background-2);
  width: 100vw;

  :deep(.titleText) {
    color: var(--color-text);
    z-index: 2;
  }

  :deep(.titleDecoration) {
    fill: var(--color-background-1);
  }

  .cv {
    margin-top: 1.4em;
    margin-bottom: 7.5em;
  }
}

.overlayContainer {
  @include common.fillParent;
  z-index: 1;
  pointer-events: none;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .overlay {
    position: sticky;
    width: 100%;
    pointer-events: auto;

    $color: var(--color-background-2);

    &.top {
      top: 0;
      height: 6.2em;
      background: linear-gradient($color 60%, transparent);
    }

    &.bottom {
      // This is equal to the navbar height and is determined empirically
      bottom: 0;
      height: 5em;
      background: linear-gradient(transparent, $color 44%);
    }
  }
}

.cvMenu {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
}

.sectionTitle {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
}
</style>
