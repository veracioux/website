<script setup lang="ts">
import GlitchedWriter from "vue-glitched-writer";
import { ref } from "vue";
import PageWithNavbar from "./components/PageWithNavbar.vue";

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
  <PageWithNavbar>
    <div
      class="h-full flex flex-col gap-4 items-center justify-center text-[var(--color-secondary)] font-mono"
    >
      <GlitchedWriter
        class="text-9xl"
        text="404"
        :queue="{ steps: 2, interval: 8, delay: 10 }"
        appear
      />
      <div class="h-16">
        <div v-for="(phrase, i) of phrases" :key="i">
          <GlitchedWriter
            v-if="activePhraseId === i"
            class="text-3xl h-16"
            :text="phrase"
            :queue="{ interval: 100 }"
            @finish="incrementActivePhrase"
            appear
          />
        </div>
      </div>
    </div>
  </PageWithNavbar>
</template>
