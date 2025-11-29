<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { ScrollData } from "@/inject";
import { mapRangeClipped, dependsOn } from "@/utils";
import CliEffect from "@/components/CliEffect.vue";

defineProps<{
  text: string;
}>();

const edgeCoordinatesX = ref([20, 80]);

const { scrollContainer, relativeScrollY } = ScrollData.inject();
const root = ref<HTMLElement>();

const progress = computed(() => {
  dependsOn(relativeScrollY);
  if (!root.value || !scrollContainer.value) return 0;
  const thisY = root.value.getBoundingClientRect().y;
  const scrollContainerRect = scrollContainer.value.getBoundingClientRect();
  const raw =
    (-thisY + scrollContainerRect.y + scrollContainerRect.height) /
    scrollContainer.value.offsetHeight;
  return Math.max(0, raw);
});

const checkpoints = computed(() => {
  const textStart = 0.2;
  const textEnd = 0.7;
  return Object.assign(
    {},
    {
      textDecorationScaleY: mapRangeClipped(
        progress.value,
        [0, textStart],
        [0, 1]
      ),
      cliText: mapRangeClipped(progress.value, [textStart, textEnd], [0, 1]),
      get showCliCursor() {
        return 0 < this.cliText && this.cliText < 1;
      },
    }
  );
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
});
</script>

<template>
  <div
    ref="root"
    class="sectionTitleContainer"
    :style="{ transform: `scaleY(${checkpoints.textDecorationScaleY})` }"
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
