<script setup lang="ts">
import {ref} from "vue";

const veraciouxButton = ref<HTMLElement>();
</script>

<template>
    <div class="navbar">
        <a
            href="/#home"
            style="color: var(--color-primary)"
            ref="veraciouxButton"
        >
            veracioux
        </a>
    </div>
</template>
>

<style scoped lang="scss">
.navbar {
    position: fixed;
    top: 0;
    max-height: 20vh;
    width: 100%;
    padding: 8px;

    font-family: monospace;
    font-size: 28px;
    text-align: center;

    background: black;
    filter: drop-shadow(0 0 3px rgba(var(--color-primary-rgb), 0.5));

    pointer-events: all;
}

.navbar > a {
    text-decoration: none;
}
</style>
