<script>
 import {fullWindowMixin} from '../responsiveness'
    export default {
        name: 'Shutter',
        mixins: [fullWindowMixin],
        data() {
            return {
                configKonva: {
                    width: 0,
                    height: 0
                },
                // TODO How can I make triangles globally available
                triangles: [],
                rotation: 0,
            }
        },
        mounted() {
            window.addEventListener('resize', this._onWindowResize)
            this._onWindowResize()
        },
        methods: {
            updateShutter() {
                let radius = Math.max(window.innerWidth, window.innerHeight)
                let centerX = document.documentElement.clientWidth / 2,
                    centerY = document.documentElement.clientHeight / 2
                const numComponents = 10
                const angleChunkSize = 2 * Math.PI / numComponents
                this.triangles = []
                for (let i = 0; i < numComponents; ++i) {
                    let angle = i * angleChunkSize + Math.PI / numComponents
                    let pivotX = radius * Math.cos(angle),
                        pivotY = radius * Math.sin(angle),
                        x2 = radius * Math.cos(angle + angleChunkSize / 2),
                        y2 = radius * Math.sin(angle + angleChunkSize / 2),
                        x3 = 0,
                        y3 = 0,
                        x4 = radius * Math.cos(angle - angleChunkSize / 2),
                        y4 = radius * Math.sin(angle - angleChunkSize / 2)

                    let points = [pivotX, pivotY, x2 - pivotX, y2 - pivotY, x3 - pivotX,
                    y3 - pivotY, x4 - pivotX, y4 - pivotY]

                    let triangle = {
                        pivotX: centerX + pivotX,
                        pivotY: centerY + pivotY,
                        points: points,
                    }
                    this.triangles.push(triangle)
                }
            },
            _onWindowResize() {
                this.configKonva.width = document.documentElement.clientWidth
                this.configKonva.height = document.documentElement.clientHeight
                this.updateShutter()
            },
        }
    }
</script>

<template>
    <div>
        <v-stage class="shutter" :config="configKonva">
            <v-layer>
                <v-line ref="shutter" v-for="t in triangles" :key="t" :config="{
                                                        x: t.pivotX,
                                                        y: t.pivotY,
                                                        points: t.points,
                                                        rotation: Math.min(15 * relativeScrollY, 5),
                                                        closed: true,
                                                        stroke: '#131313',
                                                        strokeWidth: 1,
                                                        fill: 'black',
                                                        }" />
            </v-layer>
        </v-stage>
    </div>
</template>

<style>
    .shutter {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        pointer-events: none;
    }
</style>
