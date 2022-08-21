<script setup lang="ts">
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faArrowUpRightFromSquare,
    faCircleDollarToSlot,
    faGlobe,
    faXmark,
    faCode,
    faEnvelope,
    faCodePullRequest,
} from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faGitlab,
    faLinkedin,
    faMonero,
} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Img from "@/components/generic/Img.vue";
import {defineProps, onMounted, ref} from "vue";

library.add(
    faArrowUpRightFromSquare,
    faCircleDollarToSlot,
    faGlobe,
    faXmark,
    faCode,
    faEnvelope,
    faCodePullRequest
);
library.add(faGithub, faGitlab, faLinkedin, faMonero);

const iconNameToFontAwesomeMap = {
    donate: "circle-dollar-to-slot",
    web: "globe",
    externalLink: "arrow-up-right-from-square",
    x: "xmark",
    code: "code",
    mail: "envelope",
    PR: "code-pull-request",
    github: ["fab", "github"],
    gitlab: ["fab", "gitlab"],
    linkedin: ["fab", "linkedin"],
};

// NOTE: I created this and the required functionality, but it turned out
// I don't need it (yet). I'm keeping it in case I need it in the future.
const iconNameToSrcMap = {};

type IconName =
    | keyof typeof iconNameToFontAwesomeMap
    | keyof typeof iconNameToSrcMap;

export interface IconProps {
    /** Name of a FontAwesome icon. */
    name?: IconName;
    /** Explicit URL to the image file. */
    src?: string;
    alt?: string;
}

const props = defineProps<IconProps>();

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
    <span ref="root">
        <FontAwesomeIcon
            v-if="props.name && iconNameToFontAwesomeMap[props.name]"
            :icon="iconNameToFontAwesomeMap[name]"
            class="faIcon"
        />
        <Img
            v-else
            v-lazy="
                name
                    ? iconNameToSrcMap[name]?.src ??
                      iconNameToSrcMap[name] ??
                      src
                    : src
            "
            :alt="alt"
            v-bind="$attrs"
            :class="['icon', iconNameToSrcMap[name]?.className]"
        />
    </span>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;

.faIcon {
    width: 100%;
    height: 100%;
    // No other method of centering seems to work with FontAwesomeIcon
    margin: 50%;
    transform: translate(-50%, -50%);
}

.icon {
    display: inline-block;
    width: 100%;
    height: 100%;
}
</style>
