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
    faMobile,
    faLocationDot,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faGitlab,
    faLinkedin,
    faMonero,
} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Img from "@/components/generic/Img.vue";
import {computed, defineProps, onMounted, ref} from "vue";
import {ContextIsPdf} from "@/inject";

library.add(
    faArrowUpRightFromSquare,
    faCircleDollarToSlot,
    faGlobe,
    faXmark,
    faCode,
    faEnvelope,
    faCodePullRequest,
    faMobile,
    faLocationDot,
    faCircleInfo,
    faGithub,
    faGitlab,
    faLinkedin,
    faMonero,
    faMobile,
);

const iconNameToFontAwesomeMap = {
    donate: "circle-dollar-to-slot",
    web: "globe",
    externalLink: "arrow-up-right-from-square",
    x: "xmark",
    code: "code",
    mail: "envelope",
    phone: "mobile",
    location: "location-dot",
    info: "circle-info",
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
    // TODO: This is a workaround to an annoying problem where the icon won't
    //  center properly
    center?: boolean;
}

const props = defineProps<IconProps>();

const root = ref<HTMLElement>();

const imageSrc = computed(() =>
    props.name ? iconNameToSrcMap[props.name]?.src ??
        iconNameToSrcMap[props.name] ??
        props.src
        : props.src
);

const isPdf = ContextIsPdf.inject();
const imgClass = ['iconWrapper', 'customIcon', iconNameToSrcMap[props.name]?.className];

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
    <span class="icon" ref="root">
            <FontAwesomeIcon
                v-if="props.name && iconNameToFontAwesomeMap[props.name]"
                :icon="iconNameToFontAwesomeMap[name]"
                class="iconWrapper faIcon"
            />
            <Img
                v-else-if="isPdf"
                :src="imageSrc"
                :alt="alt"
                :class="imgClass"
            />
            <Img
                v-else
                v-lazy="imageSrc"
                :alt="alt"
                :class="imgClass"
            />
    </span>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;

.icon {
    display: inline-block;
    vertical-align: middle;

    .iconWrapper {
        display: inline-block;
        vertical-align: middle;
        width: 100%;
        height: 100%;
    }
}

.faIcon {
    aspect-ratio: 1;

    // NOTE: seems to be the only way to make the FA icon centered in its
    // container.
    margin: 50%;
    transform: translate(-50%, -50%);
}

// NOTE: I tried to use .icon here, but for some reason it messes up
// the display completely
.customIcon {
    width: 100%;
    height: 100%;
    display: inline-block;
}
</style>
