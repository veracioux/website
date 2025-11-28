<script setup lang="ts">
import ProjectCard from "@/components/projects/ProjectCard.vue";
import type { Project } from "@/models";
import ProjectModal from "@/components/projects/ProjectModal.vue";
import { computed, reactive, ref } from "vue";
import projects from "@/projects.json";

import SectionTitle from "@/components/SectionTitle.vue";

const modal = reactive<{ show: boolean; project: Partial<Project> | null }>({
  show: false,
  project: null,
});

/** Id of the project whose preview image/animation is shown. */
const previewedProjectId = ref<number>();
const imageContainer = ref<HTMLElement>();

/** If the Teleport is not conditioned on this, Vue throws an error */
const includeTeleport = computed(() => imageContainer.value !== undefined);

function openModal(project: Partial<Project>) {
  modal.show = true;
  modal.project = project;
}

function onMouseEnterProjectCard(projectId: number) {
  previewedProjectId.value = projectId;
}

function onMouseLeaveProjectCard() {
  if (!modal.show) previewedProjectId.value = undefined;
}
</script>

<template>
  <div class="relative pb-16 bg-[var(--color-background-1)]">
    <div
      class="imageContainer absolute inset-0 flex items-center justify-center overflow-hidden"
      id="image-container"
      ref="imageContainer"
      @mouseenter="previewedProjectId = undefined"
    >
      <!-- Will hold the preview of the project (if it exists) via a <Teleport> -->
    </div>
    <SectionTitle class="mb-8" text="Projects" slug="projects" />
    <div class="flex flex-wrap justify-center items-center gap-10 m-8 h-full">
      <template v-for="project in projects" :key="project.id">
        <Teleport v-if="includeTeleport" to="#image-container">
          <Transition name="preview-image-fade">
            <template
              v-if="
                previewedProjectId === project.id && project.extra_image_url
              "
            >
              <video v-if="project.video_url"></video>
              <img
                v-else
                class="previewGraphic"
                v-lazy="project.extra_image_url"
              />
            </template>
          </Transition>
        </Teleport>
        <ProjectCard
          v-bind="project"
          class="card"
          @expand="
            openModal(project);
            previewedProjectId = project.id!;
          "
          @mouseenter="onMouseEnterProjectCard(project.id)"
          @mouseleave="onMouseLeaveProjectCard"
        />
      </template>
      <ProjectModal
        v-if="modal.show"
        :project="modal.project"
        @close="modal.show = false"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;

.imageContainer {
  .previewGraphic {
    position: absolute;
    user-select: none;
    pointer-events: none;
    inset: 3rem;
    opacity: 0.15;
    transition: opacity 2s;
    width: auto;
    height: calc(100% - 8rem);
    margin: auto;

    &.preview-image-fade-enter-from {
      opacity: 0;
    }

    &.preview-image-fade-enter-to {
      opacity: 0.15 !important;
    }

    &.preview-image-fade-leave-from {
      opacity: 0.15 !important;
    }

    &.preview-image-fade-leave-to {
      opacity: 0;
    }
  }
}

// :deep(.titleDecoration) {
//   fill: var(--color-background-0);
// }
</style>
