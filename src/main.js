import { createApp } from 'vue'
import App from './App.vue'

// A mixin for all elements that should be full-window sized
const fullWindowMixin = {
    data() {
        return {
            fullWindowStyle: {
                height: window.innerHeight
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize)
        this.onResize()
    },
    methods: {
        onResize() {
            this.fullWindowStyle.height = window.innerHeight;
        }
    }
}
fullWindowMixin;

let app = createApp(App)
app.mount('#app')
