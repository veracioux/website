<script setup lang="ts">

</script>

<template>
    <div>
        <div class="sectionContainer">
            <svg class="titleDecorationContainer" width="100%" height="100%" viewBox="0 0 100 100"
                 preserveAspectRatio="none"
                 xmlns="http://www.w3.org/2000/svg">
                <polygon points="0,0 35,100 65,100 100,0" class="titleDecoration" />
            </svg>
            <h1 class="sectionTitle">
                <slot />
            </h1>
        </div>
    </div>
</template>

<style scoped lang="scss">
.titleDecorationContainer {
    position: absolute;
    inset: 0;
    z-index: 0;
}

.titleDecoration {
    fill: var(--color-background-2);
}

.sectionTitle {
    position: relative;
    z-index: 1;
    padding-top: 80px;
    padding-bottom: 24px;
}

.sectionContainer {
    position: relative;
}
</style>
