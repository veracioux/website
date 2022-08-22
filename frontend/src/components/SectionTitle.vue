<script setup lang="ts">
import {onMounted, ref} from "vue";

const edgeCoordinatesX = ref([15, 85]);

onMounted(() => {
    const onResize = () => {
        if (window.innerWidth >= 800) {
            console.debug("HELLO");
            edgeCoordinatesX.value = [35, 65];
        } else if (window.innerWidth >= 640) {
            edgeCoordinatesX.value = [25, 75];
        } else {
            edgeCoordinatesX.value = [15, 85];
        }
    };
    onResize();
    window.addEventListener("resize", onResize);
});
</script>

<template>
    <div>
        <div class="sectionContainer">
            <svg
                class="titleDecorationContainer"
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <polygon
                    :points="`0,0 ${edgeCoordinatesX[0]},100 ${edgeCoordinatesX[1]},100 100,0`"
                    class="titleDecoration"
                />
            </svg>
            <h1 class="titleText" :class="s.sectionTitle">
                <slot />
            </h1>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;

.titleDecorationContainer {
    @include c.fillParent;
    z-index: 0;
}

.titleText {
    position: relative;
    z-index: 1;
    padding: 0.3em 0;
}

.sectionContainer {
    position: relative;
}
</style>

<style module="s" lang="scss">
@import "@/assets/home.scss";
</style>
