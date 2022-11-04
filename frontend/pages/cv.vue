<script setup lang="ts">
import PageWithNavbar from "@/components/PageWithNavbar.vue";
import CV from "@/components/sections/CV.vue";
import {ScrollData} from "../inject";

ScrollData.provide();
</script>

<template>
  <PageWithNavbar>
    <CV />
  </PageWithNavbar>
</template>
