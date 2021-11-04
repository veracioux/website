export const fullWindowMixin = {
    data() {
        return {
            fullWindowStyle: {
                height: window.innerHeight + "px"
            },
            scrollY: 0,
            // Vertical scroll expressed as number of window heights
            relativeScrollY: 0,
            windowHeight: 0,
        }
    },
    mounted() {
        window.addEventListener('resize', this.onWindowResize)
        window.addEventListener('scroll', this.onScroll)
        this.onWindowResize()
    },
    methods: {
        onWindowResize() {
            this.fullWindowStyle.height = window.innerHeight + "px"
            this.windowHeight = window.innerHeight
        },
        onScroll() {
            this.scrollY = window.scrollY
            this.relativeScrollY = window.scrollY / window.innerHeight
        }
    }
}
