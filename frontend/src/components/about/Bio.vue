<script setup lang="ts">
import Pager from "@/components/about/Pager.vue";
defineProps<{
    progress: number
}>();
</script>

<template>
    <Pager class="bio" :progress="progress">
        <div>
            Hi, I'm Haris. I'm a programmer, engineer, and
            creator of wonderful things. Since I was a kid
            I've had a fascination with science and
            engineering. The first time I ran a computer
            program, I immediately wanted to create my own.
            I got started programming by making Minecraft
            mods in Java when I was about 12.
            <br /><br />
            In high school I discovered C++ and fell in love
            with it. I bought an Arduino and played with it
            endlessly. I used it in an
            <a
                href="https://github.com/veracioux/rotating-led-display"
                target="_blank"
            >interesting little project</a
            >. <br /><br />
            I also made a
            <a
                href="https://github.com/veracioux/wood-fall"
                target="_blank"
            >2D Android game</a
            >
            in Unity. That was fun, though looking back I'm
            a little embarrassed by some stylistic choices.
            <br /><br />
            Then came college. I got a Bachelor's degree in
            Automation and Electronics. During that time I
            fell out of programming due to focusing on my
            studies. But I rediscovered it again in my third
            year and decided to take my career in that
            direction.
            <br /><br />
            Around that time I switched to Linux and learned
            a great deal about it. I enhanced my workflow
            with powerful and esoteric tools like
            <a
                href="https://github.com/veracioux/dotfiles"
                target="_blank"
            >vim, emacs, tiling window managers and I
                made the terminal my cozy new home</a
            >. I have been
            <a
                href="https://github.com/veracioux"
                target="_blank"
            >actively contributing</a
            >
            to open source projects, mainly original
            projects but also to an established popular
            project called
            <a
                href="https://github.com/flameshot-org/flameshot"
                target="_blank"
            >Flameshot</a
            >.
        </div>
    </Pager>
</template>
<style scoped lang="scss">
.bio {
    max-width: 600px;
    text-align: justify;
}
</style>