<script setup lang="ts">
import Label from "@/components/generic/Label.vue";
import Icon from "@/components/generic/Icon.vue";

defineProps<{
  title: string;
  show_title: boolean;
  desc: string;
  url: string;
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
  <div
    class="relative self-stretch flex flex-col justify-center items-center gap-4 p-16 w-80 rounded-2xl"
    :class="s.container"
  >
    <div class="absolute inset-0" @click="$emit('expand')"></div>
    <a v-if="url" :href="url" target="_blank" :class="s.externalLink">
      <Icon name="externalLink" :class="s.externalLinkIcon" center />
    </a>
    <Icon
      v-if="image_url"
      :src="image_url"
      alt="Project image"
      class="h-14"
      center
    />
    <div
      v-if="show_title"
      class="text-[var(--color-primary)] font-bold text-xl"
    >
      {{ title }}
    </div>
    <div :class="p.description">{{ desc }}</div>
    <div :class="c.labelContainer">
      <Label v-for="role in roles" v-bind:key="role" :title="role"></Label>
    </div>
  </div>
</template>

<style module="p" lang="scss">
@forward "@/assets/project.module.scss";
</style>

<style module="c" lang="scss">
@forward "@/assets/common.module.scss";
</style>

<style module="s" lang="scss">
@use "@/assets/project.module.scss" as p;
.container {
  background: rgba(var(--color-background-0-rgb), 0.7);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
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
  transition:
    transform 0.1s ease,
    opacity 0.1s ease,
    filter 0.2s ease;
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
