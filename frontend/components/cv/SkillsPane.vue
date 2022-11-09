<script setup lang="ts">
import Label from "@/components/generic/Label.vue";
import Icon from "@/components/generic/Icon.vue";
import {skills, skillGroups, Skill, Entry} from "@/cv";
import iconDocker from "@/assets/icons/docker.svg";
import iconGit from "@/assets/icons/git-with-text.svg";
import iconJetBrains from "@/assets/icons/jetbrains.svg";
import iconLinux from "@/assets/icons/linux.svg";
import iconEmacs from "@/assets/icons/emacs.svg";
import {ContextIsPdf} from "~/inject";

const props = defineProps<{
    variant?: string;
    hoveredSkill?: Skill | null;
    selectedSkill?: Skill | null;
    hoveredEntry?: Entry | null;
    selectedEntry?: Entry | null;
    activeSkills?: Skill[] | null;
}>();

const emit = defineEmits<{
    (e: "hoverSkill", skill: Skill): void;
    (e: "leaveSkill"): void;
    (e: "selectSkill", skill: Skill): void;
}>();

const isPdf = ContextIsPdf.inject();

const extraClasses: Partial<Record<keyof typeof skills, string>> = {
    bash: "iconBash",
    qt: "iconQt",
    django: "iconDjango",
    ethereum: "iconEthereum",
    solana: "iconSolana",
    nginx: "iconNginx",
    docker: "iconDocker",
    git: "iconGit",
    jetbrains: "iconJetBrains",
    linux: "iconLinux",
    emacs: "iconEmacs",
};

function isActive(skill: Skill) {
    return !!props.activeSkills?.find(s => s.key === skill.key);
}

function isSelected(skill: Skill) {
    return skill.key === props.selectedSkill?.key;
}

function isHovered(skill: Skill) {
    return skill.key === props.hoveredSkill?.key;
}

function shouldHighlight(skill: Skill) {
    return isHovered(skill) || isSelected(skill) || isActive(skill);
}

</script>

<template>
    <div class="skillsPaneRoot">
        <h2 class="subsectionTitle" style="margin-top: 0">Skills</h2>
        <template v-for="group of skillGroups">
            <template v-if="!group.disabled">
                <h3 class="subsubsectionTitle">{{ group.name }}</h3>
                <div class="labelContainer">
                    <span
                        v-for="skill of Object.values(skills).filter(skill => skill.group === group && !skill.disabled)"
                        :class="['skill', {active: isActive(skill), selected: isSelected(skill)}]"
                        @mouseover="emit('hoverSkill', skill)"
                        @mouseleave="emit('leaveSkill')"
                        @click.stop="emit('selectSkill', skill)"
                    >
                        <template v-if="skill.icon">
                            <Icon
                                :src="skill.icon"
                                :alt="skill.name"
                                :title="skill.name"
                                :class="`icon ${extraClasses[skill.key] ?? ''}`"
                            />
                            <span v-if="isPdf" class="name">
                                {{ skill.name }}
                            </span>
                        </template>
                        <Label v-else :title="skill.name" />
                        <span v-if="isPdf && skill.experience" class="experience">
                            {{ skill.experience }}
                        </span>
                    </span>
                </div>
            </template>
        </template>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;
@import "@/assets/global.scss";

.skillsPaneRoot {
    display: flex;
    flex-direction: column;
    align-items: inherit;
    gap: 16px;

    @media print {
        gap: 12px;
    }

    --icon-scale-multiplier: 1;

    @media print {
        position: relative;
        padding: 16px;
        align-items: center;

        --icon-scale-multiplier: 0.6;

        @include common.beveledFrame(16px, 2px, #ccc, #f7f7f7);
    }
}

.labelContainer {
    @include common.labelContainer;
    column-gap: 20px;
    row-gap: 10px;
    justify-content: center;

    @media not print {
        margin-left: 24px;
        margin-right: 24px;
    }

    @include screenWidthAbove($small) {
        justify-content: flex-start;
    }

    @media print {
        justify-content: center;
    }
}

.skill {
    display: flex;
    flex-direction: column;
    align-items: center;

    transition: transform 0.1s ease-in-out;
    cursor: pointer;
    pointer-events: none;

    @mixin scaleAndShadow($scale) {
        transform: scale($scale);
        filter: drop-shadow(0 0 calc($scale * 8px) var(--color-secondary));
    }

    @include screenSizeAbove($small) {
        pointer-events: all;

        &:hover {
            @include scaleAndShadow(1.04);
        }

        &.active {
            @include scaleAndShadow(1.08);
        }

        &:hover.active {
            @include scaleAndShadow(1.1);
        }

        &.selected {
            @include scaleAndShadow(1.14);
        }

        &:hover.selected {
            @include scaleAndShadow(1.16);
        }
    }

    color: var(--color-text-pale);

    .experience {
        font-size: 0.7em;
    }
}

$iconSize: 32px;

.icon {
    width: $iconSize;
    height: $iconSize;

    transform: scale(var(--icon-scale-multiplier));
}

/*
Tweaks for individual icons
 */

.iconQt {
    transform: scale(calc(2.2 * var(--icon-scale-multiplier)));
}

/*
Scale an image by $scale and add a right margin so it doesn't
overlap with sibling elements. ($scale must be specified as a
number, not as a percentage)
 */
@mixin scaledIcon($scale) {
    $_scale: calc($scale * var(--icon-scale-multiplier));
    transform: scale($_scale);
    transform-origin: 0;
    margin-right: calc(#{$iconSize} * (#{$_scale} - 1));
}

.iconBash {
    @include scaledIcon(2.2);
}

.iconDjango {
    @include scaledIcon(1.8);
}

.iconDocker {
    @include scaledIcon(2);
}

.iconGit {
    @include scaledIcon(1.6);
}

:root[data-theme="light"] .iconJetBrains {
    --icon-scale-multiplier: 0.65;
}

.iconJetBrains {
    $scale: calc(2.2 * var(--icon-scale-multiplier));
    transform: scale($scale) translate(calc(-0.1 * #{$scale} * #{$iconSize}));
    transform-origin: 0;
    margin-right: calc((0.3 * #{$scale} - 0.6) * #{$iconSize});
}

.iconEthereum,
.iconSolana {
    @include scaledIcon(0.8);
}

.iconNginx {
    @include scaledIcon(1.8);
}
</style>
