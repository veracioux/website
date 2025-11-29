<script setup lang="ts">
import Icon from "@/components/generic/Icon.vue";
import ToggleSwitch from "@/components/generic/ToggleSwitch.vue";
import { ref } from "vue";
import { useRoute } from "#app";
import { type DisplayMode } from "@/cv";
import zindex from "@/zindex";

const { resume, variant } = useRoute().query;

const emit = defineEmits<{
  (e: "displayModeChanged", value: DisplayMode): void;
}>();

const displayMode = ref<DisplayMode>("timeline");

function onToggleChanged(value: boolean) {
  displayMode.value = value ? "byCategory" : "timeline";
  emit("displayModeChanged", displayMode.value);
}
</script>

<template>
  <aside
    class="flex flex-col justify-between items-center pb-2 h-20 select-none"
  >
    <!-- Ensures that align-items: space-between will take effect. -->
    <div></div>
    <div class="flex items-center gap-6">
      <a
        v-if="variant"
        :href="`/documents/cv-${variant}.pdf`"
        :download="`Haris_Gusic_${resume ? 'Resume' : 'CV'}.pdf`"
        class="button"
      >
        <Icon name="download" class="icon" />
        Download
      </a>
      <span class="backdrop" :style="{ zIndex: zindex.cvMenu }">
        <ToggleSwitch
          uniform-states
          @valueChanged="onToggleChanged"
          class="switch"
        />
        Display mode:
        <span class="displayModeValue">
          {{ displayMode === "timeline" ? "Timeline" : "By category" }}
        </span>
      </span>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  color: var(--color-text);
  cursor: pointer;

  &:hover {
    color: var(--color-primary);

    .icon {
      color: var(--color-primary);
    }
  }
}

.backdrop {
  background: rgba(var(--color-secondary-rgb), 0.06);
  border-radius: 0.5em;
  padding: 0.3em 0.6em;
  padding-left: 1.5em;

  display: inline-flex;
  gap: 8px;
  align-items: center;

  color: var(--color-text-pale);

  .displayModeValue {
    width: 5.6em;
    color: var(--color-text);
  }
}

.icon {
  display: inline-flex;
  align-items: center;
  color: var(--color-secondary);
  height: 1.8em;
  aspect-ratio: 1;
}
</style>
