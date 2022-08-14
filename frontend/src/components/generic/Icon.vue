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
import {CSSProperties, defineProps, onMounted, ref} from "vue";

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

const iconNames = {
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

type IconName = keyof typeof iconNames;

export interface IconProps {
    /** Name of a FontAwesome icon. */
    name?: IconName;
    /** Explicit URL to the image file. */
    src?: string;
    alt?: string;
}

const props = defineProps<IconProps>();

const iconStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    // No other method of centering seems to work with FontAwesomeIcon
    margin: "50%",
    transform: "translate(-50%, -50%)",
};

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
    <span ref="root" :class="s.container">
        <FontAwesomeIcon
            v-if="name"
            :icon="iconNames[name]"
            :class="s.icon"
            :style="iconStyle"
        />
        <Img
            v-if="src"
            v-lazy="src"
            :alt="alt"
            v-bind="$attrs"
            :class="s.icon"
            :style="iconStyle"
        />
    </span>
</template>

<style module="s" lang="scss">
@use "@/assets/common.module.scss" as c;

.container {
    .icon {
        width: 100%;
        height: 100%;
    }
}
</style>
