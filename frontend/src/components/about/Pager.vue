<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {clip, logChanges} from "@/utils";

const props = defineProps<{
    progress: number;
}>();

const numVisibleLines = 20;

//const content = ref<HTMLElement>();
const scrollBox = ref<HTMLElement>();
const lineHeight = ref(0);
const numTotalLines = ref(0);
const progress = computed(() => clip(props.progress, [0, 1]));

logChanges(progress);
watch(progress, (value) => {
    if (!scrollBox.value) return;
    // Linger for a while on the first line
    if (value < 0.3) value = 0;
    const naturalScrollTop =
        (value - 0.3) *
        (scrollBox.value.scrollHeight -
            scrollBox.value.getBoundingClientRect().height);
    const discretizedScrollTop =
        Math.ceil(naturalScrollTop / lineHeight.value) * lineHeight.value;
    scrollBox.value.scrollTo({top: discretizedScrollTop});
});

onMounted(() => {
    const onResize = () => {
        lineHeight.value =
            scrollBox.value!.getBoundingClientRect().height / numVisibleLines;
        numTotalLines.value = scrollBox.value!.scrollHeight / lineHeight.value;
    };
    window.addEventListener("resize", onResize);
    onResize();
});
</script>

<template>
    <div>
        <div class="scrollBox" ref="scrollBox">
            <slot />
        </div>
        <div class="indicator">
            <b>:</b><b v-if="progress === 1"> To be continued...</b
            ><span class="cursor">█</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/about.module.scss" as a;

.scrollBox {
    --num-lines: v-bind("numVisibleLines");
    --line-height: 1.5em;

    overflow-y: hidden;
    line-height: var(--line-height);
    max-height: calc(var(--line-height) * var(--num-lines));
}

.indicator {
    line-height: 2.5em;
}

.cursor {
    @include a.cursor;
}
</style>
