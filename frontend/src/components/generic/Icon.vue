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
  /** Name of a pre-defined icon. */
  name?: IconName;
  /** Source URL of a custom icon. */
  src?: string;
  alt?: string;
};

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
      :icon="iconNameToFontAwesomeMap[props.name]"
      class="faIcon"
    />
    <template v-else>
      <Img :src="imageSrc" :alt="alt" class="customIcon only-print" />
      <ClientOnly>
        <Img v-lazy="imageSrc" :alt="alt" class="customIcon no-print" />
      </ClientOnly>
    </template>
  </span>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
