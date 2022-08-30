<script setup lang="ts">
import {computed, CSSProperties, onMounted, reactive, ref, watch} from "vue";
import {ScrollData} from "@/inject";
import {mapRange, mapRangeClipped, clip} from "@/utils";
import CliEffect from "@/components/CliEffect.vue";

defineProps<{
    text: string;
}>();

const edgeCoordinatesX = ref([20, 80]);

const scrollData = ScrollData.inject();
const progress = ref(0);
const root = ref<HTMLElement>();
const style = reactive<CSSProperties>({});

const checkpoints = computed(() => {
    const _cliTextUnclipped = mapRange(progress.value, [-1, -0.3], [0, 1]);
    return {
        textDecorationScaleY: mapRangeClipped(progress.value, [-2, -1], [0, 1]),
        cliText: clip(_cliTextUnclipped, [-999, 1]),
        showCliCursor: _cliTextUnclipped <= 1,
    };
});

onMounted(() => {
    const onResize = () => {
        if (window.innerWidth >= 800) {
            edgeCoordinatesX.value = [35, 65];
        } else if (window.innerWidth >= 640) {
            edgeCoordinatesX.value = [25, 75];
        } else {
            edgeCoordinatesX.value = [20, 80];
        }
    };
    onResize();
    window.addEventListener("resize", onResize);

    scrollData.scrollContainer.value?.addEventListener("scroll", () => {
        // The factor of 2 was obtained empirically
        progress.value = root.value
            ? (-2 * root.value.getBoundingClientRect().top) / window.innerHeight
            : 0;
    });
});
</script>

<template>
    <div ref="root">
        <div
            class="sectionTitleContainer"
            :style="{transform: `scaleY(${checkpoints.textDecorationScaleY})`}"
        >
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
                <CliEffect
                    prompt=""
                    :text="text"
                    :progress="checkpoints.cliText"
                    :show-cursor="checkpoints.showCliCursor"
                />
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
    display: block;
    position: relative;
    z-index: 1;
    padding: 0.3em 0;

    :deep(.cli) {
        padding: 0;
    }
}

.sectionTitleContainer {
    position: relative;
    transform-origin: 50% 0;
}
</style>

<style module="s" lang="scss">
@import "@/assets/home.scss";
</style>
