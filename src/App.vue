<script>
    import {
        fullWindowMixin
    } from './responsiveness'
    import Shutter from './components/Shutter.vue'

    export default {
        name: 'App',
        mixins: [fullWindowMixin],
        components: {
            Shutter
        },
    }
    document.addEventListener('scroll', function(e) {
        e;
        let all = document.querySelectorAll('.hello');
        for (let h in all) {
            all[h].textContent = window.scrollY
        }
    })
</script>
<!-- TODO Remember to use position: sticky -->
<template>
    <div>
        <img id="mugshot" src="./assets/mugshot.jpg" />
        <div id="about" :style="fullWindowStyle">About</div>
        <Shutter></Shutter>
        <div id="home" :style="fullWindowStyle">
        </div>
    </div>
</template>

<style>
    html,
    body {
        height: 100%;
        width: 100%;
        background-color: black;
        margin: 0;
        padding: 0;
    }

    #home {
        position: relative;
        display: flex;
        text-align: center;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        color: white;
        background-color: #202020;
        z-index: 0;
    }

    #about {
        background-color: #202020;
        height: 3000px;
    }

    #mugshot {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 18em;
        z-index: 5;
        transform: translateY(2em);
    }
</style>
