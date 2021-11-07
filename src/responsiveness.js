export const fullWindowMixin = {
    data() {
        return {
            fullWindowStyle: {
                height: "100vh",
                width: "100%",
            },
            scrollY: 0,
            // Vertical scroll expressed as number of window heights
            relativeScrollY: 0,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
        this.onWindowResize()
    },
    methods: {
        onScroll() {
            this.scrollY = window.scrollY
            this.relativeScrollY = window.scrollY / window.innerHeight
        }
    }
}
