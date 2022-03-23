<script>
    import {
        fullWindowMixin
    } from './responsiveness'
    import Navbar from './components/Navbar.vue'
    import Shutter from './components/Shutter.vue'
    import Home from './Home.vue'
    import Projects from './Projects.vue'

    export default {
        name: 'App',
        mixins: [fullWindowMixin],
        components: {
            Navbar,
            Shutter,
            Home,
            Projects
        },
    }
</script>
<template>
    <div>
        <navbar id="navbar"></navbar>
        <!-- TODO: Use events for this. -->
        <img id="mugshot" :style="{filter: 'blur(' + 15 * Math.max(1 - 4 * relativeScrollY, 0) + 'px)'}" src="./assets/mugshot.jpg" />
        <div id="background" :style="fullWindowStyle" />
        <div class="home-page-space-occupant" :style="fullWindowStyle"></div>
        <div class="home-page-space-occupant" :style="fullWindowStyle"></div>
        <Shutter id="shutter"></Shutter>
        <Home id="home"></Home>
        <Projects id="projects"/>
    </div>
</template>

<style>
    html,
    body {
        background: #000;
        margin: 0;
        padding: 0;
        scroll-behavior: smooth;
    }
    /* Selectors are ordered by z-index, ascending */
    #mugshot {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;

        width: 280px;
        z-index: 5;
        transform: translate(1.5%, 3%);
    }
    @media screen and (max-width: 640px),
           screen and (max-height: 640px) {
        #mugshot {
            width: 200px;
        }
    }
    #background {
        width: 100%;
        height: 100%;
        position: fixed;
        background: #e1d8d1;;
    }
    #shutter {
        z-index: 50;
    }
    #home {
        z-index: 60;
    }
    #projects {
        z-index: 70;
        background: orange;
        position: relative;
    }
    #navbar {
        z-index: 100;
    }
</style>
