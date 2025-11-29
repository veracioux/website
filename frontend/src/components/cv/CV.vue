<script setup lang="tsx">
import TimelineEntry from "@/components/cv/TimelineEntry.vue";
import SkillsPane from "@/components/cv/SkillsPane.vue";
import CVHeader from "./CVHeader.vue";
import LanguagesPane from "@/components/cv/LanguagesPane.vue";
import { CvContext } from "@/inject";
import {
  groups as _groups,
  entries as _entries,
  type Entry,
  skills,
  type DisplayMode,
} from "@/cv";
import type { Skill } from "@/types";
import { computed, onMounted, ref, watch } from "vue";

defineProps<{
  displayMode: DisplayMode;
}>();

const ctx = CvContext.inject();

// NOTE: Skills and Entries are tethered. Whenever you hover over a skill, an
// entry that references the skill is highlighted, and vice versa: when hovering over an entity, all referenced skills will be active. Let's call a
// Skill and an Entry with a common name: Entity. The entity that is hovered is
// in a hovered state. The tethered entity that gets highlighted is in active
// state. You can also click an entity to select it which will put it into the
// 'selected' state. All tethered entities will become 'active'. But, while an
// entity is selected, hovering over other entities won't activate/deactivate
// anything, until you click outside of any entity.

// This will help you understand the meaning of the following variables.

const hoveredEntry = ref<Entry | null>(null);
const hoveredSkill = ref<Skill | null>(null);
const selectedEntry = ref<Entry | null>(null);
const selectedSkill = ref<Skill | null>(null);
const activeSkills = ref<Skill[]>([]);

const data = computed(() => {
  const entries = {
    ..._entries,
    elektromatik: {
      ..._entries.elektromatik,
      disabled: ctx.resume,
    },
    demosPMS: {
      ..._entries.demosPMS,
      disabled: ctx.resume,
    },
    demosTP: {
      ..._entries.demosTP,
      disabled: ctx.resume,
    },
    githubProjects: {
      ..._entries.githubProjects,
      disabled: ctx.resume,
    },
    rotatingLedDisplay: {
      ..._entries.rotatingLedDisplay,
      disabled: ctx.resume,
    },
    renovation: {
      ..._entries.renovation,
      disabled: ctx.resume,
    },
  } satisfies typeof _entries;

  const groups = Object.fromEntries(
    Object.entries(_groups).map(([key, group]) => [
      key,
      {
        ...group,
        entries: Object.values(entries).filter(
          (entry) => entry.group === group
        ),
      },
    ])
  ) as unknown as Record<
    keyof typeof _groups,
    (typeof _groups)[keyof typeof _groups] & {
      entries: Entry[];
    }
  >;

  // TODO Devise a method to define variants in external files.
  const excludedGroups = ctx.variant
    ? (["extraCurricular"] as (keyof typeof groups)[])
    : [];

  const enabledGroups = Object.values(groups).filter(
    ({ key }) => !excludedGroups.includes(key as keyof typeof groups)
  );

  // All entries that should are explicitly excluded
  const excludedEntries = ctx.variant
    ? (["renovation", "demosTP", "demosPMS"] as (keyof typeof entries)[])
    : [];

  // All entries that should are explicitly excluded plus those excluded implicitly
  // because the group they belong to has been excluded.
  const allExcludedEntries = [
    ...excludedEntries,
    ...Object.values(entries)
      .filter((entry) => excludedGroups.find((key) => key === entry.group?.key))
      .map(({ key }) => key),
  ];

  const enabledEntries = Object.values(entries).filter(
    ({ key }) => !allExcludedEntries.includes(key)
  );

  enabledGroups.forEach((group) => {
    group.entries = group.entries?.filter(
      ({ key }) => !excludedEntries.includes(key as keyof typeof entries)
    );
  });

  return {
    enabledEntries,
    enabledGroups,
  };
});

function onHoverEntry(entry: Entry) {
  if (!selectedEntry.value && !selectedSkill.value) {
    hoveredEntry.value = entry;
  }
}

function onLeaveEntry() {
  hoveredEntry.value = null;
}

function onToggleSelectEntry(entry: Entry) {
  selectedEntry.value = entry.key !== selectedEntry.value?.key ? entry : null;
  selectedSkill.value = null;
  // Prevents skills being deactivated when this entry is unhovered while deselected
  if (selectedEntry.value === null) {
    hoveredEntry.value = entry;
  }
}

function onHoverSkill(skill: Skill) {
  if (!selectedSkill.value && !selectedEntry.value) {
    hoveredSkill.value = skill;
  }
}

function onLeaveSkill() {
  hoveredSkill.value = null;
}

function onToggleSelectSkill(skill: Skill) {
  selectedSkill.value = skill.key !== selectedSkill.value?.key ? skill : null;
  selectedEntry.value = null;
  // Prevents entries being deactivated when this skill is unhovered while deselected
  if (selectedSkill.value === null) {
    hoveredSkill.value = skill;
  }
}

function onDeselect() {
  selectedEntry.value = null;
  selectedSkill.value = null;
}

// Update the activeSkills array whenever a hovered or selected entry changes
watch([hoveredEntry, selectedEntry], ([h, s]) => {
  const entry = s ?? h;
  activeSkills.value = Object.values(entry?.skills ?? []).map(
    (skillOrKey) =>
      skills[((skillOrKey as Skill).key ?? skillOrKey) as keyof typeof skills]
  );
});

