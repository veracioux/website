<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
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
  faFileArrowDown,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faGitlab,
  faLinkedin,
  faMonero,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Img from "@/components/generic/Img.vue";
import { onMounted, ref } from "vue";
import { CvContext } from "@/inject";

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
  faFileArrowDown,
  faPrint
);

export type IconProps = {
  /** Explicit URL to the image file. */
  src?: string;
  alt?: string;
} & (
  | {
      /** Name of a pre-defined icon. */
      name: IconName;
    }
  | {
      /** Source URL of a custom icon. */
      src: string;
    }
);

const props = defineProps<IconProps>();

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
  download: "file-arrow-down",
  github: ["fab", "github"],
  gitlab: ["fab", "gitlab"],
  linkedin: ["fab", "linkedin"],
  print: "print",
} as const;

type IconName = keyof typeof iconNameToFontAwesomeMap;

const root = ref<HTMLElement>();

const imageSrc = props.src;

const { isPdf } = CvContext.inject();

onMounted(() => {
  if (
    ((props as { name: IconName }).name !== undefined) ==
    ((props as { src: string }).src !== undefined)
  ) {
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
      v-if="(props as { name: IconName }).name && iconNameToFontAwesomeMap[(props as { name: IconName }).name]"
      :icon="iconNameToFontAwesomeMap[(props as { name: IconName }).name]"
      class="faIcon"
    />
    <Img v-else-if="isPdf" :src="imageSrc" :alt="alt" class="customIcon" />
    <Img v-else v-lazy="imageSrc" :alt="alt" class="customIcon" />
  </span>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;

.icon {
  display: inline-block;
  vertical-align: middle;

  .internalIcon {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;

    // NOTE: seems to be the only way to make the FA icon centered in its
    // container.
    margin: 50%;
    transform: translate(-50%, -50%);
  }
}

// NOTE: I tried to use .icon here, but for some reason it messes up
// the display completely
.customIcon {
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>
