<script setup lang="tsx">
import TimelineEntry from "@/components/cv/TimelineEntry.vue";
import SkillsPane from "@/components/cv/SkillsPane.vue";
import CVHeader from "./CVHeader.vue";
import LanguagesPane from "@/components/cv/LanguagesPane.vue";
import {ContextIsPdf} from "@/inject";
import {groups, entries, Entry, Skill, skills} from "@/cv";
import {onMounted, onUnmounted, ref, toRaw, watch} from "vue";

const props = defineProps<{
    variant?: "1";
}>();

// NOTE: Skills and Entries are tethered. Whenever you hover over a skill, an
// entry that references the skill is highlighted, and vice versa: when hovering over an entity, all referenced skills will be active. Let's call a
// Skill and an Entry with a common name: Entity. The entity that is hovered is
// in a hovered state. The tethered entity that gets highlighted is in active
// state. You can also click an entity to select it which will put it into the
// 'selected' state. All tethered entities will become 'active'. But, while an
// entity is selected, hovering over other entities won't activate/deactivate
// anything, until you click outside of any entity.

// This will help you understand the meaning of the following variables.

const hoveredEntry = ref<Entry>(null);
const hoveredSkill = ref<Skill>(null);
const selectedEntry = ref<Entry>(null);
const selectedSkill = ref<Skill>(null);
const activeSkills = ref<Skill[]>([]);

const isPdf = ContextIsPdf.inject();

const excludedGroups = props.variant === "1" ? ([
    "extraCurricular",
] as (keyof typeof groups)[]) : [];

const enabledGroups = Object.values(groups)
    .filter(({key}) => !excludedGroups.includes(key as any))

const excludedEntries = props.variant === "1" ? ([
    "renovation",
    "demosTP",
    "demosPMS",
] as (keyof typeof entries)[]) : []

const allExcludedEntries = [
    ...excludedEntries,
    Object.values(entries)
        .filter(entry => Object.values(excludedGroups).find(gKey => groups[gKey] === entry.group))
        .map(({key}) => key)
];

const enabledEntries = Object.values(entries).filter(({key}) => !allExcludedEntries.includes(key as any));

const displayType: "grouped" | "linear" = isPdf.value ? "grouped" : "linear";

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
    activeSkills.value = Object.values(entry?.skills ?? []).map((skillOrKey: any) => skills[skillOrKey?.key ?? skillOrKey])
});

onMounted(() => {
    document.addEventListener("click", e => {
        selectedEntry.value = selectedSkill.value = null;
    });
});
</script>

<template>
    <div class="cvRoot">
        <CVHeader v-if="isPdf" />
        <div class="content" @click="onDeselect">
            <div class="timelineWrapper">
                <table class="timeline">
                    <template
                        v-if="displayType === 'linear'"
                        v-for="entry of enabledEntries.sort((a, b) => a.startDate < b.startDate )"
                    >
                        <TimelineEntry
                            v-bind="entry"
                            :hovered="hoveredEntry?.key === entry.key"
                            :selected="selectedEntry?.key === entry.key"
                            :active="selectedEntry?.key !== entry.key && !!entry.skills?.find(s => s.key === (selectedSkill ?? hoveredSkill)?.key)"
                            @mouseover="onHoverEntry(entry)"
                            @mouseleave="onLeaveEntry(entry)"
                            @click.stop="onToggleSelectEntry(entry)"
                        />
                    </template>
                    <template v-else>
                        <template v-for="(group, i) of enabledGroups">
                            <h3 :class="['groupTitle', {intermittent: i !== 0}]">
                                {{ group.name }}</h3>
                            <template
                                v-for="(entry, j) of group.entries"
                            >
                                <TimelineEntry
                                    v-bind="entry"
                                    :class="[
                                    'groupedTimeLineEntry',
                                    {
                                        marginTop: j === 0,
                                        marginBottom: j === group.entries.length - 1 && i !== enabledGroups.length - 1,
                                    }
                                ]"
                                />
                            </template>
                        </template>
                    </template>
                </table>
            </div>
            <aside class="sidePane">
                <SkillsPane
                    class="skillsPane"
                    :variant="variant"
                    :hovered-skill="hoveredSkill"
                    :selected-skill="selectedSkill"
                    :active-skills="activeSkills"
                    @hoverSkill="onHoverSkill"
                    @leaveSkill="onLeaveSkill"
                    @selectSkill="onToggleSelectSkill"
                />
                <LanguagesPane class="languagesPane" />
            </aside>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;
@use "@/assets/timeline-entry.module.scss" as timeline;
@import "@/assets/global.scss";

$colorDimText: rgba(var(--color-text-rgb), 0.7);
@mixin screenWidthAboveCriticalPoint {
    @include screenWidthAbove($xlarge) {
        @content;
    }
    @media only print and (min-width: $tablet) {
        @content
    }
}

.cvRoot {
    display: flex;
    flex-direction: column;

    .content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 48px;
        margin-top: 24px;
        margin-bottom: 80px;

        @include screenWidthAboveCriticalPoint {
            flex-direction: row;
            gap: 16px;
            margin-top: 32px;
        }

        @media print {
            align-items: stretch;
            margin-top: 0;
            margin-bottom: 0;
        }

        .timelineWrapper {
            @media print {
                position: relative;
                padding: 24px;
                width: 440px;

                --timeline-background: #f7f7f7;
                --timeline-background-rgb: 247, 247, 247;

                @include common.beveledEdges(16px);
                @include common.beveledFrame(16px, 2px, #aaa, var(--timeline-background));
            }
        }

        .timeline {
            position: relative;
            border-spacing: 16px 0;
            line-height: 2;
            max-width: 900px;
            height: fit-content;

            :global(td) {
                padding: 0;
            }

            .groupTitle {
                font-size: 1.8em;
                position: absolute;
                left: 0;
                right: 0;
                text-align: left;
                z-index: 2;

                // Even though alpha is 0, the color is important for PDF generation
                $transparent: rgba(var(--timeline-background-rgb), 0);
                $background: var(--timeline-background);

                &.intermittent {
                    transform: translateY(-50%);
                    background: linear-gradient(
                            $transparent, $background, $background, $transparent
                    );
                    line-height: 4;
                }
            }

            .groupedTimeLineEntry {
                &.marginTop:deep(.acceptsMargin) {
                    @include timeline.responsiveVerticalMargin($top: 16px);
                }

                &.marginBottom:deep(.acceptsMargin) {
                    @include timeline.responsiveVerticalMargin($bottom: 16px);
                }
            }
        }

        .sidePane {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: inherit;

            @media print {
                // TODO verify
                align-items: start;
                gap: 24px !important;
                flex: 1 1 0;
            }

            @include screenWidthAboveCriticalPoint {
                gap: 32px;
                position: sticky;
                top: 100px;
                bottom: 80px;
                height: 100%;
                align-items: start;
            }

            :deep(.subsectionTitle) {
                text-align: left;
                color: var(--color-text);
            }

            :deep(.subsubsectionTitle) {
                text-align: left;
                margin: 0 12px;
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
