<script setup lang="ts">
import mugshot from "@/assets/mugshot.webp";
import { computed, ref } from "vue";
import useSWRV from "swrv";
import { mapRangeClipped } from "@/utils";

const props = defineProps<{
  progress: number;
}>();

const photo = ref<HTMLElement>();

const { data: imageSources } = useSWRV("ascii-mugshots", async () =>
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
  return Math.floor(
    mapRangeClipped(
      props.progress,
      [0, 1],
      [0, (imageSources.value?.length ?? 1) - 1]
    )
  );
});

const photoOpacity = computed(() =>
  mapRangeClipped(props.progress, [0.667, 1], [0, 1])
);
</script>

<template>
  <div class="flex w-48 h-60 relative">
    <img
      v-lazy="mugshot"
      class="absolute inset-0"
      ref="photo"
      :style="{ opacity: photoOpacity }"
    />
    <template v-for="(imageSrc, i) of imageSources" :key="i">
      <div class="absolute inset-0 font-mono">
        <img
          id="todo"
          class="w-full h-full origin-center translate-y-[3%] scale-y-[104%]"
          v-lazy="imageSrc"
          :style="{
            opacity: activeAsciiArtIndex === i ? 1 - photoOpacity : 0,
          }"
        />
      </div>
    </template>
  </div>
</template>
