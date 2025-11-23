<script setup lang="ts">
import mugshot from "@/assets/mugshot.webp";
import {computed, type CSSProperties, onMounted, reactive, ref, watch} from "vue";
import useSWRV from "swrv";
import {mapRangeClipped} from "@/utils";

const props = defineProps<{
    progress: number;
}>();

const photo = ref<HTMLElement>();
const asciiArtContainers = ref<HTMLElement[]>();
const asciiArtStyle = reactive<CSSProperties>({});

const {data: htmlSources} = useSWRV("ascii-mugshots", async () =>
    (
        await Promise.all([
            // @ts-ignore
            import(`virtual:ascii-mugshot/6`),
            // @ts-ignore
            import(`virtual:ascii-mugshot/7`),
            // @ts-ignore
            import(`virtual:ascii-mugshot/8`),
            // @ts-ignore
            import(`virtual:ascii-mugshot/10`),
            // @ts-ignore
            import(`virtual:ascii-mugshot/13`),
            // @ts-ignore
            import(`virtual:ascii-mugshot/17`),
            // @ts-ignore
            import(`virtual:ascii-mugshot/22`),
            // @ts-ignore
            import(`virtual:ascii-mugshot/28`),
            // @ts-ignore
            import(`virtual:ascii-mugshot/35`),
        ])
    ).map((s) => s.default)
);

const activeAsciiArtIndex = computed(() => {
    return Math.max(
        Math.floor(props.progress * ((htmlSources.value?.length ?? 1) - 1)) + 1,
        0
    );
});

const asciiArtContainer = computed(() => {
    return asciiArtContainers.value?.[activeAsciiArtIndex.value];
});

const photoOpacity = computed(() =>
    mapRangeClipped(props.progress, [0.667, 1], [0, 1])
);

function updateAsciiArtSize() {
    if (!asciiArtContainer.value || !photo.value) {
        delete asciiArtStyle.transform;
        return;
    }
    const asciiContainerWidth = asciiArtContainer.value.offsetWidth,
        asciiContainerHeight = asciiArtContainer.value.offsetHeight;
    const photoWidth = photo.value.offsetWidth,
        photoHeight = photo.value.offsetHeight;
    if (asciiContainerWidth == 0 || asciiContainerHeight == 0) return;
    asciiArtStyle.transform = `scale(${photoWidth / asciiContainerWidth}, ${
        photoHeight / asciiContainerHeight
    })`;
}

onMounted(() => {
    window.addEventListener("resize", updateAsciiArtSize);
    watch([photo, asciiArtContainer, () => props.progress], updateAsciiArtSize);
});
</script>

<template>
    <div class="root">
        <img
            v-lazy="mugshot"
            @load="updateAsciiArtSize"
            class="photo"
            ref="photo"
            :style="{opacity: photoOpacity}"
        />
        <div
            v-for="(htmlContent, i) of htmlSources"
            class="asciiArtContainer"
            :style="asciiArtStyle"
        >
            <span
                ref="asciiArtContainers"
                :style="{
                    opacity: activeAsciiArtIndex === i ? 1 - photoOpacity : 0,
                }"
                v-html="htmlContent"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
@import "@/assets/global.scss";

.root {
    // If omitted, there is some weird padding between this and <img>
    display: flex;
}

.photo {
    max-width: 40vw;
    max-height: min(240px, 30vh);
}

.asciiArtContainer {
    position: absolute;
    inset: 0;
    font-family: $monospace;

    transform-origin: 0 0;
}
</style>
