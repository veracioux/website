<script setup lang="tsx">
import TimelineEntry from "@/components/cv/TimelineEntry.vue";
import SkillsPane from "@/components/cv/SkillsPane.vue";
import CVHeader from "./CVHeader.vue";
import LanguagesPane from "@/components/cv/LanguagesPane.vue";
import {ContextIsPdf} from "@/inject";
import {groups, entries, Entry, Skill} from "@/cv";
import {reactive, ref} from "vue";

const props = defineProps<{
    variant?: "1";
}>();

// NOTE: Skills and Entries are tethered. Whenever you hover over a skill, an
// entry that references the skill is highlighted, and vice versa. Let's call a
// Skill and an Entry with a common name: Entity. The entity that is hovered is
// in a selected state. The tethered entity that gets highlighted is in active
// state. This will help you understand the meaning of the following variables.

const selectedEntry = ref<Entry>();
const selectedSkill = ref<Skill>();
const activeEntries = reactive<Entry[]>([]);
const activeSkills = reactive<Skill[]>([]);

const isPdf = ContextIsPdf.inject();

const excludedGroups = props.variant === "1" ? ([
    "extraCurricular",
] as (keyof typeof groups)[]) : [];

const enabledGroups = Object.entries(groups).filter(([key]) => !excludedGroups.includes(key as any))

const excludedEntries = [
    ...(
        props.variant === "1" ? ([
            "renovation",
            "demosTP",
            "demosPMS",
        ] as (keyof typeof entries)[]) : []
    ),
    ...Object.entries(entries)
        .filter(([_, entry]) =>
            excludedGroups.find(gKey => groups[gKey] === entry.group)
        )
        .map(([key]) => key),
];

const enabledEntries = Object.entries(entries).filter(([key]) => !excludedEntries.includes(key));

enabledGroups.forEach(([_, group]) => {
    group.entries = enabledEntries.filter(([_, entry]) => entry.group === group).map(([_, entry]) => entry);
});

const displayType: "grouped" | "linear" = isPdf.value ? "grouped" : "linear";

</script>

<template>
    <div class="cvRoot">
        <CVHeader v-if="isPdf" />
        <div class="content">
            <table class="timeline">
                <template v-if="displayType === 'linear'"
                          v-for="[key, entry] of enabledEntries"
                >
                    <TimelineEntry v-bind="entry" />
                </template>
                <template v-else>
                    <template v-for="([key, group], i) of enabledGroups">
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
            <aside class="sidePane">
                <SkillsPane class="skillsPane" :variant="variant" />
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
        padding-top: 24px;
        padding-bottom: 80px;

        @include screenWidthAboveCriticalPoint {
            flex-direction: row;
            gap: 16px;
            padding-top: 32px;
        }

        .timeline {
            border-spacing: 16px 0;
            line-height: 200%;
            max-width: 900px;
            height: fit-content;

            :global(td) {
                padding: 0;
            }
        }

        .sidePane {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: inherit;

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

        .groupTitle {
            font-size: 1.8em;
            position: absolute;
            // Even though alpha is 0, the color is important for PDF generation
            $transparent: rgba(var(--color-background-0-rgb), 0);
            $background: var(--color-background-0);

            &.intermittent {
                transform: translateY(-50%);
                background: linear-gradient(
                        $transparent, $background, $background, $transparent
                );
                line-height: 4;
                z-index: 1;
            }
        }

        .groupedTimeLineEntry {
            &.marginTop:deep(.acceptsMargin) {
                @include timeline.responsiveVerticalMargin($top: 32px);
            }

            &.marginBottom:deep(.acceptsMargin) {
                @include timeline.responsiveVerticalMargin($bottom: 24px);
            }
        }
    }

}

:root[data-pdf] .content {
    padding-top: 64px;
    padding-bottom: 0;
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
