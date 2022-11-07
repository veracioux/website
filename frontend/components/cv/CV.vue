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
//const enabledGroups = props.variant === "1" ? ([] as (keyof typeof groups)[]).map(key => [key, groups[key]]) : Object.entries(groups);

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
console.debug({excludedEntries, entries, enabledEntries}, enabledEntries.filter(([_, entry]) => entry.group === enabledGroups[0][1]))

const displayType: "grouped" | "linear" = isPdf.value ? "grouped" : "linear";

</script>

<template>
    <div class="cvRoot">
        <CVHeader v-if="isPdf" />
        <div class="content">
            <div v-if="displayType === 'grouped'">
                <template v-for="[key, group] of enabledGroups">
                    <h3 class="groupTitle">{{ group.name }}</h3>
                    <table class="timeline">
                        <!--                            v-for="[key, entry] of enabledEntries.filter(([_, entry]) => entry.group === group)"-->
                        <div
                            v-for="[key] of enabledEntries.filter(([_, entry]) => entry.group === group)"
                        >{{key}}
                        </div>
                    </table>
                </template>
            </div>
            <table v-else class="timeline">
                <template v-for="[key, entry] of enabledEntries">
                    <TimelineEntry v-bind="entry" />
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
@import "@/assets/global.scss";
@import "@/assets/home.scss";

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
            text-align: left;
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
