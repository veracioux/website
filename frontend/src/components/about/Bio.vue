<script setup lang="ts">
import Pager from "@/components/about/Pager.vue";
defineProps<{
  progress: number;
}>();
</script>

<template>
  <Pager class="bio" :progress="progress">
    <div>
      Hi, I'm Haris.
      <br /><br />
      I'm a programmer, engineer, and tinkerer. Since I was a kid I've had a
      fascination with science and engineering. The first time I ran a computer
      program, I immediately wanted to create my own. I got started programming
      by making Minecraft mods in Java when I was about 12.
      <br /><br />
      In high school I discovered C++ and fell in love with it. I bought an
      Arduino and played with it endlessly. I used it in an
      <a
        href="https://github.com/veracioux/rotating-led-display"
        target="_blank"
        >interesting little project</a
      >. <br /><br />
      I also made a
      <a href="https://github.com/veracioux/wood-fall" target="_blank"
        >2D Android game</a
      >
      in Unity. That was fun, though looking back I'm a little embarrassed by
      some stylistic choices.
      <br /><br />
      Then came college. I got a Bachelor's degree in Automation and
      Electronics. During that time I fell out of programming due to focusing on
      my studies. But I rediscovered it again in my third year and decided to
      take my career in that direction.
      <br /><br />
      Around that time I switched to Linux and learned a great deal about it. I
      enhanced my workflow with powerful and esoteric tools like
      <a href="https://github.com/veracioux/dotfiles" target="_blank"
        >vim, emacs, tiling window managers and I made the terminal my cozy new
        home</a
      >. I have been
      <a href="https://github.com/veracioux" target="_blank"
        >actively contributing</a
      >
      to open source projects since then.
      <br /><br />
      In 2021 I was invited to be a maintainer in a popular project called
      <a href="https://github.com/flameshot-org/flameshot" target="_blank">
        Flameshot</a
      >, and I accepted, serving in that function for a few years. It was also
      that year that I started working at Evolt. There, I worked on various
      web-related projects and hugely improved my full-stack skills. At the end
      of 2022, I got the opportunity to start at
      <a href="https://www.enocean.com/" target="_blank">EnOcean</a>, an IoT
      company. During my time there, I worked on a handful of projects, in a
      wide variety of technologies, including Java/Spring Boot, Angular,
      TypeScript, NestJS, Python, Go, Redis, PostgreSQL and more. <br /><br />
      While at EnOcean, at some point I took a break from open source
      contributions due to personal reasons. In the middle of 2025, aided with
      all the progress made in the field of AI, I decided to get back into it.
      Since then, I've become as active as ever, and some of my most important
      contributions are to
      <a href="https://opencode.ai/" target="_blank">opencode</a>, an awesome
      terminal AI agent that I use heavily.
    </div>
  </Pager>
</template>
<style scoped lang="scss">
.bio {
  max-width: 600px;
  text-align: justify;
}
// TODO
// a {
//   white-space: normal;
//   word-break: normal;
//   text-wrap: wrap;
// }
</style>
