<script>
import {fullWindowMixin} from "@/responsiveness";
import ProjectCard from "@/components/ProjectCard";

export default {
    name: "Projects",
    components: {ProjectCard},
    mixins: [fullWindowMixin],
}
</script>

<template>
    <div id="projects" :style="fullWindowStyle">
        <ProjectCard>
        </ProjectCard>
    </div>
</template>

<style scoped>
</style>