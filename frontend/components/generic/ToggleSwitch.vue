<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps<{
    // When true, both states are treated uniformly.
    uniformStates?: boolean;
}>();

const emit = defineEmits<{
    (e: "valueChanged", value: boolean): void;
}>();

const checked = ref(false);

</script>
<template>
    <label
        :class="[s.switch, {[s.checked]: checked, [s.uniformStates]: uniformStates}]">
        <input type="checkbox" v-bind="props" v-model="checked"
               @input="emit('valueChanged', !checked)" />
        <span
            :class="[s.slider, {[s.checked]: checked, [s.uniformStates]: uniformStates}]"
        />
    </label>
</template>
<style module="s" lang="scss">

/* The switch -  around the slider */
.switch {
    position: relative;
    display: inline-block;
    vertical-align: center;
    align-items: center;
    height: 1.6em;
    aspect-ratio: 1.8;

    background: rgba(var(--color-primary-rgb), 0.2);
    border-radius: 0.75em;

    cursor: pointer;

    &.checked, &.uniformStates {
        background: rgba(var(--color-primary-rgb), 0.5);
    }

    input {
        all: unset;
    }

    $padding: 0.2em;

    .slider {
        position: absolute;
        inset: 0;

        transition: 0.4s;

        &.checked {
            transform: translateX(100%);
        }

        &::after {
            position: absolute;
            top: $padding;
            bottom: $padding;

            transform: translateX($padding);

            border-radius: 50%;
            aspect-ratio: 1;

            background: rgba(var(--color-primary-rgb), 0.5);
            transition: 0.4s;
            content: "";
        }

        &.checked::after, &.uniformStates::after {
            background: var(--color-secondary);
        }

        &.checked::after {
            transform: translateX(calc(-100% - #{$padding}));
        }
    }

    transition: 0.4s;
}
</style>