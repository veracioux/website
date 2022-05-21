<script setup lang="ts">
import ProjectCard from "@/components/ProjectCard.vue";
import useSWRV from "swrv";
import "@/assets/home.css";
import type {Project} from "@/models";

const projects = useSWRV<Array<Partial<Project>>>("/api/projects/", (key) =>
    fetch(key).then((resp) => resp.json())
).data;
if (!projects.value) {
    projects.value = [
        {
            id: 0,
            title: "Dummy",
            desc: "Dummy project",
        },
    ];
}
</script>

<template>
    <div class="section main">
        <div class="sectionTitle">Projects</div>
        <div class="cardContainer">
            <ProjectCard
                v-for="project in projects"
                :key="project.id"
                v-bind="project"
            />
        </div>
    </div>
</template>

<style scoped>
.main {
    background: #0e0f17;
    position: relative;
}

.cardContainer {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap: 40px;
    padding: 40px;
}
</style>
