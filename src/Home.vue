<script>
    import {
        fullWindowMixin
    } from './responsiveness'
    export default {
        name: 'Home',
        mixins: [fullWindowMixin],
        data() {
            return {
                fullHelloMessage: "Hi, I'm veracioux.",
                typedOutLength: 0,
                intervalId: 0,
                fadeableStyle: {
                    opacity: 1,
                },
            }
        },
        mounted() {
            window.addEventListener('scroll', this._onScroll)
            setTimeout(this.startTyping, 500)
        },
        methods: {
            _onScroll() {
                this.fadeableStyle.opacity = 1 - Math.min(this.relativeScrollY * 4, 1)

                let mainText = this.$refs.mainText
                mainText.style.top = - 1.5 * window.scrollY + 'px';
                if (window.scrollY >= 0.25 * window.innerHeight - mainText.offsetHeight / 2) {
                    mainText.style.position = "fixed"
                    mainText.style.top = "0"
                } else {
                    mainText.style.position = "relative"
                }
            },
            startTyping() {
                this.intervalId = setInterval(this.typeOut, 120)
            },
            typeOut() {
                ++this.typedOutLength;
                if (this.typedOutLength == this.fullHelloMessage.length) {
                    clearInterval(this.intervalId)
                }
            },
        }
    }
</script>

<template>
    <div class="home" :style="fullWindowStyle">
        <div id="hello" ref="mainText" style="white-space-collapse: discard;">
            <span class="text" :style="fadeableStyle">{{fullHelloMessage.slice(0, typedOutLength).slice(0,8)}}</span>
            <span class="text" :style="veraciouxStyle">{{fullHelloMessage.slice(8, typedOutLength).slice(0,9)}}</span>
            <span class="text" :style="fadeableStyle">{{fullHelloMessage.slice(-1, typedOutLength)}}</span>
        </div>
    </div>
</template>

<style>
 #hello {
     position: relative;
     top: 0;
     align-self: center;
     padding: 0.2em;
 }

    .home {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        text-align: center;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        color: #7c4dff;
        font-family: monospace;
        font-size: 2.5em;
        z-index: 100;
    }

 .social {
     position: fixed;
     top: 200px;
     left: 100px;
 }
</style>>
