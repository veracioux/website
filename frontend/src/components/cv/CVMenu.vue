<script setup lang="ts">
import Icon from "@/components/generic/Icon.vue";
import ToggleSwitch from "@/components/generic/ToggleSwitch.vue";
import { ref } from "vue";
import { useRoute } from "#app";
import { type DisplayMode } from "@/cv";

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
  <aside class="cvMenuRoot">
    <!-- Ensures that align-items: space-between will take effect. -->
    <div></div>
    <div class="footer">
      <a
        v-if="variant"
        :href="`/documents/cv-${variant}.pdf`"
        :download="`Haris_Gusic_${resume ? 'Resume' : 'CV'}.pdf`"
        class="download"
      >
        <Icon name="download" class="icon" />
        Download
      </a>
      <span class="displayMode">
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
.cvMenuRoot {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 0.3em;
  height: 4em;

  user-select: none;
}

.footer {
  display: flex;
  align-items: center;
  gap: 24px;
}

.download {
  color: var(--color-text);

  &:hover {
    color: var(--color-primary);

    .icon {
      color: var(--color-primary);
    }
  }
}

.displayMode {
  background: rgba(var(--color-secondary-rgb), 0.06);
  border-radius: 0.5em;
  padding: 0.3em 0.6em;

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
  color: var(--color-secondary);
  width: 1.6em;
  height: 1.6em;
  margin-right: 6px;
}
</style>
