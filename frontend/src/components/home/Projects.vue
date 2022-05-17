<script setup lang="ts">
import ProjectCard from "@/components/ProjectCard.vue";
import useSWRV from "swrv";
import "@/assets/shared.css";
import type {Project} from "@/models";

const projects = useSWRV<Array<Partial<Project>>>("/api/projects/", (key) => fetch(key).then(resp => resp.json())).data;
if (!projects.value) {
    projects.value = [
        {
            id: 0,
            title: "Dummy",
            desc: "Dummy project",
        }
    ]
}

</script>

<template>
    <div class="section main">
        <div class="section-title">Projects</div>
        <div class="card-container">
            <ProjectCard v-for="project in projects" :key="project.id" v-bind="project" />
        </div>
    </div>
</template>

<style scoped>
.main {
    background: #0e0f17;
    position: relative;
}

.card-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 40px;
}
</style>