<script>
import {SLinkedIn} from "vue-socials";
import ProjectCard from "@/components/ProjectCard";
import useSWRV from "swrv";
import "@/assets/shared.css";

export default {
    components: {
        ProjectCard,
        SLinkedIn,
    },
    setup() {
        const {data: projects} = useSWRV("/api/projects/", (key) => fetch(key).then(resp => resp.json()))

        return {
            projects,
        }
    }
};
</script>

<template>
    <div class="section main">
        <s-linked-in :window-features="{}" :share-options="{url: 'https://linkedin.com/in/veracioux'}" />
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