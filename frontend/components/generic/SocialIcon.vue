<script setup lang="ts">
import Icon from "@/components/generic/Icon.vue";
import type {CSSProperties} from "vue";
import urls from "@/urls.json";

export interface SocialIconProps {
    name: keyof typeof nameToDataMap;
    text?: string;
    /** The URL. */
    href?: string;
    /** Content that should be copied to clipboard when the icon is clicked.  */
    clipboard?: string;
    /** Whether to use the icon's natural color rather than CSS color property. */
    colorize?: boolean;
}

type IconData = SocialIconProps & {
    name: string;
    style?: CSSProperties;
};

const nameToDataMap: Record<string, IconData> = {
    linkedin: {
        name: "linkedin",
        href: urls.linkedin,
        style: {
            color: "#0a66c2",
        },
    },
    github: {
        name: "github",
        href: urls.github,
        style: {
            color: "white",
        },
    },
    web: {
        name: "web",
        href: urls.website,
    },
    phone: {
        name: "phone",
        href: urls.phone,
    },
    location: {
        name: "location",
    },
    monero: {
        name: "monero",
        clipboard: "TODO",
        style: {
            color: "#e66320",
        },
    },
    mail: {
        name: "mail",
        href: "mailto:hgusic.pub@gmail.com",
    },
};

const props = defineProps<SocialIconProps>();

const href = props.href ?? nameToDataMap[props.name].href;
</script>

<template>
    <component :is="href ? 'a' : 'span'" :href="href" target="_blank" class="socialIconRoot">
        <Icon
            :name="nameToDataMap[name]?.name ?? name"
            :style="colorize ? nameToDataMap[name].style : undefined"
            class="icon"
        />
        <span class="text">{{ text }}</span>
    </component>
</template>

<style scoped lang="scss">
.socialIconRoot {
    line-height: 1.8;

    .text {
        margin-left: 6px;
    }
}

.icon {
    height: 28px;
}
</style>
