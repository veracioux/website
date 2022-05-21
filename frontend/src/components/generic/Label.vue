<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
    props: {
        title: String,
    },
});
</script>

<template>
    <div :class="$style.container" :title="title">{{ title }}</div>
</template>

<style module>
.container {
    display: inline-block;
    font-size: 12px;
    border-radius: 4px;
    padding: 6px;

    background: rgba(var(--color-primary-rgb), 0.2);
    color: white;
    white-space: nowrap;
    text-overflow: ellipsis;

    user-select: none;
}

.container[title="C++"] {
    background: orange;
}
.container[title="Qt"] {
    background: orange;
}
</style>
