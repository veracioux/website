<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import SocialIcon from "@/components/generic/SocialIcon.vue";
import AnimatedPhoto from "@/components/about/AnimatedPhoto.vue";
import Workflow from "@/components/about/Workflow.vue";
import {ScrollData} from "@/inject";
import {computed, onMounted, ref} from "vue";
import CliEffect from "@/components/CliEffect.vue";
import Bio from "@/components/about/Bio.vue";
import {mapRange} from "@/utils";

const scrollData = ScrollData.inject();

const root = ref<HTMLElement>();

const progress = ref(0);

const checkpoints = computed(() => {
    return {
        showFrame: progress.value > -0.6,
        photoCli: mapRange(progress.value, [-0.5, -0.2], [0, 1]),
        photo: mapRange(progress.value, [-0.25, 0.3], [0, 1]),
        showSocials: progress.value > -0.2,
        showVersion: progress.value > -0.2,
        socials: mapRange(progress.value, [-0.25, 0], [0, 1]),
        version: mapRange(progress.value, [-0.25, 0], [0, 1]),
        bioCli: mapRange(progress.value, [0, 0.4], [0, 1]),
        workflowCli: mapRange(progress.value, [0.1, 0.45], [0, 1]),
        showWorkflow: progress.value >= 0.45,
        bioPager: mapRange(progress.value, [0.45, 0.9], [0, 1]),
    };
});

onMounted(() => {
    scrollData.scrollContainer.value?.addEventListener("scroll", () => {
        // The factor of 2 was obtained empirically
        progress.value = root.value
            ? (-2 * root.value.getBoundingClientRect().top) /
              root.value.offsetHeight
            : 0;
    });
});
</script>

<template>
    <div class="fullWindow section" ref="root">
        <div class="stickyContainer">
            <SectionTitle class="sectionTitle" text="About Me" slug="about" />
            <div class="contentContainer">
                <div class="content">
                    <div class="leftContent">
                        <div class="frame">
                            <div class="photoWrapper">
                                <CliEffect
                                    prompt="$ "
                                    text="cat mugshot"
                                    :progress="checkpoints.photoCli"
                                >
                                    <AnimatedPhoto
                                        :progress="checkpoints.photo"
                                    />
                                </CliEffect>
                            </div>
                            <div class="socialsContainer">
                                <Transition name="standard-fade">
                                    <div
                                        v-if="checkpoints.showSocials"
                                        class="badge"
                                    >
                                        <CliEffect
                                            :progress="checkpoints.socials"
                                            prompt="$ "
                                            text="lsof -i"
                                        >
                                            <div class="socials">
                                                <SocialIcon
                                                    name="github"
                                                    class="icon"
                                                />
                                                <SocialIcon
                                                    name="linkedin"
                                                    class="icon"
                                                />
                                                <SocialIcon
                                                    name="mail"
                                                    class="icon"
                                                />
                                            </div>
                                        </CliEffect>
                                    </div>
                                </Transition>
                            </div>
                            <div class="versionContainer">
                                <Transition name="standard-fade">
                                    <div
                                        v-if="checkpoints.showVersion"
                                        class="badge"
                                    >
                                        <CliEffect
                                            :progress="checkpoints.version"
                                            prompt="$ "
                                            text="uname -r"
                                        >
                                            <span class="version">
                                                version: 23
                                            </span>
                                        </CliEffect>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                    <CliEffect
                        :progress="checkpoints.bioCli"
                        prompt=">>> "
                        text="print(self.__doc__)"
                        class="bioCliEffect"
                    >
                        <Bio :progress="checkpoints.bioPager" />
                    </CliEffect>
                    <CliEffect
                        :progress="checkpoints.workflowCli"
                        prompt="> "
                        text="JSON.stringify(workflow)"
                    >
                        <Workflow
                            :style="checkpoints.showWorkflow || {opacity: 0}"
                        />
                    </CliEffect>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
@use "@/assets/global.scss" as g;
@import "@/assets/global.scss";

.section {
    position: relative;
    height: 200vh;
    background: var(--color-background-1);

    .sectionTitle {
        position: absolute;
        inset: 0 0 auto;

        :deep(.titleDecoration) {
            fill: var(--color-background-2);
        }
    }

    .stickyContainer {
        position: sticky;
        top: 0;
        height: 100vh;

        .contentContainer {
            @include c.fillParent;
            padding: 32px 24px;

            @include c.centerFlex;

            .content {
                @include c.centerFlex;
                flex-direction: column;
                gap: 48px;
                font-family: $monospace;

                @include g.screenWidthAbove(g.$small) {
                    flex-direction: row;
                    align-items: start;
                }

                .leftContent {
                    @include c.centerFlex;
                    flex-direction: column;
                    gap: 16px;
                    height: 100%;

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
                                box-shadow: inset 0 0 40px
                                    var(--color-background-2);
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
                                font-family: g.$monospace;
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
                                    width: 1.2em;
                                    height: 1.2em;
                                    color: var(--color-primary);
                                }
                            }
                        }
                    }
                }

                .bioCliEffect :deep(.cli) {
                    padding: 0;
                }
            }
        }
    }
}
</style>

<!-- Standard fade transition style -->
<style scoped lang="scss">
@import "@/assets/standard-fade-transition.module.scss";
</style>
