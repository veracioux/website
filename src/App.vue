<script>
    export default {
        name: 'App',
        components: {},
        data() {
            return {
                sectionStyle: {
                    height: window.innerHeight + "px",
                },
                oldWindowSize: window.innerHeight
            }
        },
        mounted() {
            window.addEventListener('resize', this.onResize)
            this.onResize()
        },
        methods: {
            onResize() {
                this.sectionStyle.height = window.innerHeight + "px"
                window.scrollBy(0, Math.min(window.innerHeight - this.oldWindowSize, 0))
                this.oldWindowSize = window.innerHeight
            }
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
    <img id="mugshot" src="./assets/mugshot.jpg" />
    <div id="home" :style="sectionStyle">
        Home
    </div>
    <div id="about" :style="sectionStyle">About</div>
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
        z-index: 10;
    }

    #about {
        background-color: red;
        height: 3000px;
    }

    #mugshot {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 12em;
        z-index: 5;
    }
</style>
