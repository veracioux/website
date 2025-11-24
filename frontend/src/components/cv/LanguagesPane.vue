<template>
  <div class="languagesPaneContainer">
    <h2 class="subsectionTitle">Languages</h2>
    <table class="languageTable">
      <tbody>
        <tr>
          <td>English</td>
          <td rowspan="0" class="columnDelimiter"></td>
          <td>
            <b>Advanced</b><br />
            <span style="white-space: nowrap"
              >(TOEFL iBT score: 109/120, expired)</span
            >
          </td>
        </tr>
        <tr>
          <td>German</td>
          <td>
            <b>Reading and Writing</b> (intermediate),<br />
            <span style="white-space: nowrap"><b>Speaking</b> (basic)</span>
          </td>
        </tr>
        <tr>
          <td>Bosnian</td>
          <td><b>Native language</b></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/common.module.scss" as c;

.languagesPaneContainer {
  line-height: 160%;
  display: flex;
  flex-direction: column;
  align-items: inherit;
  gap: 1em;

  @media print {
    position: relative;
    padding: 24px;
    align-items: center;
    gap: 12px;

    @include c.beveledFrame(16px, 2px, #ccc, #f7f7f7);
  }

  .languageTable {
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
