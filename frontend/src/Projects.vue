<script>
import "@/assets/shared.css";
import {fullWindowMixin} from "@/responsiveness";
import ProjectCard from "@/components/ProjectCard";

export default {
    name: "Projects",
    components: {ProjectCard},
    mixins: [fullWindowMixin],
    data() {
        return {
            sampleProject: {
                title: "Flameshot"
            }
        }
    }
}
</script>

<template>
    <div id="main" :style="fullWindowStyle">
        <div class="section-title">Projects</div>
        <div id="card-container">
            <ProjectCard v-bind="sampleProject">
            </ProjectCard>
        </div>
    </div>
</template>

<style scoped>
    #main {
        background: #212336;
        position: relative;
    }
    #card-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>