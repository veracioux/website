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
import {defineProps, onMounted, ref} from "vue";

library.add(faArrowUpRightFromSquare, faCircleDollarToSlot, faGlobe);
library.add(faLinkedin, faGithub, faMonero);

const iconNames = {
    donate: "circle-dollar-to-slot",
    website: "globe",
    externalLink: "arrow-up-right-from-square",
    github: ["fab", "github"],
    linkedin: ["fab", "linkedin"],
};

type IconName = keyof typeof iconNames;

const props = defineProps<{
    /** Name of a FontAwesome icon. */
    name?: IconName;
    /** Explicit URL to the image file. */
    src?: string;
    alt?: string;
}>();

const root = ref<HTMLElement>();
onMounted(() => {
    if ((props.name !== undefined) == (props.src !== undefined)) {
        console.error(
            "Please specify either 'name' or 'src' prop, but not both. The element in question:"
        );
        console.error(root.value);
    }
});
</script>

<template>
    <div ref="root">
        <FontAwesomeIcon v-if="name" :icon="iconNames[name]" class="icon" />
        <img v-if="src" :src="src" :alt="alt" v-bind="$attrs" class="icon" />
    </div>
</template>

<style scoped>
.icon {
    width: 100%;
    height: 100%;
}
</style>
