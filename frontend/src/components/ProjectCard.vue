<script setup lang="ts">
import Label from "@/components/generic/Label.vue";
import Icon from "@/components/generic/Icon.vue";
import commonStyle from "@/assets/common.module.scss";

defineProps({
    title: String,
    desc: String,
    url: String,
    image_url: String,
    extra_image_url: String,
    languages: Array,
    roles: Array,
});
</script>

<template>
    <div :class="$style.container">
        <a v-if="url" :href="url" target="_blank" :class="$style.externalLink">
            <Icon name="externalLink" :class="$style.externalLinkIcon" />
        </a>
        <img
            v-if="image_url"
            :src="image_url"
            alt="Project image"
            :class="$style.name"
        />
        <div :class="$style.title">{{ title }}</div>
        <div :class="$style.description">{{ desc }}</div>
        <div :class="commonStyle.labelContainer">
            <Label v-for="role in roles" :title="role" />
        </div>
    </div>
</template>

<style module lang="scss">
.container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    padding: 64px 48px;
    width: 280px;
    font-size: 16px;
    border-radius: 10px;
    background: #00000040;

    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.container:hover {
    transform: scale(105%);
    transform-origin: center;
    box-shadow: rgba(var(--color-secondary-rgb), 0.4) 0 0 8px;

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

.name {
    height: 54px;
}

.title {
    color: #7c4dff;
    font-weight: bold;
    font-size: 24px;
}

.description {
    text-align: center;
    color: rgba(var(--color-secondary-rgb), 0.5);
}
</style>
