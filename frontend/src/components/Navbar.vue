<script>
    export default {
        name: "Navbar",
        data() {
            return {

            }
        }
    }
</script>>

<template>
    <div class="navbar">
        <!-- Make the scroll smooth -->
        <a href="#home-page" style="color: #7c4dff;">
            veracioux
        </a>
    </div>
</template>>

<style>
    .navbar {
        position: fixed;
        top: 0;
        height: 32dp;
        max-height: 20vh;
        width: 100%;
        padding: 0.2em;

        font-family: monospace;
        font-size: 2.5em;
        text-align: center;

        background: black;
        filter: drop-shadow(0 0 3px #7c4dff55);

        pointer-events: all;
    }

    .navbar>a {
        text-decoration: none;
    }
</style>
