<script setup lang="ts">
const languages = [
  { name: "English", level: "Advanced" },
  { name: "German", level: "Advanced" },
  { name: "Spanish", level: "Intermediate" },
  { name: "Bosnian", level: "Native language" },
];
</script>
<template>
  <div class="languagesPaneContainer">
    <h2 class="subsectionTitle">Languages</h2>
    <table class="languageTable">
      <tbody>
        <tr v-for="(lang, i) in languages" :key="i">
          <td>{{ lang.name }}</td>
          <td
            v-if="i === 0"
            :rowspan="languages.length"
            class="columnDelimiter"
          ></td>
          <td>
            <b>{{ lang.level }}</b>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as common;
@use "@/assets/global.scss" as global;

.languagesPaneContainer {
  line-height: 160%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;

  @include global.screenWidthAbove(global.$small) {
    @media not print {
      align-items: start;
    }
  }

  @media print {
    position: relative;
    padding: 24px;
    gap: 12px;

    @include common.beveledFrame(16px, 2px, #ccc, #f7f7f7);
  }

  .languageTable {
    position: relative;
    border-collapse: separate;
    border-spacing: 16px;

    @media print {
      border-spacing: 8px;
      margin-left: -8px;
      margin-right: -8px;
    }

    td:last-child {
      font-size: 0.9em;
    }
  }

  .columnDelimiter {
    min-width: 2px;
    max-width: 2px;
    background: rgba(var(--color-secondary-rgb), 0.6);
  }
}
</style>
