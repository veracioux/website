<script setup lang="ts">
import ProjectCard from "@/components/projects/ProjectCard.vue";
import { projects, type Project } from "@/projects";
import ProjectModal from "@/components/projects/ProjectModal.vue";
import { computed, reactive, ref } from "vue";

import SectionTitle from "@/components/SectionTitle.vue";

const modal = reactive<{ show: boolean; project?: Project }>({
  show: false,
});

/** Id of the project whose preview image/animation is shown. */
const previewedProjectId = ref<number>();
const imageContainer = ref<HTMLElement>();

/** If the Teleport is not conditioned on this, Vue throws an error */
const includeTeleport = computed(() => imageContainer.value !== undefined);

function openModal(project: Project) {
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
  <div
    class="relative flex flex-col justify-between bg-[var(--color-background-1)]"
  >
    <div
      class="imageContainer absolute inset-0 flex items-center justify-center overflow-hidden"
      id="image-container"
      ref="imageContainer"
      @mouseenter="previewedProjectId = undefined"
    >
      <!-- Will hold the preview of the project (if it exists) via a <Teleport> -->
    </div>
    <SectionTitle text="Projects" slug="projects" />
    <div class="grow flex justify-center items-center p-16">
      <div
        id="project-card-container"
        class="flex flex-wrap justify-center items-center gap-10 transition-opacity delay-200 duration-500"
        :style="{
          opacity: modal.show ? 0.5 : undefined,
        }"
      >
        <template v-for="project in projects" :key="project.id">
          <Teleport v-if="includeTeleport" to="#image-container">
            <Transition name="preview-image-fade">
              <template v-if="previewedProjectId === project.id">
                <video
                  v-if="project.video_url"
                  class="previewGraphic"
                  :src="project.video_url"
                  autoplay
                  muted
                  loop
                ></video>
                <img
                  v-else
                  class="previewGraphic"
                  v-lazy="project.extra_image_url"
                  :style="{
                    // Workaround for Tuterm's preview image being poorly cropped
                    'object-position':
                      project.slug === 'tuterm' ? 'top left' : undefined,
                  }"
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
      </div>
      <ProjectModal
        v-if="modal.show"
        :project="modal.project!"
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
    width: 100%;
    height: calc(100% - 3.75rem);
    inset: 0;
    top: auto;
    object-fit: cover;
    user-select: none;
    pointer-events: none;
    opacity: 40%;
    transition: opacity 2s;

    &.preview-image-fade-enter-from {
      opacity: 0;
    }

    &.preview-image-fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
