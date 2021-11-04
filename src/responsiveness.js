// TODO see if I can make this work
// A mixin for all elements that should be full-window sized
export const fullWindowMixin = {
    data() {
        return {
            fullWindowStyle: {
                height: window.innerHeight + "px"
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.onWindowResize)
        this.onWindowResize()
    },
    methods: {
        onWindowResize() {
            this.fullWindowStyle.height = window.innerHeight + "px"
        }
    }
}
