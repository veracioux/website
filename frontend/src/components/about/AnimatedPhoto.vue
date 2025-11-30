<script setup lang="ts">
import mugshot from "@/assets/mugshot.webp";
import {
  computed,
  type CSSProperties,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import useSWRV from "swrv";
import { mapRangeClipped } from "@/utils";

const props = defineProps<{
  progress: number;
}>();

const photo = ref<HTMLElement>();
const asciiArtContainers = ref<HTMLElement[]>();
const asciiArtStyle = reactive<CSSProperties>({});

const { data: htmlSources } = useSWRV("ascii-mugshots", async () =>
  (
    await Promise.all([
      // @ts-expect-error TODO
      import(`virtual:ascii-mugshot/6`),
      // @ts-expect-error TODO
      import(`virtual:ascii-mugshot/7`),
      // @ts-expect-error TODO
      import(`virtual:ascii-mugshot/8`),
      // @ts-expect-error TODO
      import(`virtual:ascii-mugshot/10`),
      // @ts-expect-error TODO
      import(`virtual:ascii-mugshot/13`),
      // @ts-expect-error TODO
      import(`virtual:ascii-mugshot/17`),
      // @ts-expect-error TODO
      import(`virtual:ascii-mugshot/22`),
      // @ts-expect-error TODO
      import(`virtual:ascii-mugshot/28`),
      // @ts-expect-error TODO
      import(`virtual:ascii-mugshot/35`),
    ])
  ).map((s) => s.default)
);

const activeAsciiArtIndex = computed(() => {
  return mapRangeClipped(
    props.progress,
    [0, 1],
    [0, (htmlSources.value?.length ?? 1) - 1]
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
  <div>
    <img
      v-lazy="mugshot"
      @load="updateAsciiArtSize"
      class="w-48 h-60 aspect-[48/60]"
      ref="photo"
      :style="{ opacity: photoOpacity }"
    />
    <div
      v-for="(htmlContent, i) of htmlSources"
      v-bind:key="i"
      class="absolute inset-0 font-mono origin-center"
      :style="asciiArtStyle"
    >
      <span
        ref="asciiArtContainers"
        :style="{
          opacity: activeAsciiArtIndex === i ? 1 - photoOpacity : 0,
        }"
        v-html="htmlContent"
      ></span>
    </div>
  </div>
</template>
