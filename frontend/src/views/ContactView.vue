<script setup lang="tsx">
import {defineComponent, onMounted} from "vue";
import SocialIcon from "@/components/generic/SocialIcon.vue";
import Icon from "@/components/generic/Icon.vue";

const addresses = {};

const AddressComponent = defineComponent({
    functional: true,
    render: () => <div></div>,
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
    <div class="fullWindow">
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
    </div>
</template>

<style scoped lang="scss"></style>
