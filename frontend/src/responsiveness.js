export const fullWindowMixin = {
    data() {
        return {
            scrollY: 0,
            // Vertical scroll expressed as number of window heights
            relativeScrollY: 0,
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
        this.onWindowResize();
    },
    methods: {
        onScroll() {
            this.scrollY = window.scrollY
            this.relativeScrollY = window.scrollY / window.innerHeight
        }
    }
}
