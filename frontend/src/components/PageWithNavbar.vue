<template>
    <div :class="s.viewportContainer">
        <slot name="navbar" :class="s.navbar">
        </slot>
        <div :class="s.content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style module="s" lang="scss">
@use "@/assets/common.module.scss" as c;
.viewportContainer {
    position: fixed;
    inset: 0;
    height: 100vh;
    width: 100%;

    .navbar {
        top: 0;
        position: sticky;
    }

    .content {
        position: relative;
        overflow: auto;
        height: 100%;
        //@include c.scrollContainer;
    }
}
</style>
<script>
import Navbar from "@/components/Navbar";
export default {
    components: {Navbar}
}
</script>