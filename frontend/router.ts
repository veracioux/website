import {createRouter, createWebHistory} from "vue-router";

// NOTE: When a non-existent route is requested, the web server must
// return a response containing the SPA and with a 404 status code (for better SEO).
// So, whenever you add a new route here, add it to nginx.conf as well.

/**
 * Generate a regex that will match against both `path` and /stg/`path`.
 */
function path(path: string) {
    if (import.meta.env.VITE_ENVIRONMENT === "staging") {
        return `/:stg(stg/|stg)?${path}`;
    } else {
        return `/${path}`;
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: path(""),
            name: "home",
            meta: {
                title: "veracioux",
            },
            component: () => import("@/views/HomeView.vue"),
        },
        {
            path: path("cv"),
            name: "cv",
            meta: {
                title: "veracioux | CV",
            },
            component: () => import("@/views/CVView.vue"),
        },
        {
            path: path("about"),
            name: "about",
            meta: {
                title: "veracioux | About Me",
            },
            component: () => import("@/views/AboutView.vue"),
        },
        {
            path: path("contact"),
            name: "contact",
            meta: {
                title: "veracioux | Contact",
            },
            component: () => import("@/views/ContactView.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            meta: {
                title: "veracioux | Not Found",
            },
            component: () => import("@/views/404.vue"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title as string;
    next();
});

export default router;
