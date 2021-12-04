<script>
    import {
        fullWindowMixin
    } from './responsiveness'
    export default {
        name: 'Home',
        mixins: [fullWindowMixin],
        data() {
            return {
                texts: [
                    "Hi, I'm veracioux.",
                    "Programmer",
                    "Engineer",
                    "Tinkerer",
                ],
                typedOutLength: 0,
                state: 0,
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
                let hello = this.$refs.hello
                let traits = this.$refs.traits

                this.fadeableStyle.opacity = 1 - Math.min(this.relativeScrollY * 5, 1)

                if (this.fadeableStyle.opacity == 0) {
                    hello.style.opacity = 0;
                } else {
                    hello.style.opacity = 1;
                }

                if (window.scrollY >= 0.25 * window.innerHeight - hello.offsetHeight / 2) {
                    hello.style.position = "fixed"
                    traits.style.position = "fixed"
                    hello.style.top = "0"
                    traits.style.bottom = "0"
                } else {
                    hello.style.position = "relative"
                    traits.style.position = "relative"
                    hello.style.top = -1.5 * window.scrollY + 'px';
                    traits.style.bottom = -1.5 * window.scrollY + 'px';
                }
            },
            startTyping() {
                this.intervalId = setInterval(this.typeOut, 120)
                this.typeOut()
            },
            typeOut() {
                ++this.typedOutLength;
                // Adjust this value heuristically
                if (this.typedOutLength === 30) {
                    clearInterval(this.intervalId)
                }
            },
        }
    }
</script>

<template>
    <div class="home" :style="fullWindowStyle">
        <div id="hello" ref="hello" style="white-space-collapse: discard;">
            <span :style="fadeableStyle">{{texts[0].slice(0, typedOutLength).slice(0,8)}}</span>
            <span ref="veracioux" :style="veraciouxStyle">{{texts[0].slice(8, typedOutLength).slice(0,9)}}</span>
            <span :style="fadeableStyle">{{texts[0].slice(-1, typedOutLength)}}</span>
        </div>
        <div id="traits" ref="traits">
            <div class="trait" id="programmer" style="align-items: flex-start;">
                <div class="dummy">Programmer</div>
                <div>{{texts[1].slice(0, Math.max(typedOutLength - texts[0].length, 0))}}</div>
            </div>
            <div class="trait" id="engineer" style="align-items: flex-end;">
                <div class="dummy">Engineer</div>
                <div>{{texts[2].slice(0, Math.max(typedOutLength - texts[0].length, 0))}}</div>
            </div>
            <div class="trait" id="tinkerer" style="align-items: flex-start;">
                <div class="dummy">Tinkerer</div>
                <div>{{texts[3].slice(0, Math.max(typedOutLength - texts[0].length, 0))}}</div>
            </div>
        </div>
    </div>
</template>

<style>
    #hello {
        position: relative;
        top: 0;
        justify-self: end;
        padding: 0.2em;
    }

    #traits {
        position: relative;
        bottom: 0;
        padding-top: 4em;
        padding-bottom: 1em;
        justify-self: end;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;


        font-size: 0.8em;
        opacity: 0.5;
    }

    .trait {
        display: flex;
        flex-direction: column;
        min-height: 1em;
        max-height: 1em;
    }

    .dummy {
        opacity: 0;
        height: 0;
    }

    .home {
        position: fixed;
        top: 0;
        left: 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        color: #7c4dff;
        font-family: monospace;
        font-size: 2.5em;
    }

    /* TODO dummy */
    .social {
        position: fixed;
        top: 200px;
        left: 100px;
    }
</style>>
