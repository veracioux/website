<script setup lang="ts">
import TimelineEntry from "@/components/cv/TimelineEntry.vue";
import Label from "@/components/generic/Label.vue";
import {onMounted, ref} from "vue";
import SkillsPane from "@/components/cv/SkillsPane.vue";
import LanguagesPane from "@/components/cv/LanguagesPane.vue";

const root = ref<HTMLElement>();

onMounted(() => {
    // Set target="_blank" on all anchor tags
    const anchors = root.value?.getElementsByTagName("a");
    if (!anchors) return;
    for (let i = 0; i < anchors.length; ++i) {
        const item = anchors.item(i)!;
        item.setAttribute("target", "_blank");
    }
});
</script>

<template>
    <div ref="root" class="section">
        <h1 class="sectionTitle">Curriculum Vitae</h1>
        <div class="content">
            <table class="timeline">
                <TimelineEntry
                    start-date="2022-01"
                    display-date="Jan 2022 - present"
                    first
                >
                    <b>Evolt</b>, Software Engineer
                    <div class="labelContainer">
                        <Label title="Backend" />
                        <Label title="Frontend" />
                        <Label title="Blockchain" />
                    </div>
                </TimelineEntry>
                <TimelineEntry start-date="2021-12" display-date="Dec 2021">
                    <b>Evolt</b>, one month internship
                    <div class="labelContainer">
                        <Label title="Backend" />
                    </div>
                </TimelineEntry>
                <TimelineEntry start-date="2017" end-date="2020">
                    <b>Bachelor of Electrical Engineering</b>, Department of
                    Automation and Electronics, Faculty of Electrical
                    Engineering, University of Sarajevo
                    <br />
                    <pre>- GPA 9.19/10.00</pre>
                </TimelineEntry>
                <TimelineEntry start-date="2021" end-date="present">
                    <a href="https://flameshot.org" target="_blank"
                        ><b>Flameshot</b></a
                    >, A Free & Open Source Screenshot Program <br />
                    <div class="labelContainer">
                        <Label title="Co-maintainer" />
                        <Label title="Developer" />
                        <Label title="Tester" />
                        <Label title="UI/UX Designer" />
                    </div>
                </TimelineEntry>
                <TimelineEntry start-date="2017" display-date="Spring 2017">
                    <a
                        href="https://github.com/veracioux/rotating-led-display"
                        target="_blank"
                        ><b>Rotating LED Display</b></a
                    >, High School Project Festival, Hadžići, Bosnia and
                    Herzegovina
                    <br />
                    <div class="labelContainer">
                        <Label title="Lead Engineer" />
                        <Label title="Lead Designer" />
                        <Label title="Lead Programmer" />
                    </div>
                </TimelineEntry>
                <TimelineEntry start-date="2016" end-date="2017">
                    <a
                        href="https://github.com/veracioux/wood-fall"
                        target="_blank"
                        ><b>Wood Fall</b></a
                    >, video game, solo project
                    <br />
                    <div class="labelContainer">
                        <Label title="Programmer" />
                        <Label title="Artist" />
                        <Label title="Sound Designer" />
                        <Label title="Publisher" />
                    </div>
                </TimelineEntry>
                <TimelineEntry
                    start-date="2016-03"
                    end-date="2016-11"
                    display-date="Mar - Nov 2016"
                >
                    <b>Renovation of sports grounds</b>, Kamberovića polje
                    Zenica
                    <div class="labelContainer">
                        <Label title="Participant" />
                        <Label title="Youth Leadership Program 2016" />
                    </div>
                </TimelineEntry>
                <TimelineEntry
                    start-date="2021-03"
                    end-date="2021-06"
                    display-date="Mar - Jun 2021"
                >
                    <b>Undergraduate Teaching Assistant</b>, Faculty of
                    Electrical Engineering University of Sarajevo, Course:
                    <i>Design of Microprocessor Systems</i>
                </TimelineEntry>
                <TimelineEntry
                    start-date="2019"
                    end-date="2020"
                    display-date="Summer 2019, Summer 2020"
                >
                    Internship,
                    <a
                        href="https://search.bisnode.ba/ba/367191/elektromatik-d-o-o-zenica/"
                        target="_blank"
                        >Elektromatik d.o.o. Zenica</a
                    >
                    <br />
                    <div class="labelContainer">
                        <Label title="PLC programming" />
                        <Label title="Industrial sensors" />
                        <Label title="Motor control" />
                        <Label title="Industrial schematic design" />
                    </div>
                </TimelineEntry>
                <TimelineEntry
                    start-date="2019-03"
                    end-date="2019-06"
                    display-date="Mar - Jun 2019"
                >
                    <b>Undergraduate Teaching Assistant</b>, Faculty of
                    Electrical Engineering, University of Sarajevo, Course:
                    <i>Programming Techniques</i>
                </TimelineEntry>
                <TimelineEntry start-date="2018" end-date="present">
                    <b>Answering community questions</b>,
                    <a
                        href="https://math.stackexchange.com/users/450231"
                        target="_blank"
                        >Mathematics StackExchange</a
                    >
                </TimelineEntry>
                <TimelineEntry start-date="2018" end-date="present" last>
                    <b
                        >Various personal projects on
                        <a href="https://github.com/veracioux">GitHub</a></b
                    >
                    <br />
                </TimelineEntry>
            </table>
            <aside class="sidePane">
                <SkillsPane class="skillsPane" />
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

.section {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $colorDimText;

    .content {
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 48px;

        @include screenWidthAbove($xlarge) {
            flex-direction: row;
            gap: 16px;
        }

        .timeline {
            border-spacing: 16px 0;
            line-height: 180%;

            :global(td) {
                padding: 0;
            }
        }

        .sidePane {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: inherit;

            @include screenWidthAbove($xlarge) {
                gap: 32px;
            }

            position: sticky;
            top: 200px;
            bottom: 200px;
            height: 100%;

            @include screenWidthAbove($xlarge) {
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

    .sectionTitle {
        @extend .sectionTitle;
        position: relative;
        top: 0;
        @include screenWidthAbove($xlarge) {
            position: sticky;
        }
        color: var(--color-text);
    }
}

.labelContainer {
    @include common.labelContainer;
    justify-content: start;
}
</style>
