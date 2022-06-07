<template>
    <div class="container">
        <h2 class="subsectionTitle">Languages</h2>
        <table class="languageTable">
            <tr>
                <td>English</td>
                <td rowspan="0" class="columnDelimiter"></td>
                <td>
                    <b>Advanced</b> (TOEFL iBT score:
                    109/120)
                </td>
            </tr>
            <tr>
                <td>German</td>
                <td>
                    <b>Reading and Writing</b> (intermediate),
                    <b>Speaking</b> (basic)
                </td>
            </tr>
            <tr>
                <td>Bosnian</td>
                <td><b>Native language</b></td>
            </tr>
        </table>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/global.scss";
.container {
    line-height: 160%;
    display: flex;
    flex-direction: column;
    align-items: inherit;
    gap: 16px;

    .languageTable {
        border-spacing: 16px;
    }

    .columnDelimiter {
        width: 2px;
        background: rgba(var(--color-secondary-rgb), 0.6);
    }

    .sectionTitle {
        text-align: center;
    }
}
</style>