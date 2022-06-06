<script setup lang="ts">
import TimelineEntry from "@/components/cv/TimelineEntry.vue";
import Label from "@/components/generic/Label.vue";
import Icon from "@/components/generic/Icon.vue";

import iconTS from "@/assets/icons/typescript.svg";
import iconJS from "@/assets/icons/javascript.svg";
import iconPython from "@/assets/icons/python.svg";
import iconC from "@/assets/icons/c.svg";
import iconCpp from "@/assets/icons/cpp.svg";
import iconQt from "@/assets/icons/qt.svg";
import iconBash from "@/assets/icons/bash.svg";
import iconReact from "@/assets/icons/react.svg";
import iconVue from "@/assets/icons/vue.svg";
import iconDjango from "@/assets/icons/django.svg";
import iconDocker from "@/assets/icons/docker.svg";
import iconLinux from "@/assets/icons/linux.svg";
import iconGit from "@/assets/icons/git.svg";
import iconJetBrains from "@/assets/icons/jetbrains.svg";
import iconEmacs from "@/assets/icons/emacs.svg";
import iconEthereum from "@/assets/icons/ethereum.svg";
import iconSolana from "@/assets/icons/solana.svg";
import iconJava from "@/assets/icons/java.svg";
import iconCSharp from "@/assets/icons/csharp.svg";

import {onMounted, ref} from "vue";

const root = ref<HTMLElement>()

onMounted(() => {
    // Set target="_blank" on all anchor tags
    const anchors = root.value?.getElementsByTagName("a");
    if (!anchors) return
    for (let i = 0; i < anchors.length; ++i) {
        const item = anchors.item(i)!
        item.setAttribute('target', '_blank')
    }
})
</script>

<template>
    <div ref="root" class="section">
        <h1 class="sectionTitle">Curriculum Vitae</h1>
        <div class="content">
            <table class="timeline">
                <TimelineEntry start-date="2022-01" display-date="Jan 2022 - present" first>
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
                    <b>Bachelor of Electrical Engineering</b>, Department of Automation and Electronics,
                    Faculty of Electrical Engineering, University of Sarajevo
                    <br />
                    <pre>- GPA 9.19/10.00</pre>
                </TimelineEntry>
                <TimelineEntry start-date="2021" end-date="present">
                    <a href="https://flameshot.org" target="_blank"><b>Flameshot</b></a>,
                    A Free & Open Source Screenshot Program <br />
                    <div class="labelContainer">
                        <Label title="Co-maintainer" />
                        <Label title="Developer" />
                        <Label title="Tester" />
                        <Label title="UI/UX Designer" />
                    </div>
                </TimelineEntry>
                <TimelineEntry start-date="2017" display-date="Spring 2017">
                    <a href="https://github.com/veracioux/rotating-led-display" target="_blank"><b>Rotating LED
                        Display</b></a>,
                    High School Project Festival, Hadžići, Bosnia and Herzegovina
                    <br />
                    <div class="labelContainer">
                        <Label title="Lead Engineer" />
                        <Label title="Lead Designer" />
                        <Label title="Lead Programmer" />
                    </div>
                </TimelineEntry>
                <TimelineEntry start-date="2016" end-date="2017">
                    <a href="https://github.com/veracioux/wood-fall" target="_blank"><b>Wood Fall</b></a>,
                    video game, solo project
                    <br />
                    <div class="labelContainer">
                        <Label title="Programmer" />
                        <Label title="Artist" />
                        <Label title="Sound Designer" />
                        <Label title="Publisher" />
                    </div>
                </TimelineEntry>
                <TimelineEntry start-date="2016-03" end-date="2016-11" display-date="Mar - Nov 2016">
                    <b>Renovation of sports grounds</b>, Kamberovića polje Zenica
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
                    Electrical Engineering University of Sarajevo,
                    Course: <i>Design of Microprocessor Systems</i>
                </TimelineEntry>
                <TimelineEntry start-date="2019" end-date="2020" display-date="Summer 2019, Summer 2020">
                    Internship, <a href="https://search.bisnode.ba/ba/367191/elektromatik-d-o-o-zenica/"
                                   target="_blank">Elektromatik d.o.o. Zenica</a>
                    <br />
                    <div class="labelContainer">
                        <Label title="PLC programming" />
                        <Label title="Industrial sensors" />
                        <Label title="Motor control" />
                        <Label title="Industrial schematic design" />
                    </div>
                </TimelineEntry>
                <TimelineEntry start-date="2019-03" end-date="2019-06" display-date="Mar - Jun 2019">
                    <b>Undergraduate Teaching Assistant</b>, Faculty of Electrical Engineering,
                    University of Sarajevo, Course: <i>Programming Techniques</i>
                </TimelineEntry>
                <TimelineEntry start-date="2018" end-date="present">
                    <b>Answering community questions</b>, <a href="https://math.stackexchange.com/users/450231"
                                                             target="_blank">Mathematics
                    StackExchange</a>
                </TimelineEntry>
                <TimelineEntry start-date="2018" end-date="present" last>
                    <b>Various personal projects on <a href="https://github.com/veracioux">GitHub</a></b>
                    <br>
                </TimelineEntry>
            </table>
            <aside class="sidePane">
                <div class="skillsPane">
                    <h2 class="subsectionTitle" style="margin-top: 0">
                        Skills
                    </h2>
                    <h3 class="subsubsectionTitle">Programming Languages</h3>
                    <div class="labelContainer">
                        <Icon :src="iconJS" alt="JavaScript" class="icon" />
                        <Icon :src="iconTS" alt="TypeScript" class="icon" />
                        <Icon :src="iconPython" alt="Python" class="icon" />
                        <Icon :src="iconC" alt="C" class="icon" />
                        <Icon :src="iconCpp" alt="C++" class="icon" />
                        <Icon :src="iconBash" alt="Bash" class="icon iconBash" />
                    </div>
                    <h3 class="subsubsectionTitle">Frameworks & Technologies</h3>
                    <div class="labelContainer">
                        <Icon :src="iconQt" alt="Qt framework" class="icon iconQt" />
                        <Icon :src="iconReact" alt="ReactJS" class="icon" />
                        <Icon :src="iconVue" alt="Vue.js" class="icon" />
                        <Icon :src="iconDjango" alt="Django" class="icon iconDjango" />
                        <Icon :src="iconEthereum" alt="Ethereum" class="icon iconEthereum" />
                        <Icon :src="iconSolana" alt="Solana" class="icon iconSolana" />
                    </div>
                    <h3 class="subsubsectionTitle">Other tools</h3>
                    <div class="labelContainer">
                        <Icon :src="iconDocker" alt="Docker" class="icon iconDocker" />
                        <Icon :src="iconGit" alt="Git" class="icon iconGit" />
                        <Icon :src="iconJetBrains" alt="JetBrains" class="icon iconJetBrains" />
                        <Icon :src="iconLinux" alt="Linux" class="icon iconLinux" />
                        <Icon :src="iconEmacs" alt="Emacs" class="icon" />
                    </div>
                    <h3 class="subsubsectionTitle">Automation</h3>
                    <div class="labelContainer">
                        <Label title="PLC programming" />
                        <Label title="TIA Portal" />
                        <Label title="SoMachine" />
                        <Label title="ABB VFDs (basic)" />
                    </div>
                    <h3 class="subsubsectionTitle">Others</h3>
                    <div class="labelContainer">
                        <Label title="Teaching" />
                        <Label title="Technical writing" />
                    </div>
                    <h3 class="subsubsectionTitle">Stale
                        <Icon src=""></Icon>
                    </h3>
                    <div class="labelContainer">
                        <Icon :src="iconJava" alt="Java" class="icon" />
                        <Icon :src="iconCSharp" alt="C#" class="icon" />
                    </div>
                </div>
                <div class="languagesPane" style="margin-top: 48px">
                    <h2 class="subsectionTitle">Languages</h2>
                    <table class="languageTable">
                        <tr>
                            <td>English</td>
                            <td rowspan="0" class="columnDelimiter"></td>
                            <td><b>Advanced</b> (TOEFL<sup></sup> iBT score: 109/120)</td>
                        </tr>
                        <tr>
                            <td>German</td>
                            <td><b>Reading and Writing</b> (intermediate), <b>Speaking</b> (basic)</td>
                        </tr>
                        <tr>
                            <td>Bosnian</td>
                            <td><b>Native language</b></td>
                        </tr>
                    </table>
                </div>
            </aside>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;
