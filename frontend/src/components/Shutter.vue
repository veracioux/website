<script>
    import {
        fullWindowMixin
    } from '../responsiveness'
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
                edgeColor: "#000",
                rotation: 0,
                mugshotOverlayColor: "#000",
                // Aperture size relative to its maximum opened state
                relativeApertureSize: 0,
            }
        },
        mounted() {
            window.addEventListener('resize', this._onWindowResize)
            window.addEventListener('scroll', this._onScroll)
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
                        y3 - pivotY, x4 - pivotX, y4 - pivotY
                    ]

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
            _onScroll() {
                this.relativeApertureSize = Math.min(3 * this.relativeScrollY, 1)

                let lightness = Math.round(Math.min(this.relativeScrollY / 0.1, 1) * 30)
                this.edgeColor = Number(lightness).toString(16).padStart(2, "0")
                this.edgeColor = "#" + this.edgeColor + this.edgeColor + this.edgeColor
            },
        }
    }
</script>

<template>
    <div class="shutter">
        <v-stage :config="configKonva">
            <v-layer>
                <v-line v-for="t in triangles" :key="t" :config="{
                                                        x: t.pivotX,
                                                        y: t.pivotY,
                                                        points: t.points,
                                                        rotation: relativeApertureSize * 5,
                                                        closed: true,
                                                        stroke: edgeColor,
                                                        strokeWidth: 1,
                                                        fill: 'black',
                                                        }" />
            </v-layer>
        </v-stage>
    </div>
</template>

<style scoped>
    .shutter {
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
    }

    .image-overlay {
        position: fixed;
        top: 0;
        width: 80%;
        height: 80%;

        background: #f50057;
        opacity: 0.3;
    }
</style>
