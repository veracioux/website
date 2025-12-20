<script setup lang="ts">
import PageWithNavbar from "@/components/PageWithNavbar.vue";
import CVSection from "@/components/sections/CV.vue";
import CV from "@/components/cv/CV.vue";
</script>

<template>
  <PageWithNavbar class="no-print">
    <CVSection />
  </PageWithNavbar>
  <div class="only-print">
    <div class="page">
      <CV class="text-[11px]" display-mode="byCategory" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;

.page {
  height: 100vh;
  overflow: scroll;
  @media print {
    height: 297mm;
    width: 210mm;

    padding: 32px;
    margin: 0 auto;
    background: var(--color-background-0);
  }
}
</style>
