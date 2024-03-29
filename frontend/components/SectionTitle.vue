<script setup lang="ts">
import {computed, CSSProperties, onMounted, reactive, ref, watch} from "vue";
import {ScrollData} from "@/inject";
import {mapRange, mapRangeClipped, clip} from "@/utils";
import CliEffect from "@/components/CliEffect.vue";
import {useRoute} from "#app";

const props = defineProps<{
    text: string;
    slug?: string;
}>();

const edgeCoordinatesX = ref([20, 80]);

const scrollData = ScrollData.inject();
const progress = ref(0);
const root = ref<HTMLElement>();
const style = reactive<CSSProperties>({});

const anchor = props.slug && useRoute().path === "/" ? `#${props.slug}` : undefined;

const checkpoints = computed(() => {
    const _cliTextUnclipped = mapRange(progress.value, [-1.1, -0.5], [0, 1]);
    return {
        textDecorationScaleY: mapRangeClipped(progress.value, [-2, -1], [0, 1]),
        cliText: clip(_cliTextUnclipped, [-999, 1]),
        showCliCursor: _cliTextUnclipped <= 1,
    };
});

onMounted(() => {
    const onResize = () => {
        if (window.innerWidth >= 800) {
            edgeCoordinatesX.value = [30, 70];
        } else if (window.innerWidth >= 640) {
            edgeCoordinatesX.value = [20, 80];
        } else {
            edgeCoordinatesX.value = [25, 75];
        }
    };
    onResize();
    window.addEventListener("resize", onResize);

    if (scrollData) {
        scrollData.scrollContainer.value?.addEventListener("scroll", () => {
            // The factor of 2 was obtained empirically
            progress.value = root.value
                ? (-2 * root.value.getBoundingClientRect().top) /
                window.innerHeight
                : 0;
        });
    } else {
        progress.value = 1;
    }
});
</script>

<template>
    <div
        ref="root"
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
        <!-- TODO: convert to <a> -->
        <div>
            <h1 class="titleText">
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
    padding-top: 0.3em;
    padding-bottom: 0.1em;

    :deep(.cli) {
        padding: 0;
    }
}

.sectionTitleContainer {
    position: relative;
    transform-origin: 50% 0;

    a {
        transition: transform 0s;
        cursor: pointer;
        color: var(--color-text);
    }
}
</style>