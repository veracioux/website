<script>
    export default {
        name: 'Shutter',
        data() {
            return {
                configKonva: {
                    width: 0,
                    height: 0
                },
                triangles: [],
                scrollY: 0,
            }
        },
        mounted() {
            window.addEventListener('scroll', this.onScroll)
            window.addEventListener('resize', this.onWindowResize)
            this.onWindowResize()
        },
        methods: {
            updateShutter() {
                let radius = Math.max(window.innerWidth, window.innerHeight)
                /* let radius = 200 */
                let centerX = window.innerWidth / 2,
                    centerY = window.innerHeight / 2
                const numComponents = 8
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
            onScroll() {
                this. scrollY = window.scrollY
                this.updateShutter()
            },
            onWindowResize() {
                this.configKonva.width = window.innerWidth
                this.configKonva.height = window.innerHeight
                this.updateShutter()
            }
        }
    }
</script>

<template>
    <v-stage class="shutter" :config="configKonva">
        <v-layer>
            <v-line v-for="t in triangles" :key="t" :config="{
                                                    x: t.pivotX,
                                                    y: t.pivotY,
                                                    points: t.points,
                                                    rotation: scrollY / 100,
                                                    closed: true,
                                                    stroke: '#131313',
                                                    strokeWidth: 1,
                                                    fill: 'black',
                                                    }" />
        </v-layer>
    </v-stage>
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
        /* background-color: #0000ff66; */
    }
</style>
