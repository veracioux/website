<script setup lang="ts">
import Icon, { type IconProps } from "@/components/generic/Icon.vue";
import type { CSSProperties } from "vue";
import urls from "@/urls.json";

export interface SocialIconProps {
  name: IconProps["name"];
  text?: string;
  /** The URL. */
  href?: string;
  /** Content that should be copied to clipboard when the icon is clicked.  */
  clipboard?: string;
  /** Whether to use the icon's natural color rather than CSS color property. */
  colorize?: boolean;
}

type IconData = Omit<SocialIconProps, "name"> & {
  style?: CSSProperties;
};

const nameToDataMap: Record<string, IconData> = {
  linkedin: {
    href: urls.linkedin,
    style: {
      color: "#0a66c2",
    },
  },
  github: {
    href: urls.github,
    style: {
      color: "white",
    },
  },
  web: {
    href: urls.website,
  },
  phone: {
    href: urls.phone,
  },
  monero: {
    clipboard: "TODO",
    style: {
      color: "#e66320",
    },
  },
  mail: {
    href: "mailto:hgusic.pub@gmail.com",
  },
};

const props = defineProps<SocialIconProps>();

const href =
  props.href ?? nameToDataMap[props.name as keyof typeof nameToDataMap]?.href;
</script>

<template>
  <component
    :is="href ? 'a' : 'span'"
    :href="href"
    target="_blank"
    class="leading-6 !inline-flex !items-center"
  >
    <Icon
      :name="name"
      :style="
        colorize
          ? nameToDataMap[name as keyof typeof nameToDataMap]?.style
          : undefined
      "
    />
    <span class="ml-1.5">{{ text }}</span>
  </component>
</template>
