<script setup lang="ts">
import {onMounted, ref} from "vue";
// noinspection ES6UnusedImports
import zindex from "@/zindex";

defineProps<{
    hideVeraciouxButton?: boolean;
}>();
const emit = defineEmits<{
    (e: "animatableVeraciouxTextMounted", element: HTMLElement): void;
}>();

const veraciouxButton = ref<HTMLElement>();
const animatableVeraciouxTextElement = ref<HTMLElement>();

onMounted(() => {
    emit(
        "animatableVeraciouxTextMounted",
        animatableVeraciouxTextElement.value!
    );
});
</script>

<template>
    <div class="navbar">
        <div class="background" />
        <div class="content">
            <div class="contentLeft">Contact</div>
            <div style="position: relative">
                <div
                    class="veracioux overlay"
                    ref="animatableVeraciouxTextElement"
                >
                    veracioux
                </div>
                <a
                    href="/#home"
                    class="veracioux"
                    :class="{hidden: hideVeraciouxButton}"
                    ref="veraciouxButton"
                >
                    veracioux
                </a>
            </div>
            <div class="contentRight">Blog</div>
        </div>
    </div>
</template>
>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;

.hidden {
    visibility: hidden;
}

.background {
    position: absolute;
    inset: 0;

    z-index: v-bind("zindex.navbarBackground");
    background: var(--color-background);
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
    inset: 0;
    color: red;
    pointer-events: none;
}

.veracioux {
    @include common.veracioux;
}

.navbar {
    position: fixed;
    max-height: 20vh;
    width: 100%;
    padding: 8px;

    font-family: monospace;
    font-size: 28px;
    text-align: center;
}

.navbar > a {
    text-decoration: none;
}
</style>
