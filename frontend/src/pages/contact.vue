<script setup lang="ts">
import { defineComponent, onMounted, h } from "vue";
import PageWithNavbar from "@/components/PageWithNavbar.vue";

const AddressComponent = defineComponent({
  functional: true,
  render: () => h("div"),
});

onMounted(() => {
  /*
    // @ts-ignore
    import("https://latest.cactus.chat/cactus.js");
    // @ts-ignore
    import("https://latest.cactus.chat/style.css");
    // @ts-ignore
    initComments({
        node: document.getElementById("comment-section"),
        defaultHomeserverUrl: "matrix.org",
        serverName: "cactus.chat",
        siteName: "veracioux-website",
        commentSectionId: "comment-section",
    });
    */
});
</script>

<template>
  <PageWithNavbar>
    <AddressComponent>
      <div>0xDEADBEEF</div>
    </AddressComponent>
    <AddressComponent />
    <AddressComponent />
    <AddressComponent />
    <AddressComponent />
    <AddressComponent />
    <AddressComponent />
    <AddressComponent />
  </PageWithNavbar>
</template>

<style scoped lang="scss"></style>
