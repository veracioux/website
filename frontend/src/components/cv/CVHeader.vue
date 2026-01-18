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
    <div class="cvHeader relative flex justify-between items-start gap-5 mb-4">
      <div class="contactAndText">
        <div class="contact min-w-[192px]">
          <div class="name">Haris Gušić</div>
          <SocialIcon
            name="location"
            text="Munich, Germany"
            class="opacity-50 text-md mb-1"
          />
          <div class="flex items-center gap-2 opacity-50">
            <Icon name="passport" />
            <span>EU Blue Card (valid until 2029)</span>
          </div>
          <SocialIcon name="mail" text="me@veracioux.me" />
          <SocialIcon name="phone" text="+49 151 29984107" />
          <SocialIcon name="web" text="veracioux.me" />
          <div class="flex gap-12">
            <SocialIcon name="github" text="veracioux" />
            <SocialIcon name="linkedin" text="veracioux" />
          </div>
        </div>
        <div class="flex flex-col justify-between gap-2">
          <div class="name"></div>
          <div class="text-md">
            Versatile full-stack software engineer with 4 years of professional
            experience delivering reliable, elegant solutions in web, SaaS and
            IoT and 5+ more years of open source development. My strengths
            include adaptability, simple design, strong debugging skills and a
            keen eye for flaws and improvements. Experienced in various
            programming languages, frameworks and paradigms. I'm passionate
            about learning new technologies, improving my craft and contributing
            to open source software.
          </div>
          <div class="inline-flex items-center gap-2 text-gray-500 leading-6">
            <Icon name="info" />
            <span>
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
  align-items: flex-start;

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

      .name {
        font-size: 1.6em;
        line-height: 1.4;
      }

      hr {
        opacity: 0.4;
      }
    }
  }

  :deep(.icon) {
    height: 1.2em;
    line-height: 2em;
  }
}
</style>
