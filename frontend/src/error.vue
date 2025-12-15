<script setup lang="ts">
import GlitchedWriter from "vue-glitched-writer";
import { computed, ref } from "vue";
import PageWithNavbar from "./components/PageWithNavbar.vue";
import { ClientOnly } from "#components";
import { ScrollData } from "./inject";
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const status = computed(() => {
  return props.error.statusCode ?? 500;
});

ScrollData.provide();

const phrases = computed(() => [
  status.value === 404 ? "Not Found" : "Something went wrong",
  "Are you lost?",
  "Why are you still here?",
  status.value === 404 ? "Not Found" : "Something went wrong",
]);
const activePhraseId = ref(0);

function incrementActivePhrase() {
  setTimeout(() => {
    if (activePhraseId.value != phrases.value.length - 1)
      activePhraseId.value++;
  }, 3000);
}
</script>

<template>
  <PageWithNavbar>
    <div
      class="h-full flex flex-col gap-4 items-center justify-center text-[var(--color-secondary)] font-mono"
    >
      <ClientOnly>
        <GlitchedWriter
          class="text-9xl"
          :text="status.toString()"
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
      </ClientOnly>
    </div>
  </PageWithNavbar>
</template>