onMounted(() => {
  // On click outside of any entity
  document.addEventListener("click", () => {
    selectedEntry.value = selectedSkill.value = null;
  });
});
</script>

<template>
  <div class="cvRoot">
    <CVHeader class="only-print" />
    <div class="content" @click="onDeselect">
      <div class="timelineWrapper">
        <table class="timeline">
          <tbody>
            <template v-if="displayMode === 'timeline'">
              <template
                v-bind:key="entry.key"
                v-for="entry of data.enabledEntries.sort(
                  (a, b) =>
                    new Date(b.startDate).getTime() -
                    new Date(a.startDate).getTime()
                )"
              >
                <TimelineEntry
                  v-if="!entry.disabled"
                  v-bind="entry"
                  :hovered="hoveredEntry?.key === entry.key"
                  :selected="selectedEntry?.key === entry.key"
                  :active="selectedEntry?.key !== entry.key && !!entry.skills?.find(s => (s as Skill).key === (selectedSkill ?? hoveredSkill)?.key)"
                  @mouseover="onHoverEntry(entry)"
                  @mouseleave="onLeaveEntry()"
                  @click.stop="onToggleSelectEntry(entry)"
                />
              </template>
            </template>
            <template v-else>
              <template
                v-bind:key="group.key"
                v-for="group of data.enabledGroups"
              >
                <div class="h-16 relative [&:first-child]:-mb-4">
                  <div class="groupTitle">
                    <div class="h-full inset-0 flex items-center">
                      {{ group.name }}
                    </div>
                  </div>
                </div>
                <template
                  v-for="entry of group.entries?.sort(
                    (a, b) =>
                      new Date(b.startDate).getTime() -
                      new Date(a.startDate).getTime()
                  )"
                  v-bind:key="entry.key"
                >
                  <TimelineEntry
                    v-if="!entry.disabled"
                    v-bind="entry"
                    :hovered="hoveredEntry?.key === entry.key"
                    :selected="selectedEntry?.key === entry.key"
                    :active="selectedEntry?.key !== entry.key && !!entry.skills?.find(s => (s as Skill).key === (selectedSkill ?? hoveredSkill)?.key)"
                    @mouseover="onHoverEntry(entry)"
                    @mouseleave="onLeaveEntry()"
                    @click.stop="onToggleSelectEntry(entry)"
                  />
                </template>
              </template>
            </template>
          </tbody>
        </table>
      </div>
      <aside class="sidePane flex flex-col items-stretch gap-8">
        <SkillsPane
          :hovered-skill="hoveredSkill"
          :selected-skill="selectedSkill"
          :active-skills="activeSkills"
          @hoverSkill="onHoverSkill"
          @leaveSkill="onLeaveSkill"
          @selectSkill="onToggleSelectSkill"
        />
        <LanguagesPane />
      </aside>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;
@use "@/assets/timeline-entry.module.scss" as timeline;
@use "@/assets/global.scss";

$colorDimText: rgba(var(--color-text-rgb), 0.7);

@mixin screenWidthAboveCriticalPoint {
  @include global.screenWidthAbove(global.$small) {
    @content;
  }
}

.cvRoot {
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 3em;

    user-select: none;

    @include screenWidthAboveCriticalPoint {
      flex-direction: row;
      gap: 1.5em;
    }

    @media print {
      align-items: stretch;
    }

    .timelineWrapper {
      --timeline-background: var(--color-background-2);
      --timeline-background-rgb: var(--color-background-2-rgb);
      flex: 3 1 auto;

      @media print {
        position: relative;
        width: 440px;

        --timeline-background: #f7f7f7;
        --timeline-background-rgb: 247, 247, 247;

        @include common.beveledEdges(16px);
        @include common.beveledFrame(
          16px,
          2px,
          #ccc,
          var(--timeline-background)
        );
      }
    }

    .timeline {
      position: relative;
      line-height: 2;
      max-width: 740px;
      height: fit-content;

      margin-left: 32px;

      @media print {
        margin: 24px;
        margin-top: 0px;
      }

      @include global.screenSizeAbove(global.$large) {
        max-width: 900px;
      }

      :global(td) {
        padding: 0;
      }

      .groupTitle {
        font-size: 1.6em;
        position: absolute;
        left: 0;
        height: inherit;
        width: fit-content;
        text-align: start;
        z-index: 1;
        pointer-events: none;
        white-space: nowrap;

        // Even though alpha is 0, the color is important for PDF generation
        $transparent: rgba(var(--timeline-background-rgb), 0);
        $background: var(--timeline-background);

        background: linear-gradient(
          $transparent,
          $background,
          $background,
          $transparent
        );
      }
    }

    .sidePane {
      flex: 1 1 auto;

      @include screenWidthAboveCriticalPoint {
        position: sticky;
        top: 5.8rem;
        bottom: 4.6em;
        height: 100%;

        @media print {
          top: 0;
        }
      }

      @include global.screenWidthAbove(global.$large) {
        @include global.screenHeightBelow(global.$small) {
          flex-direction: row;
          gap: 1rem;
          flex: 2 0 auto;
        }
      }

      @media print {
        gap: 1rem !important;
        flex: 0 5 29%;
      }
    }
  }
}
</style>

<style scoped lang="scss">
.sectionTitle {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;
}
</style>
