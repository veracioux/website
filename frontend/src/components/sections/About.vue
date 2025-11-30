<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import SocialIcon from "@/components/generic/SocialIcon.vue";
import AnimatedPhoto from "@/components/about/AnimatedPhoto.vue";
import Workflow from "@/components/about/Workflow.vue";
import { ScrollData } from "@/inject";
import { computed, ref } from "vue";
import CliEffect from "@/components/CliEffect.vue";
import Bio from "@/components/about/Bio.vue";
import { dependsOn, mapRange, mapRangeClipped } from "@/utils";
import { ClientOnly } from "#components";

const { scrollContainer, relativeScrollY } = ScrollData.inject();

const root = ref<HTMLElement>();

const progress = computed(() => {
  dependsOn(relativeScrollY);
  if (!root.value || !scrollContainer.value) return 0;
  const thisRect = root.value.getBoundingClientRect();
  const scrollContainerRect = scrollContainer.value.getBoundingClientRect();
  const raw =
    (scrollContainerRect.height - (thisRect.y - scrollContainerRect.y)) /
    thisRect.height;
  return Math.max(0, raw);
});

const checkpoints = computed(() => {
  // Roughly chronologically sorted
  return {
    showFrame: progress.value > 0.2,
    photoCli: mapRange(progress.value, [0.2, 0.3], [0, 1]),
    socialsCli: mapRange(progress.value, [0.2, 0.3], [0, 1]),
    versionCli: mapRange(progress.value, [0.32, 0.42], [0, 1]),
    photo: mapRangeClipped(progress.value, [0.3, 0.45], [0, 1]),
    bioCli: mapRange(progress.value, [0.2, 0.45], [0, 1]),
    workflowCli: mapRange(progress.value, [0.2, 0.45], [0, 1]),
    showWorkflow: progress.value >= 0.45,
    bioPager: mapRange(progress.value, [0.45, 0.8], [0, 1]),
  };
});
</script>

<template>
  <div class="section relative sm:h-[300%] xl:h-[200%]" ref="root">
    <div class="sm:sticky top-0 sm:h-1/2">
      <SectionTitle class="sectionTitle" text="About Me" slug="about" />
      <div
        class="sm:h-full py-12 pt-24 sm:pt-8 px-12 flex items-center justify-center"
      >
        <div class="flex flex-col xl:flex-row gap-12 font-mono">
          <div
            class="flex flex-col sm:flex-row items-center sm:items-start gap-[inherit]"
          >
            <div
              :style="{ opacity: checkpoints.photoCli > 0 ? 1 : 0 }"
              class="shrink-0 frame transition-opacity duration-200"
            >
              <div class="photoWrapper">
                <CliEffect
                  prompt="$ "
                  text="cat mugshot.txt"
                  :progress="checkpoints.photoCli"
                >
                  <ClientOnly>
                    <AnimatedPhoto :progress="checkpoints.photo" />
                  </ClientOnly>
                </CliEffect>
              </div>
              <div class="socialsContainer">
                <div
                  :style="{ opacity: checkpoints.socialsCli > 0 ? 1 : 0 }"
                  class="badge transition-opacity duration-200"
                >
                  <CliEffect
                    :progress="checkpoints.socialsCli"
                    prompt="$ "
                    text="lsof -i"
                  >
                    <div class="socials">
                      <SocialIcon name="github" class="icon" />
                      <SocialIcon name="linkedin" class="icon" />
                      <SocialIcon name="mail" class="icon" />
                    </div>
                  </CliEffect>
                </div>
              </div>
              <div class="versionContainer">
                <div
                  :style="{ opacity: checkpoints.versionCli > 0 ? 1 : 0 }"
                  class="badge transition-opacity duration-200"
                >
                  <CliEffect
                    :progress="checkpoints.versionCli"
                    prompt="$ "
                    text="uname -r"
                  >
                    <span class="version"> version: 26 </span>
                  </CliEffect>
                </div>
              </div>
            </div>
            <CliEffect
              :progress="checkpoints.bioCli"
              prompt=">>> "
              text="print(self.__doc__)"
            >
              <Bio :progress="checkpoints.bioPager" />
            </CliEffect>
          </div>
          <CliEffect
            :progress="checkpoints.workflowCli"
            prompt="> "
            text="JSON.stringify(workflow)"
            class="basis-[25%] grow shrink-0"
          >
            <Workflow :style="checkpoints.showWorkflow || { opacity: 0 }" />
          </CliEffect>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
@use "@/assets/global.scss" as g;

.section {
  background: var(--color-background-1);

  .sectionTitle {
    position: absolute;
    inset: 0 0 auto;

    :deep(.titleDecoration) {
      fill: var(--color-background-2);
    }
  }

  .frame {
    position: relative;
    background: rgba(white, 0.05);
    $edgeRadius: 32px;
    @include c.beveledEdges($edgeRadius);

    --frame-height: 3.2em;

    padding: var(--frame-height);

    &::before,
    &::after {
      z-index: -1;
      position: absolute;
      background: inherit;
      content: "";
    }

    &::before {
      inset: calc(var(--frame-height) / 3);
      @include c.beveledEdges(calc($edgeRadius * 0.75));
    }

    &::after {
      inset: calc(var(--frame-height) * 2 / 3);
      @include c.beveledEdges(calc($edgeRadius * 0.5));
    }

    .photoWrapper {
      position: relative;
      @include c.beveledEdges($edgeRadius * 0.4);
      height: fit-content;

      &::after {
        @include c.fillParent;
        z-index: 5;
        content: "";
        box-shadow: inset 0 0 40px var(--color-background-2);
      }

      & :deep(.cli) {
        padding: 0.5rem;
      }
    }

    @mixin badgeContainer($side) {
      position: absolute;
      inset: auto 0;
      #{$side}: 0;
      height: var(--frame-height);
      @include c.centerFlex;
      user-select: none;

      .badge {
        padding: 0.5em 0.75em;
        background: var(--color-background-0);

        @include c.beveledEdges(8px);

        :deep(.cli) {
          padding: 0;
          font-size: 0.9em;
        }
      }
    }

    .versionContainer {
      @include badgeContainer(bottom);

      .version {
        font-family: monospace;
        font-weight: bold;
        color: var(--color-secondary);
      }
    }

    .socialsContainer {
      @include badgeContainer(top);

      .socials {
        @include c.centerFlex;
        gap: 1em;

        .icon {
          font-size: 1.25rem;
          color: var(--color-primary);
        }
      }
    }
  }
}
</style>
