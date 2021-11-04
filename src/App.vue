<script>
    import {
        fullWindowMixin
    } from './responsiveness'
    import Shutter from './components/Shutter.vue'
    import Home from './Home.vue'

    export default {
        name: 'App',
        mixins: [fullWindowMixin],
        components: {
            Shutter,
            Home,
        },
    }
</script>
<!-- TODO Remember to use position: sticky -->
<template>
    <div>
        <img id="mugshot" src="./assets/mugshot.jpg" />
        <div id="about" :style="fullWindowStyle">About</div>
        <div id="about" :style="fullWindowStyle">About</div>
        <div id="about" :style="fullWindowStyle">About</div>
        <Shutter id="shutter"></Shutter>
        <Home></Home>
    </div>
</template>

<style>
    html,
    body {
        height: 100%;
        width: 100%;
        background-color: #e1d8d1;
        margin: 0;
        padding: 0;
    }

    #mugshot {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 15%;
        z-index: 5;
        transform: translate(1.5%, 3%);
    }
</style>
