<script setup lang="ts">
import {onMounted, defineProps, reactive, ref} from "vue";
import {ScrollData} from "@/inject";
import * as utils from "@/utils";

const props: { shutterStyle: Partial<CSSStyleDeclaration> } = defineProps({
    shutterStyle: Object
});

interface Triangle {
    pivotX: number,
    pivotY: number,
    points: number[],
}

const root = ref<HTMLElement>();
const rotation = ref(0);
const shutterEdgeColor = ref("#000");
// Aperture size relative to its maximum opened state
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
    const numSlices = 10;
    const sliceAngle = (2 * Math.PI) / numSlices;
    triangles.value = [];
    for (let i = 0; i < numSlices; ++i) {
        let angle = i * sliceAngle + Math.PI / numSlices;
        let pivotX = radius * Math.cos(angle),
            pivotY = radius * Math.sin(angle),
            x2 = radius * Math.cos(angle + sliceAngle / 2),
            y2 = radius * Math.sin(angle + sliceAngle / 2),
            x3 = 0,
            y3 = 0,
            x4 = radius * Math.cos(angle - sliceAngle / 2),
            y4 = radius * Math.sin(angle - sliceAngle / 2);

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
    let colorComponent = Number(lightness)
        .toString(16)
        .padStart(2, "0");
    shutterEdgeColor.value = "#" + colorComponent + colorComponent + colorComponent;
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
    updateShutterOutline()
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
})
</script>

<template>
    <div>
        <div class="full-window container" :style="props.shutterStyle">
            <div class="background full-window"/>
            <img alt="mugshot"
                 class="mugshot"
                 :style="{
                filter: 'blur(' + 15 * Math.max(1 - 4 * relativeScrollY, 0) + 'px)',
             }"
                 src="@/assets/mugshot.jpg"
            />
            <div class="shutter" ref="root">
                <v-stage :config="configKonva">
                    <v-layer>
                        <v-line
                            v-for="t in triangles"
                            :key="t"
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
    </div>
</template>

<style scoped>

.container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.background {
    width: 100%;
    height: 100%;
    position: fixed;
    background: #e1d8d1;
}

.mugshot {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    width: 280px;
    transform: translate(1.5%, 3%);
}

@media screen and (max-width: 640px), screen and (max-height: 640px) {
    .mugshot {
        width: 200px;
    }
}

.shutter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
}

</style>
