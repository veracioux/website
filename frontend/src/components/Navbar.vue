<script setup lang="ts">
import {onMounted, ref, reactive} from "vue";
import _zindex from "@/zindex";

const zindex = reactive(_zindex);

const emit = defineEmits<{
    (e: "animatableVeraciouxTextElementMounted", element: HTMLElement): void;
}>();

const veraciouxButton = ref<HTMLElement>();
const animatableVeraciouxTextElement = ref<HTMLElement>();

onMounted(() => {
    emit(
        "animatableVeraciouxTextElementMounted",
        animatableVeraciouxTextElement.value!
    );
});
</script>

<template>
    <div class="navbar">
        <div class="background" />
        <div class="content">
            <div class="contentLeft"></div>
            <div style="position: relative">
                <a href="/" class="veracioux" ref="veraciouxButton">
                    veracioux
                </a>
                <div
                    class="veracioux overlay"
                    ref="animatableVeraciouxTextElement"
                >
                    veracioux
                </div>
            </div>
            <div class="contentRight"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;
@import "@/assets/global.scss";

.background {
    @include c.fillParent;

    z-index: v-bind("zindex.navbarBackground");
    background: var(--color-background-0);
    filter: drop-shadow(0 0 3px rgba(var(--color-primary-rgb), 0.8));
}

.content {
    position: relative;
    display: flex;
    gap: 24px;

    width: 100%;
    z-index: v-bind("zindex.navbarContent");
    user-select: none;

    .contentLeft,
    .contentRight {
        display: flex;
        width: 100%;
        gap: inherit;
    }

    .contentLeft {
        justify-content: right;
    }

    .contentRight {
        justify-content: left;
    }
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}

.veracioux {
    @include c.veracioux;
}

a.veracioux {
    opacity: 0;
}

.navbar {
    position: relative;
    display: flex;
    align-items: center;
    height: $navbarHeight;

    font-family: $monospace;
    font-size: 2em;
    text-align: center;
    z-index: v-bind("zindex.navbar");
}

.navbar > a {
    text-decoration: none;
}
</style>
