<script setup lang="ts">
import {ref} from "vue";

const veraciouxButton = ref<HTMLElement>();
</script>

<template>
    <div class="navbar">
        <a href="/#home" class="veracioux" ref="veraciouxButton"> veracioux </a>
    </div>
</template>
>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;
.veracioux {
    @include common.veracioux;
}
.navbar {
    position: fixed;
    top: 0;
    max-height: 20vh;
    width: 100%;
    padding: 8px;

    font-family: monospace;
    font-size: 28px;
    text-align: center;

    background: var(--color-background);
    filter: drop-shadow(0 0 3px rgba(var(--color-primary-rgb), 0.8));
}

.navbar > a {
    text-decoration: none;
}
</style>
