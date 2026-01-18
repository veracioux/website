<script setup lang="ts">
import { NuxtPage } from "#components";
import { useServerHead, useServerSeoMeta } from "#app";
import { ScrollData } from "./inject";
import faviconUrl from "@/assets/favicon.ico";
import avatarUrl from "@/assets/avatar.webp";
import environment from "@/environment";

useServerHead({
  link: [
    {
      rel: "icon",
      href: faviconUrl,
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  meta: environment.IS_STAGING
    ? [
        {
          name: "robots",
          content: "noindex, nofollow",
        },
      ]
    : undefined,
});

useServerSeoMeta({
  title: (environment.IS_STAGING ? "(stg) " : "") + "Haris Gusic | veracioux",
  ogUrl: `https://${environment.IS_STAGING ? "stg." : ""}veracioux.me`,
  description:
    "Haris Gusic, Full-Stack Software Engineer, Polyglot Programmer, Open Source Maintainer. Explore my work or get in touch.",
  author: "Haris Gusic",
  viewport: "width=device-width, initial-scale=1",
  // OG
  ogType: "website",
  ogImage: avatarUrl,
  ogImageAlt: "Haris Gusic Avatar",
  get ogTitle() {
    return this.title;
  },
  get ogDescription() {
    return this.description;
  },
  // Twitter
  get twitterImage() {
    return this.ogImage;
  },
  get twitterImageAlt() {
    return this.ogImageAlt;
  },
  get twitterTitle() {
    return this.ogTitle;
  },
  get twitterDescription() {
    return this.ogDescription;
  },
});

ScrollData.provide();
</script>

<template>
  <NuxtPage />
</template>

<style lang="scss">
// NOTE: BUG?: Without this <style> tag and this comment, sass fails
</style>
