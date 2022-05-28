<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {ScrollData} from "@/inject";
import * as utils from "@/utils";
import SocialIcon from "@/components/generic/SocialIcon.vue";

interface Triangle {
    pivotX: number;
    pivotY: number;
    points: number[];
}

const root = ref<HTMLElement>();
const rotation = ref(0);
const shutterEdgeColor = ref("#000");
// Aperture size relative to its fully opened state
const triangles = ref(new Array<Triangle>());
const configKonva = reactive({
    width: 0,
    height: 0,
});
let relativeApertureSize = 0;

const {relativeScrollY} = ScrollData.inject();

function getShutterRadius() {
    return Math.max(window.innerWidth, window.innerHeight);
}

function updateShutterGeometry() {
    let radius = getShutterRadius();
    let centerX = document.documentElement.clientWidth / 2,
        centerY = document.documentElement.clientHeight / 2;
    // Think of the shutter as a sliced pizza
    const numSlices = 10;
    // The arc that one slice occupies (radians)
    const sliceArc = (2 * Math.PI) / numSlices;
    triangles.value = [];
    for (let i = 0; i < numSlices; ++i) {
        let angle = i * sliceArc + Math.PI / numSlices;
        // The pivot coordinates are relative to the window center
        let pivotX = radius * Math.cos(angle),
            pivotY = radius * Math.sin(angle),
            x2 = radius * Math.cos(angle + sliceArc / 2),
            y2 = radius * Math.sin(angle + sliceArc / 2),
            x3 = 0,
            y3 = 0,
            x4 = radius * Math.cos(angle - sliceArc / 2),
            y4 = radius * Math.sin(angle - sliceArc / 2);

        let vertices = [
            pivotX,
            pivotY,
            x2 - pivotX,
            y2 - pivotY,
            x3 - pivotX,
            y3 - pivotY,
            x4 - pivotX,
            y4 - pivotY,
        ];

        let triangle = {
            pivotX: centerX + pivotX,
            pivotY: centerY + pivotY,
            points: vertices,
        };
        triangles.value.push(triangle);
    }
}

function updateShutterOutline() {
    // Compute the lightness of the triangle outlines based on the aperture size
    let lightness = Math.round(Math.min(relativeApertureSize * 60, 30));
    let colorComponent = Number(lightness).toString(16).padStart(2, "0");
    shutterEdgeColor.value =
        "#" + colorComponent + colorComponent + colorComponent;
}

function updateRotation() {
    let radius = getShutterRadius();
    if (Math.min(window.innerWidth, window.innerHeight) < 640) {
        rotation.value = (relativeApertureSize * 7200) / radius;
    } else {
        rotation.value = (relativeApertureSize * 10200) / radius;
    }
}

function onScroll() {
    relativeApertureSize = Math.min(3.5 * relativeScrollY.value, 1);
    updateShutterOutline();
    updateRotation();
}

function onWindowResize() {
    configKonva.width = document.documentElement.clientWidth;
    configKonva.height = document.documentElement.clientHeight;
    updateShutterGeometry();
    onScroll();
}

onMounted(() => {
    window.addEventListener("resize", onWindowResize);
    utils.onScroll(onScroll);
    onWindowResize();
});
</script>

<template>
    <div class="fullWindow">
        <div class="background" />
        <img
            alt="mugshot"
            class="mugshot"
            :style="{
                filter:
                    'blur(' + 15 * Math.max(1 - 4 * relativeScrollY, 0) + 'px)',
            }"
            src="@/assets/mugshot.jpg"
        />
        <div class="shutter" ref="root">
            <v-stage :config="configKonva">
                <v-layer>
                    <v-line
                        v-for="(t, i) in triangles"
                        :key="i"
                        :config="{
                            x: t.pivotX,
                            y: t.pivotY,
                            points: t.points,
                            rotation,
                            closed: true,
                            stroke: shutterEdgeColor,
                            strokeWidth: 1,
                            fill: 'black',
                        }"
                    />
                </v-layer>
            </v-stage>
        </div>
    </div>
</template>

<style scoped>
.background {
    position: absolute;
    inset: 25% 0;
    background: #e1d8d1;
}

.mugshot {
    position: absolute;
    inset: 0;
    margin: auto;

    width: 280px;
    transform: translate(1.5%, 3%);
}

@media screen and (max-width: 640px), screen and (max-height: 640px) {
    .mugshot {
        width: 200px;
    }
}
</style>
