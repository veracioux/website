<script>
    import {
        fullWindowMixin
    } from '@/responsiveness'
    export default {
        name: 'Shutter',
        mixins: [fullWindowMixin],
        data() {
            return {
                configKonva: {
                    width: 0,
                    height: 0
                },
                triangles: [],
                shutterEdgeColor: "#000",
                rotation: 0,
                mugshotOverlayColor: "#000",
                // Aperture size relative to its maximum opened state
                relativeApertureSize: 0,
            }
        },
        mounted() {
            window.addEventListener('resize', this.onWindowResize)
            window.addEventListener('scroll', this._onScroll)
            this.onWindowResize()
        },
        methods: {
            getShutterRadius() {
                return Math.max(window.innerWidth, window.innerHeight);
            },
            updateShutterGeometry() {
                let radius = this.getShutterRadius();
                let centerX = document.documentElement.clientWidth / 2,
                    centerY = document.documentElement.clientHeight / 2
                const numSlices = 10
                const sliceAngle = 2 * Math.PI / numSlices
                this.triangles = []
                for (let i = 0; i < numSlices; ++i) {
                    let angle = i * sliceAngle + Math.PI / numSlices
                    let pivotX = radius * Math.cos(angle),
                        pivotY = radius * Math.sin(angle),
                        x2 = radius * Math.cos(angle + sliceAngle / 2),
                        y2 = radius * Math.sin(angle + sliceAngle / 2),
                        x3 = 0,
                        y3 = 0,
                        x4 = radius * Math.cos(angle - sliceAngle / 2),
                        y4 = radius * Math.sin(angle - sliceAngle / 2)

                    let vertices = [
                        pivotX, pivotY,
                        x2 - pivotX, y2 - pivotY,
                        x3 - pivotX, y3 - pivotY,
                        x4 - pivotX, y4 - pivotY
                    ]

                    let triangle = {
                        pivotX: centerX + pivotX,
                        pivotY: centerY + pivotY,
                        points: vertices,
                    }
                    this.triangles.push(triangle)
                }
            },
            onWindowResize() {
                this.configKonva.width = document.documentElement.clientWidth
                this.configKonva.height = document.documentElement.clientHeight
                this.updateShutterGeometry()
                this._onScroll();
            },
            _onScroll() {
                this.relativeApertureSize = Math.min(3.5 * this.relativeScrollY, 1)

                let lightness = Math.round(Math.min(this.relativeScrollY / 0.1, 1) * 30)
                let colorComponent = Number(lightness).toString(16).padStart(2, "0")
                this.shutterEdgeColor = "#" + colorComponent + colorComponent + colorComponent
                let radius = this.getShutterRadius();
                if (Math.min(window.innerWidth, window.innerHeight) < 640) {
                    this.rotation = this.relativeApertureSize * 7200 / radius;
                } else {
                    this.rotation = this.relativeApertureSize * 10200 / radius;
                }
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
                                                        rotation,
                                                        closed: true,
                                                        stroke: shutterEdgeColor,
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
</style>
