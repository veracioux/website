<script setup lang="ts">
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faArrowUpRightFromSquare,
    faCircleDollarToSlot,
    faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faMonero,
} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(faArrowUpRightFromSquare, faCircleDollarToSlot, faGlobe);
library.add(faLinkedin, faGithub, faMonero);

const iconNames: Record<string, string | string[]> = {
    donate: "circle-dollar-to-slot",
    website: "globe",
    externalLink: "arrow-up-right-from-square",
    github: ["fab", "github"],
    linkedin: ["fab", "linkedin"],
};

defineProps({
    name: String as () => keyof typeof iconNames,
});
</script>

<template>
    <FontAwesomeIcon :icon="iconNames[name]" />
</template>
