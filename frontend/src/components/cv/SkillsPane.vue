<script setup lang="ts">
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
import iconGit from "@/assets/icons/git-with-text.svg";
import iconJetBrains from "@/assets/icons/jetbrains.svg";
import iconEmacs from "@/assets/icons/emacs.svg";
import iconNginx from "@/assets/icons/nginx.svg";
import iconEthereum from "@/assets/icons/ethereum.svg";
import iconSolana from "@/assets/icons/solana.svg";
import iconJava from "@/assets/icons/java.svg";
import iconCSharp from "@/assets/icons/csharp.svg";
</script>
<template>
    <div class="container">
        <h2 class="subsectionTitle" style="margin-top: 0">Skills</h2>
        <h3 class="subsubsectionTitle">Programming Languages</h3>
        <div class="labelContainer">
            <Icon
                :src="iconJS"
                alt="JavaScript"
                title="JavaScript"
                class="icon"
            />
            <Icon
                :src="iconTS"
                alt="TypeScript"
                title="TypeScript"
                class="icon"
            />
            <Icon :src="iconPython" alt="Python" title="Python" class="icon" />
            <Icon :src="iconC" alt="C" title="C" class="icon" />
            <Icon :src="iconCpp" alt="C++" title="C++" class="icon" />
            <Icon
                :src="iconBash"
                alt="Bash"
                title="Bash"
                class="icon iconBash"
            />
        </div>
        <h3 class="subsubsectionTitle">Frameworks & Technologies</h3>
        <div class="labelContainer">
            <Icon
                :src="iconQt"
                alt="Qt framework"
                title="Qt framework"
                class="icon iconQt"
            />
            <Icon :src="iconReact" alt="ReactJS" title="ReactJS" class="icon" />
            <Icon :src="iconVue" alt="Vue.js" title="Vue.js" class="icon" />
            <Icon
                :src="iconDjango"
                alt="Django"
                title="Django"
                class="icon iconDjango"
            />
            <Icon
                :src="iconEthereum"
                alt="Ethereum"
                title="Ethereum"
                class="icon iconEthereum"
            />
            <Icon
                :src="iconSolana"
                alt="Solana"
                title="Solana"
                class="icon iconSolana"
            />
            <Icon
                :src="iconNginx"
                alt="Nginx"
                title="Nginx"
                class="icon iconNginx"
            />
        </div>
        <h3 class="subsubsectionTitle">Other tools</h3>
        <div class="labelContainer">
            <Icon
                :src="iconDocker"
                alt="Docker"
                title="Docker"
                class="icon iconDocker"
            />
            <Icon :src="iconGit" alt="Git" title="Git" class="icon iconGit" />
            <Icon
                :src="iconJetBrains"
                alt="JetBrains"
                title="JetBrains"
                class="icon iconJetBrains"
            />
            <Icon
                :src="iconLinux"
                alt="Linux"
                title="Linux"
                class="icon iconLinux"
            />
            <Icon :src="iconEmacs" alt="Emacs" title="Emacs" class="icon" />
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
        <h3 class="subsubsectionTitle">
            Stale
            <Icon src="" />
        </h3>
        <div class="labelContainer">
            <Icon :src="iconJava" alt="Java" class="icon" />
            <Icon :src="iconCSharp" alt="C#" class="icon" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;
@import "@/assets/global.scss";

.container {
    display: flex;
    flex-direction: column;
    align-items: inherit;
    gap: 16px;
}

.labelContainer {
    @include common.labelContainer;
    margin-left: 24px;
    margin-right: 24px;
    justify-content: center;
    @include screenWidthAbove($xlarge) {
        justify-content: start;
    }
}

$iconSize: 32px;

.icon {
    width: $iconSize;
    height: $iconSize;
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
    transform: scale(2.4) translate(calc(-0.25 * #{$iconSize}));
    transform-origin: 0;
    margin-right: calc(0.125 * #{$iconSize});
}

.iconEthereum,
.iconSolana {
    @include scaledIcon(0.8);
}

.iconNginx {
    @include scaledIcon(1.8);
}
</style>
