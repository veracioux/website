<script>
    import {
        fullWindowMixin
    } from './responsiveness'
    import Navbar from './components/Navbar.vue'
    import Shutter from './components/Shutter.vue'
    import Home from './Home.vue'

    export default {
        name: 'App',
        mixins: [fullWindowMixin],
        components: {
            Navbar,
            Shutter,
            Home,
        },
    }
</script>
<template>
    <div>
        <navbar id="navbar"></navbar>
        <!-- TODO: Use events for this. -->
        <img id="mugshot" :style="{filter: 'blur(' + 15 * Math.max(1 - 4 * relativeScrollY, 0) + 'px)'}" src="./assets/mugshot.jpg" />
        <div id="home-page" :style="fullWindowStyle"></div>
        <div id="about" :style="fullWindowStyle">About</div>
        <Shutter id="shutter"></Shutter>
        <Home id="home"></Home>
    </div>
</template>

<style>
    html,
    body {
        background-color: #e1d8d1;
        margin: 0;
        padding: 0;
        scroll-behavior: smooth;
    }

    #navbar {
        z-index: 100;
    }
    #shutter {
        z-index: 50;
    }
    #home {
        z-index: 60;
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
