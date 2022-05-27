<script setup lang="ts">
export type IconName = "linkedin" | "github" | "monero";

defineProps({
    iconName: String as () => IconName,
    href: String,
});

type Icon =
    | string
    | string[]
    | {
          spec: string | string[];
          style: Partial<CSSStyleDeclaration>;
      };

const nameMap: Record<IconName, Icon> = {
    linkedin: {
        spec: ["fab", "linkedin"],
        style: {
            color: "#0a66c2",
        },
    },
    github: {
        spec: ["fab", "github"],
        style: {
            color: "white",
        },
    },
    monero: {
        spec: ["fab", "monero"],
        style: {
            color: "#e66320",
        },
    },
};
</script>

<template>
    <a :href="href">
        <FontAwesomeIcon
            :icon="nameMap[iconName].spec"
            :style="nameMap[iconName].style"
            class="icon"
        />
    </a>
</template>

<style scoped>
.icon {
    height: 28px;
}
</style>
