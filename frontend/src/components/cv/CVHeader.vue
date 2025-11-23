<script setup lang="ts">
import mugshot from "@/assets/mugshot.webp";
import SocialIcon from "@/components/generic/SocialIcon.vue";
import Icon from "@/components/generic/Icon.vue";
import {CvContext} from "~/inject";

const {variant} = CvContext.inject();
</script>

<template>
  <ClientOnly>
    <div class="cvHeader">
      <div class="mugshotFrame">
        <img :src="mugshot" class="mugshot" />
      </div>
      <div class="contactAndText">
        <div class="contact">
          <div class="name">Haris Gušić</div>
          <hr />
          <SocialIcon name="web" text="veracioux.me" />
          <SocialIcon name="github" text="veracioux" />
          <SocialIcon name="linkedin" text="veracioux" />
          <SocialIcon name="mail" text="hgusic.pub@gmail.com" />
          <SocialIcon name="phone" text="+387644229116" />
          <SocialIcon
            name="location"
            text="Sarajevo, Bosnia & Herzegovina"
            class="location"
          />
        </div>
        <div class="textWithFooter">
          <div>
            I am a versatile software engineer with a broad set of skills. I
            have almost a year of experience as a professional full-stack
            developer, and more than 5 years of experience as a hobby open
            source programmer. My foremost talent and professional interest is
            in finding flaws and potential improvements in existing solutions,
            writing well documented code and perfecting the art of programming
            through the invention of novel workflows.
          </div>
          <div class="footer">
            <Icon name="info" />
            <span class="text">
              An interactive online version of this resume is available
              <a
                :href="`https://veracioux.me/cv?variant=${variant}&resume=true`"
                target="_blank"
                >here</a
              >.
            </span>
          </div>
        </div>
      </div>
      <ClientOnly>
        <div class="warning">
          Warning: this page should be viewed with print mode enabled in
          developer tools.
        </div>
      </ClientOnly>
    </div>
  </ClientOnly>
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
  margin-bottom: 16px;

  padding: 24px 32px;

  @include common.beveledFrame(
    24px,
    2px,
    rgba(black, 0.4),
    var(--color-background-1)
  );

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

  .contactAndText {
    display: flex;
    gap: inherit;

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

    .textWithFooter {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 8px;

      .footer {
        line-height: 1.8;
        color: rgba(black, 0.5);

        :deep(.icon) {
          height: 1em;
          // TODO temporary fix
          transform: translateY(-4%);
        }

        .text {
          margin-left: 4px;
        }
      }
    }
  }

  :deep(.icon) {
    height: 1.2em;
    line-height: 2em;
  }

  .warning {
    font-size: 1.4em;
    color: #ef5350;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    transform: translateY(100%);
    line-height: 32px;

    @media print {
      display: none;
    }
  }
}
</style>
