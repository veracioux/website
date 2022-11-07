<template>
    <div class="languagesPaneContainer">
        <h2 class="subsectionTitle">Languages</h2>
        <table class="languageTable">
            <tr>
                <td>English</td>
                <td rowspan="0" class="columnDelimiter"></td>
                <td><b>Advanced</b> (TOEFL iBT score: 109/120, expired)</td>
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
@use "@/assets/common.module.scss" as c;

.languagesPaneContainer {
    line-height: 160%;
    display: flex;
    flex-direction: column;
    align-items: inherit;
    gap: 16px;

    @media print {
        position: relative;
        padding: 16px;

        @include c.beveledFrame(16px, 2px, #aaa, #f7f7f7);
    }

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
