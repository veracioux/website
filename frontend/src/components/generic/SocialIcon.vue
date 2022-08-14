<script setup lang="ts">
import Icon from "@/components/generic/Icon.vue";
import type {CSSProperties} from "vue";
import urls from "@/urls.json";

export interface SocialIconProps {
    iconName: keyof typeof nameToDataMap;
    /** The URL. */
    href?: string;
    /** Content that should be copied to clipboard when the icon is clicked.  */
    clipboard?: string;
}

type IconData = SocialIconProps & {
    style: CSSProperties;
};

const nameToDataMap: Record<string, IconData> = {
    linkedin: {
        iconName: "linkedin",
        href: urls.linkedin,
        style: {
            color: "#0a66c2",
        },
    },
    github: {
        iconName: "github",
        href: urls.github,
        style: {
            color: "white",
        },
    },
    monero: {
        iconName: "monero",
        clipboard: "TODO",
        style: {
            color: "#e66320",
        },
    },
};

defineProps<SocialIconProps>();
</script>

<template>
    <component :is="href ? 'a' : 'span'" :href="href">
        <Icon
            :name="nameToDataMap[iconName].spec ?? iconName"
            :style="nameToDataMap[iconName].style"
            class="icon"
        />
    </component>
</template>

<style scoped lang="scss">
.icon {
    height: 28px;
}
</style>
