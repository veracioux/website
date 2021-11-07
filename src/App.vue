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
        <img id="mugshot" src="./assets/mugshot.jpg" />
        <div id="home-page" :style="fullWindowStyle"></div>
        <div id="about" :style="fullWindowStyle">About</div>
        <div id="about" :style="fullWindowStyle">About</div>
        <shutter id="shutter"></shutter>
        <home id="home"></home>
    </div>
</template>

<style>
    html,
    body {
        height: 100%;
        width: 100%;
        background-color: #e1d8d1 !important;
        margin: 0;
        padding: 0;
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
