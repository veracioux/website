<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { ScrollData } from "@/inject";
import avatar from "@/assets/avatar.webp";
import { shutterFullyOpenedScrollThreshold } from "@/constants";
import * as utils from "@/utils";

interface Slice {
  pivotX: number;
  pivotY: number;
  vertices: number[];
}

// Think of the shutter as a sliced pizza
const numSlices = 10;

const isMobile = utils.isMobile();

const root = ref<HTMLElement>();
const rotation = ref(0);
const shutterEdgeColor = ref("#000");
const slices = reactive(new Array<Slice | null>(numSlices));
const configKonva = reactive({
  width: 0,
  height: 0,
});
/** Aperture size relative to its fully opened state */
let relativeApertureSize = 0;
const relativeScrollAtMaxAperture = 1 / 3.5;

const { relativeScrollY, scrollContainer } = ScrollData.inject();

function getShutterRadius() {
  const win = scrollContainer.value as Window | undefined;
  const other = scrollContainer.value as HTMLElement | undefined;
  const w = win?.innerWidth ?? other?.clientWidth ?? 0;
  const h = win?.innerHeight ?? other?.clientHeight ?? 0;
  return Math.max(w, h);
}

function updateShutterGeometry() {
  let radius = getShutterRadius();
  let centerX = document.documentElement.clientWidth / 2,
    centerY = document.documentElement.clientHeight / 2;
  // The arc that one slice occupies (radians)
  const sliceArc = (2 * Math.PI) / numSlices;
  for (let i = 0; i < numSlices; ++i) {
    let angle = i * sliceArc + Math.PI / numSlices;
    // The pivot coordinates are relative to the window center
    let pivotX = radius * Math.cos(angle),
      pivotY = radius * Math.sin(angle),
      x2 = radius * Math.cos(angle + sliceArc / 2),
      y2 = radius * Math.sin(angle + sliceArc / 2),
      x3 = 0,
      y3 = 0,
      x4 = radius * Math.cos(angle - sliceArc / 2),
      y4 = radius * Math.sin(angle - sliceArc / 2);

    let slice: Slice = {
      pivotX: centerX + pivotX,
      pivotY: centerY + pivotY,
      vertices: [
        pivotX,
        pivotY,
        x2 - pivotX,
        y2 - pivotY,
        x3 - pivotX,
        y3 - pivotY,
        x4 - pivotX,
        y4 - pivotY,
      ],
    };
    slices[i] = slice;
  }
}

function updateShutterOutline() {
  // Compute the lightness of the slice outlines based on the aperture size
  let lightness = Math.floor(Math.min(relativeApertureSize * 100, 30));
  let colorComponent = Number(lightness).toString(16).padStart(2, "0");
  shutterEdgeColor.value =
    "#" + colorComponent + colorComponent + colorComponent;
}

function updateRotation() {
  let radius = getShutterRadius();
  // These values were obtained empirically
  if (Math.min(window.innerWidth, window.innerHeight) < 768) {
    rotation.value = (relativeApertureSize * 7200) / radius;
  } else {
    rotation.value = (relativeApertureSize * 10200) / radius;
  }
}

let stopScrollingDetectorId: NodeJS.Timeout | undefined = undefined;

/**
 * Use a timeout to detect if scrolling has stopped and fully open/close the
 * shutter based on `scrollingDirection`. This is done so the shutter isn't
 * left in a partially opened state.
 */
function fullyOpenOrCloseShutterWhenStoppedScrolling(
  scrollingDirection: "up" | "down"
) {
  if (stopScrollingDetectorId) {
    clearTimeout(stopScrollingDetectorId);
  }

  if (relativeScrollY.value < shutterFullyOpenedScrollThreshold) {
    stopScrollingDetectorId = setTimeout(() => {
      if (relativeScrollY.value >= shutterFullyOpenedScrollThreshold) return;
      if (scrollingDirection === "up") scrollContainer.value?.scrollTo(0, 0);
      else
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  } else {
    stopScrollingDetectorId = undefined;
  }
}

function onScroll(value?: number, oldValue?: number, forceUpdate = false) {
  if (value === undefined || oldValue === undefined)
    value = oldValue = relativeScrollY.value;
  if (
    !forceUpdate &&
    relativeApertureSize == 1 &&
    relativeScrollY.value > relativeScrollAtMaxAperture
  )
    return;
  relativeApertureSize = Math.min(
    relativeScrollY.value / relativeScrollAtMaxAperture,
    1
  );
  updateShutterOutline();
  updateRotation();

  if (value != oldValue) {
    fullyOpenOrCloseShutterWhenStoppedScrolling(
      value < oldValue ? "up" : "down"
    );
  }
}

const resizeEvent = ref(0);

function onWindowResize() {
  resizeEvent.value = resizeEvent.value + 1;
  configKonva.width = window.innerWidth;
  configKonva.height = window.innerHeight;
  updateShutterGeometry();
  onScroll(relativeScrollY.value, relativeScrollY.value, true);
}

watch(relativeScrollY, (value, oldValue) => onScroll(value, oldValue));

/** Avoid the avatar flashing to the user on initial load */
const hideAvatar = ref(true);

onMounted(() => {
  window.addEventListener("resize", onWindowResize);
  setTimeout(() => {
    onScroll();
    onWindowResize();
    hideAvatar.value = false;
  }, 0);
});
</script>

<template>
  <div class="pointer-events-none">
    <template v-if="!hideAvatar">
      <img
        alt="avatar"
        class="avatar"
        :style="{
          filter: 'blur(' + 15 * Math.max(1 - 4 * relativeScrollY, 0) + 'px)',
          ...(isMobile ? { transform: 'translateY(-27px)' } : {}),
        }"
        :src="avatar"
      />
    </template>
    <div ref="root">
      <ClientOnly>
        <v-stage :config="configKonva">
          <v-layer>
            <v-line
              v-for="(s, i) in slices"
              :key="i"
              :config="{
                x: s?.pivotX,
                y: s?.pivotY,
                points: s?.vertices,
                rotation,
                closed: true,
                stroke: shutterEdgeColor,
                strokeWidth: 1,
                fill: 'black',
              }"
            />
          </v-layer>
        </v-stage>
      </ClientOnly>
      <div class="shadowOverlay" />
    </div>
  </div>
</template>

<!--
Classes used temporarily for debugging.
-->
<style scoped lang="scss">
.indicator {
  color: transparent;
}

.indicator-enter-from {
  color: black;
}

.indicator-enter-to {
  color: transparent;
}

.indicator-enter-active {
  transition: all 1s ease;
}
</style>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
@use "@/assets/global.scss" as g;

.avatar {
  @include c.fillParent;
  margin: auto;

  width: 240px;
  transform: translate(0, 8%);

  @include g.screenSizeAbove(768px) {
    width: 350px;
  }
}

.shadowOverlay {
  @include c.fillParent;
  z-index: 1;
  box-shadow: inset 0 0 min(40vw, 40vh) var(--color-background-0);

  &::after {
    @include c.fillParent;
    box-shadow: inset 0 0 min(10vw, 10vh) var(--color-background-0);
  }
}
</style>
