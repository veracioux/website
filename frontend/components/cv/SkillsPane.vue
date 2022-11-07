<script setup lang="ts">
import Label from "@/components/generic/Label.vue";
import Icon from "@/components/generic/Icon.vue";
import {skills, skillGroups} from "@/cv";
import iconDocker from "assets/icons/docker.svg";
import iconGit from "assets/icons/git-with-text.svg";
import iconJetBrains from "assets/icons/jetbrains.svg";
import iconLinux from "assets/icons/linux.svg";
import iconEmacs from "assets/icons/emacs.svg";

const props = defineProps<{
    variant?: "1";
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
    jetbrains: "iconJetBrains",
    linux: "iconLinux",
    emacs: "iconEmacs",
};

</script>
<template>
    <div class="skillsPaneRoot">
        <h2 class="subsectionTitle" style="margin-top: 0">Skills</h2>
        <template v-for="group of skillGroups">
            <template v-if="!group.disabled">
                <h3 class="subsubsectionTitle">{{ group.name }}</h3>
                <div class="labelContainer">
                    <template
                        v-for="[key, {icon, name}] of
                        Object.entries(skills).filter(([_, skill]) => skill.group === group && !skill.disabled)"
                    >
                        <Icon
                            v-if="icon"
                            :src="icon"
                            :alt="name"
                            :title="name"
                            :class="`icon ${extraClasses[key] ?? ''}`"
                        />
                        <Label v-else :title="name" />
                    </template>
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

    --icon-scale-multiplier: 1;

    @media print {
        position: relative;
        padding: 16px;

        --icon-scale-multiplier: 0.8;

        @include common.beveledFrame(16px, 2px, rgba(black, 0.3), #f7f7f7);
    }
}

.subsubsectionTitle {
    @media print {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }
}

.labelContainer {
    @include common.labelContainer;
    margin-left: 24px;
    margin-right: 24px;
    justify-content: center;

    @media print {
        margin-left: 12px;
        margin-right: 12px;
    }

    @include screenWidthAbove($xlarge) {
        justify-content: flex-start;
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
    transform: scale(2);
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
    --icon-scale-multiplier: 0.6;
}

.iconJetBrains {
    $scale: calc(2.4 * var(--icon-scale-multiplier));
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
