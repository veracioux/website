<script setup lang="ts">
import Label from "@/components/generic/Label.vue";
import Icon from "@/components/generic/Icon.vue";
import c from "@/assets/common.module.scss";

defineProps<{
    title?: string;
    desc?: string;
    url?: string;
    image_url?: string;
    extra_image_url?: string;
    languages?: string[];
    roles?: string[];
}>();

defineEmits<{
    (e: "expand"): void;
}>();
</script>

<template>
    <div :class="s.container">
        <div :class="c.fillParent" @click="$emit('expand')" />
        <a v-if="url" :href="url" target="_blank" :class="s.externalLink">
            <Icon name="externalLink" :class="s.externalLinkIcon" />
        </a>
        <Icon
            v-if="image_url"
            :src="image_url"
            alt="Project image"
            :class="p.logo"
        />
        <div :class="p.title">{{ title }}</div>
        <div :class="p.description">{{ desc }}</div>
        <div :class="c.labelContainer">
            <Label v-for="role in roles" :title="role" />
        </div>
    </div>
</template>

<style module="p" lang="scss">
@import "@/assets/project.module.scss";
</style>

<style module="s" lang="scss">
@use "@/assets/project.module.scss" as p;
.container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    padding: 64px 48px;
    width: 280px;
    font-size: 1em;
    border-radius: 10px;
    background: rgba(var(--color-background-rgb), 0.7);

    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.container:hover {
    @include p.containerHighlighted;
    transform: scale(105%);
    transform-origin: center;
    cursor: pointer;
}

.externalLink {
    position: absolute;
    padding: 16px;
    top: 0;
    right: 0;
}

.externalLinkIcon {
    height: 24px;
    color: rgba(var(--color-secondary-rgb), 0.8);

    transform: scale(0);
    transform-origin: center;
    transition: transform 0.1s ease, opacity 0.1s ease, filter 0.2s ease;
    opacity: 0;
    filter: drop-shadow(0 0 1px transparent) drop-shadow(0 0 4px transparent);
}

.container:hover .externalLinkIcon {
    transform: scale(1);
    opacity: 1;
}

.externalLink:hover .externalLinkIcon {
    --color-drop-shadow: var(--color-primary);
    filter: drop-shadow(0 0 1px var(--color-drop-shadow))
        drop-shadow(0 0 4px var(--color-drop-shadow));
}
</style>
