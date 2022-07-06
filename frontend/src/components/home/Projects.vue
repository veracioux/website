<script setup lang="ts">
import ProjectCard from "@/components/ProjectCard.vue";
import useSWRV from "swrv";
import "@/assets/home.scss";
import type {Project} from "@/models";
import ProjectModal from "@/components/ProjectModal.vue";
import {onMounted, reactive, ref} from "vue";
import Img from "@/components/generic/Img.vue";

const modal = reactive<{show: boolean; project: Project | null}>({
    show: false,
    project: null,
});
// Id of the project whose preview image/animation is shown.
const previewedProjectId = ref<number>();
const imageContainer = ref<HTMLElement>();

const {data: projects} = useSWRV<Array<Partial<Project>>>(
    () => "/api/projects/",
    (key) => fetch(key).then((resp) => resp.json())
);

projects.value = [
    {
        id: 0,
        title: "Dummy",
        desc: "Dummy project",
        url: "",
    },
];

function openModal(project: Project) {
    modal.show = true;
    modal.project = project;
}

function onMouseLeaveProjectCard() {
    if (!modal.show) previewedProjectId.value = undefined;
}
</script>

<template>
    <div class="section">
        <div class="imageContainer" id="image-container" ref="imageContainer">
            <!-- Will hold the preview of the project (if it exists) via a <Teleport> -->
        </div>
        <h1 class="sectionTitle">Projects</h1>
        <div class="cardContainer">
            <template v-for="project in projects" :key="project.id">
                <Teleport v-if="imageContainer" to="#image-container">
                    <Transition name="preview-image-fade">
                        <img
                            class="previewImage"
                            v-if="
                                previewedProjectId === project.id &&
                                project?.extra_image_url
                            "
                            v-lazy="project?.extra_image_url"
                        />
                    </Transition>
                </Teleport>
                <ProjectCard
                    v-bind="project"
                    class="card"
                    @expand="
                        openModal(project);
                        previewedProjectId = project.id;
                    "
                    @mouseenter="previewedProjectId = project.id"
                    @mouseleave="onMouseLeaveProjectCard"
                />
            </template>
            <ProjectModal
                v-if="modal.show"
                :project="modal.project"
                @close="
                    modal.show = false;
                    previewedProjectId = undefined;
                "
            />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
@import "@/assets/home.scss";

.section {
    background: #0e0f17;
    position: relative;
    min-height: 0;
    padding-bottom: 64px;
}

.imageContainer {
    @include c.fillParent;
    @include c.centerFlex;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;

    .previewImage {
        @include c.fillParent;
        user-select: none;
        pointer-events: none;
        opacity: 0.15;
        transition: opacity 2s;

        min-width: 100%;
        min-height: 100%;

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

.cardContainer {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap: 40px;
    padding: 40px;
}

.card,
.sectionTitle {
    z-index: 1;
}
</style>
