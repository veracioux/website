<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import CV from "@/components/cv/CV.vue";
import {computed} from "vue";

const props = defineProps<{
    resume?: boolean;
}>();

const title = computed(() => props.resume ? "Resume" : "Curiculum Vitae");

</script>

<template>
    <div class="section">
        <SectionTitle class="sectionTitle" :text="title" slug="cv" />
        <CV />
        <div class="overlayContainer">
            <div class="overlay top" />
            <div class="overlay bottom" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;
@import "@/assets/global.scss";
@import "@/assets/home.scss";

$colorDimText: rgba(var(--color-text-rgb), 0.7);

.section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $colorDimText;
    background: var(--color-background-2);
    width: 100vw;

    :deep(.titleText) {
        color: var(--color-text);
        z-index: 2;
    }

    :deep(.titleDecoration) {
        fill: var(--color-background-1);
    }
}

.overlayContainer {
    @include common.fillParent;
    z-index: 1;
    pointer-events: none;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .overlay {
        position: sticky;
        width: 100%;
        pointer-events: auto;

        &.top {
            top: 0;
            height: 100px;
            background: linear-gradient(
                    var(--color-background-2) 60%,
                    #00000000
            );

            @include screenWidthAbove($xlarge) {
                height: 120px;
            }
        }

        &.bottom {
            bottom: 26px;
            height: 100px;
            background: linear-gradient(
                    #00000000,
                    var(--color-background-2) 40%
            );
            // On mobile browsers we need to stretch this element downwards because
            // the element may not perfectly hug the bottom of the viewport while
            // scrolling, leaving parts of the underlying text visible.
            &::after {
                display: block;
                content: "";
                transform: translate(0, 70px);
                height: 100%;
                width: 100%;
                background: var(--color-background-2);
            }
        }
    }
}

.sectionTitle {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 2;
}
</style>
