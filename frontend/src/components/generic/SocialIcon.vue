<script setup lang="ts">
import Icon from "@/components/generic/Icon.vue";

type IconData = {
    spec?: string | string[];
    style: Partial<CSSStyleDeclaration>;
};

const nameMap: Record<string, IconData> = {
    linkedin: {
        style: {
            color: "#0a66c2",
        },
    },
    github: {
        style: {
            color: "white",
        },
    },
    monero: {
        style: {
            color: "#e66320",
        },
    },
};

defineProps({
    iconName: String as () => keyof typeof nameMap,
    href: String,
});
</script>

<template>
    <a :href="href">
        <Icon
            :icon="nameMap[iconName].spec ?? iconName"
            :style="nameMap[iconName].style"
            class="icon"
        />
    </a>
</template>

<style scoped lang="scss">
.icon {
    height: 28px;
}
</style>
