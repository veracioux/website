<script setup lang="ts">
import mugshot from "@/assets/mugshot.webp";
import SocialIcon from "@/components/generic/SocialIcon.vue";


</script>

<template>
    <div class="cvHeader">
        <div class="mugshotFrame">
            <img :src="mugshot" class="mugshot" />
        </div>
        <div class="contact">
            <div class="name">Haris Gušić</div>
            <hr />
            <SocialIcon name="web" text="veracioux.me" />
            <SocialIcon name="github" text="veracioux" />
            <SocialIcon name="linkedin" text="veracioux" />
            <SocialIcon name="mail" text="hgusic.pub@gmail.com" />
            <SocialIcon name="phone" text="+387644229116" />
            <SocialIcon name="location" text="Sarajevo, Bosnia & Herzegovina"
                        class="location"
            />
        </div>
        <div class="textWithFooter">
            <div class="text">
                I am a versatile software engineer with a broad set of skills. I
                have almost a year of experience as a professional full-stack
                developer, and more than 5 years of experience as a hobby open
                source programmer. My foremost talent and professional interest
                is in finding flaws and potential improvements in existing
                solutions, writing well documented code and perfecting the art
                of programming through the invention of novel workflows.
            </div>
            <div class="footer">
                An interactive version of this resume is available <a href="https://veracioux.me/cv?variant=1" target="_blank">here</a>.
            </div>
        </div>
        <div class="titleContainer">
            <svg
                class="titleDecorationContainer"
                viewBox="-2 -2 104 104"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <polygon
                    vector-effect="non-scaling-stroke"
                    points="0,50 20,80 80,80 100,50 80,20 20,20 0,50"
                    class="titleDecoration"
                />
            </svg>
            <div class="titleSubtitle">
                <div class="title">Resume</div>
                <div class="subtitle">Enocean</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;

.cvHeader {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    overflow: visible;

    padding: 24px 32px;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: black;
        @include common.beveledEdges(24px);
        z-index: 0;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 2px;
        background: var(--color-background-1);
        @include common.beveledEdges(23px);
        z-index: 0;
    }

    > * {
        position: relative;
        z-index: 1;
    }

    .mugshotFrame {
        $frameWidth: 3px;
        $edgeWidth: 10px;

        height: 170px;
        display: inline-flex;
        padding: $frameWidth;
        background: #666666;

        @include common.beveledEdges($edgeWidth);

        .mugshot {
            width: auto;
            height: 100%;
            @include common.beveledEdges($edgeWidth * 0.8);
        }
    }

    .contact {
        display: flex;
        flex-direction: column;
        min-width: 200px;

        .name {
            font-size: 2em;
            line-height: 1.4;
        }

        hr {
            opacity: 0.4;
        }

        .location {
            opacity: 0.6;
        }
    }

    :deep(.icon) {
        vertical-align: middle;
        width: 1.5em;
        height: auto;
        line-height: 1.8;
    }

    .footer {
        margin-top: 14px;
        color: rgba(black, 0.5);
    }

    .titleContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        transform: translate(-50%, calc(50% - 1px));
        left: 50%;
        bottom: 0;
        width: 280px;
        height: 120px;

        .titleDecorationContainer {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;

            .titleDecoration {
                stroke: var(--color-primary);
                stroke-width: 2;
                fill: #f7f7f7;
            }
        }

        .titleSubtitle {
            z-index: 1;
            text-align: center;

            .title {
                font-size: 2.6em;
                line-height: 1.16;
            }

            .subtitle {
                opacity: 0.5;
                font-size: 1.2em;
            }
        }
    }
}
</style>