<script setup lang="ts">
import SocialIcon from "@/components/generic/SocialIcon.vue";
import Icon from "@/components/generic/Icon.vue";
import { CvContext } from "@/inject";

const { variant } = CvContext.inject();

const interactiveCvUrl = new URL(`https://veracioux.me/cv`);
interactiveCvUrl.searchParams.set("resume", "true");
if (variant) {
  interactiveCvUrl.searchParams.set("variant", variant.toString());
}
</script>

<template>
  <ClientOnly>
    <div class="cvHeader">
      <div class="contactAndText">
        <div class="contact">
          <div class="name">Haris Gušić</div>
          <hr />
          <SocialIcon name="web" text="veracioux.me" />
          <SocialIcon name="github" text="veracioux" />
          <SocialIcon name="linkedin" text="veracioux" />
          <SocialIcon name="mail" text="hgusic.pub@gmail.com" />
          <SocialIcon name="phone" text="+387644229116" />
          <SocialIcon name="location" text="Munich, Germany" class="location" />
        </div>
        <div class="textWithFooter">
          <div>
            Versatile software engineer with a broad set of skills. I have
            almost a year of experience as a professional full-stack developer,
            and more than 5 years of experience as a hobby open source
            programmer. My foremost talent and professional interest is in
            finding flaws and potential improvements in existing solutions,
            writing well documented code and perfecting the art of programming
            through the invention of novel workflows.
          </div>
          <div class="footer">
            <Icon name="info" />
            <span class="text">
              An interactive online version of this resume is available
              <a :href="interactiveCvUrl.toString()" target="_blank">here</a>.
            </span>
          </div>
        </div>
      </div>
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

  .contactAndText {
    display: flex;
    gap: inherit;

    .contact {
      display: flex;
      flex-direction: column;
      min-width: 200px;

      .name {
        font-size: 1.6em;
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
}
</style>
