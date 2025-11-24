import VueKonva from "vue-konva";
import VueLazyload from "vue3-lazyload";
import { plugin as modalPlugin } from "@/components/projects/ProjectModal.vue";

import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((app) => {
  app.vueApp.use(VueKonva);
  // @ts-expect-error ignore
  app.vueApp.use(VueLazyload);
  app.vueApp.use(modalPlugin);
});
