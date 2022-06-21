<script setup lang="ts">
import GlitchedWriter from "vue-glitched-writer";
import {ref} from "vue";
import Navbar from "@/components/Navbar.vue";

const phrases = [
    "Not Found",
    "Are you lost?",
    "Why are you still here?",
    "Not Found",
];
const activePhraseId = ref(0);

function incrementActivePhrase() {
    setTimeout(() => {
        if (activePhraseId.value != phrases.length - 1) activePhraseId.value++;
    }, 3000);
}
</script>

<template>
    <Navbar />
    <div class="container">
        <div class="content">
            <GlitchedWriter
                class="number"
                text="404"
                :queue="{steps: 2, interval: 10, delay: 10}"
                appear
            />
            <div style="height: 64px">
                <div v-for="(phrase, i) of phrases" :key="i">
                    <GlitchedWriter
                        v-if="activePhraseId === i"
                        class="notFound"
                        :text="phrase"
                        :queue="{interval: 100}"
                        @finish="incrementActivePhrase"
                        appear
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/global.scss";
.container {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        font-family: monospace;
        color: var(--color-secondary);

        .number {
            font-size: 80px;
        }

        .notFound {
            font-size: 48px;
            height: 64px;
            vertical-align: middle;
        }
    }
}
</style>
