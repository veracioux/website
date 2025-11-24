<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import PageWithNavbar from "@/components/PageWithNavbar.vue";
import CVSection from "@/components/sections/CV.vue";
import CV from "@/components/cv/CV.vue";
import { CvContext, ScrollData } from "@/inject";

const { isPdf } = CvContext.inject();

ScrollData.provide();

if (process.client && isPdf) {
  document.querySelector(":root")?.setAttribute("data-theme", "light");
}
</script>

<template>
  <PageWithNavbar v-if="!isPdf">
    <CVSection />
  </PageWithNavbar>
  <div v-else class="outsideOfPage">
    <div class="page">
      <CV class="cv" display-mode="byCategory" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;

.outsideOfPage {
  background: var(--color-background-1);

  .page {
    width: 210mm;
    height: 297mm;

    padding: 64px;
    margin: auto;
    background: var(--color-background-0);

    .cv {
      font-size: 11px;
    }
  }
}
</style>
