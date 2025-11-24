<script setup lang="ts">
import PageWithNavbar from "@/components/PageWithNavbar.vue";
import CVSection from "@/components/sections/CV.vue";
import CV from "@/components/cv/CV.vue";
import { CvContext } from "@/inject";

const { isPdf } = CvContext.inject();

if (process.client && isPdf) {
  document.querySelector(":root")?.setAttribute("data-theme", "light");
}
</script>

<template>
  <PageWithNavbar v-if="!isPdf">
    <CVSection />
  </PageWithNavbar>
  <div v-else class="relative bg-[var(--color-background-1)]">
    <div class="page">
      <CV class="cv" display-mode="byCategory" />
    </div>
    <ClientOnly>
      <div class="warning">
        Warning: this page should be viewed with print mode enabled in developer
        tools.
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;

body {
  background-color: red;
}

.page {
  aspect-ratio: 210 / 297;
  height: 100vh;
  overflow: scroll;

  padding: 32px;
  margin: 0 auto;
  background: var(--color-background-0);

  .cv {
    font-size: 11px;
  }
}

.warning {
  color: #ef5350;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  text-align: center;
  margin-top: 8px;
  line-height: 16px;

  @media print {
    display: none;
  }
}
</style>
