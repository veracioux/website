<script setup lang="ts">
import Label from "@/components/generic/Label.vue";
import Icon from "@/components/generic/Icon.vue";
import { skills, skillGroups, type Entry } from "@/cv";
import type { Skill } from "@/types";

const props = defineProps<{
  variant?: string;
  hoveredSkill?: Skill | null;
  selectedSkill?: Skill | null;
  hoveredEntry?: Entry | null;
  selectedEntry?: Entry | null;
  activeSkills?: Skill[] | null;
}>();

const showExperience = false;

const emit = defineEmits<{
  (e: "hoverSkill", skill: Skill): void;
  (e: "leaveSkill"): void;
  (e: "selectSkill", skill: Skill): void;
}>();

const extraClasses: Partial<Record<keyof typeof skills, string>> = {
  bash: "iconBash",
  qt: "iconQt",
  django: "iconDjango",
  ethereum: "iconEthereum",
  solana: "iconSolana",
  nginx: "iconNginx",
  docker: "iconDocker",
  git: "iconGit",
  linux: "iconLinux",
  emacs: "iconEmacs",
};

function isActive(skill: Skill) {
  return !!props.activeSkills?.find((s) => s.key === skill.key);
}

function isSelected(skill: Skill) {
  return skill.key === props.selectedSkill?.key;
}
</script>

<template>
  <div
    class="skillsPaneRoot flex flex-col items-center md:items-start print:items-center gap-4"
  >
    <h2>Skills</h2>
    <template v-for="group of skillGroups" v-bind:key="group.key">
      <template v-if="!group.disabled">
        <h3>{{ group.name }}</h3>
        <div class="labelContainer">
          <span
            v-for="skill of Object.values(skills).filter(
              (skill) => skill.group === group && !skill.disabled
            )"
            v-bind:key="skill.key"
            :class="[
              'skill',
              { active: isActive(skill), selected: isSelected(skill) },
            ]"
            @mouseover="emit('hoverSkill', skill)"
            @mouseleave="emit('leaveSkill')"
            @click.stop="emit('selectSkill', skill)"
          >
            <template v-if="skill.icon">
              <Icon
                :src="skill.icon"
                :alt="skill.name"
                :title="skill.name"
                :class="`icon ${extraClasses[skill.key as keyof typeof skills] ?? ''}`"
              />
              <span class="no-print text-sm">
                {{ skill.name }}
              </span>
            </template>
            <Label v-else :title="skill.name"></Label>
            <span
              v-if="skill.experience && showExperience"
              class="experience only-print"
            >
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
@use "@/assets/global.scss";

.skillsPaneRoot {
  --icon-scale-multiplier: 1;

  @media print {
    position: relative;
    padding: 16px;

    @include common.beveledFrame(16px, 2px, #ccc, #f7f7f7);
  }
}

.labelContainer {
  @include common.labelContainer;
  column-gap: 0.8em;
  row-gap: 10px;
  justify-content: center;

  @media not print {
    margin-left: 24px;
    margin-right: 24px;
  }

  @include global.screenWidthAbove(global.$small) {
    justify-content: flex-start;
  }

  @media print {
    justify-content: center;
  }
}

.skill {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;

  transition: transform 0.1s ease-in-out;
  cursor: pointer;
  pointer-events: none;

  @mixin scaleAndShadow($scale) {
    transform: scale($scale);
    filter: drop-shadow(0 0 calc($scale * 8px) var(--color-secondary));
  }

  @include global.screenWidthAbove(global.$small) {
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

$iconSize: 2.1em;

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

.iconEthereum,
.iconSolana {
  @include scaledIcon(0.8);
}

.iconNginx {
  @include scaledIcon(1.8);
}
</style>