@import "@/assets/home.scss";

$colorDimText: rgba(var(--color-text-rgb), 0.7);

.section {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $colorDimText;

    .content {
        display: flex;
        justify-content: start;
        gap: 16px;

        .timeline {
            border-spacing: 16px 0;
            line-height: 180%;

            :global(td) {
                padding: 0;
            }

            .labelContainer {

            }
        }

        .sidePane {
            position: -webkit-sticky;
            position: sticky;
            top: 200px;
            bottom: 200px;
            height: 100%;

            .labelContainer {
                margin-left: 24px;
                margin-right: 24px;
            }
        }
    }

    .sectionTitle {
        @extend .sectionTitle;
        position: sticky;
        top: 0;
        color: var(--color-text);
    }

    .subsectionTitle {
        text-align: left;
        margin-top: 24px;
        margin-bottom: 24px;
        color: var(--color-text);
    }

    .subsubsectionTitle {
        text-align: left;
        margin: 16px 12px;
    }
}

.labelContainer {
    @include common.labelContainer;
    justify-content: start;
}

$iconSize: 32px;

.icon {
    width: $iconSize;
    height: $iconSize;
}

.languageTable {
    border-spacing: 16px;
}

.columnDelimiter {
    width: 2px;
    background: rgba(var(--color-secondary-rgb), 0.6);
}

/*
Tweaks for individual icons
 */

.iconQt {
    transform: scale(2);
}

/*
Scale an image by $scale and add a right margin so it doesn't
overlap with sibling elements. ($scale must be specified as a
number, not as a percentage)
 */
@mixin scaledIcon($scale) {
    transform: scale($scale);
    transform-origin: 0;
    margin-right: calc(#{$iconSize} * (#{$scale} - 1));
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

.iconJetBrains {
    $scale: 2.4;
    @include scaledIcon($scale);
    translate: calc(-0.25 * #{$iconSize});
    margin-right: calc((#{$scale} - 1 - 0.25 * #{$scale}) * #{$iconSize});
}

.iconEthereum, .iconSolana {
    @include scaledIcon(0.8);
}
</style>
