<script setup lang="ts">
import {onMounted} from "vue";
import SocialIcon from "@/components/generic/SocialIcon.vue";
import Icon from "@/components/generic/Icon.vue";

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
    <div>
        ContactView
    </div>
</template>

<style scoped>
* {
    color: red;
}
</style>
