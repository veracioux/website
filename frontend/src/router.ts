import {createRouter, createWebHistory} from "vue-router";

// NOTE: When a non-existent route is requested, the web server must
// return a response containing the SPA and with a 404 status code (for better SEO).
// So, whenever you add a new route here, add it to nginx.conf as well.

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            meta: {
                title: "veracioux",
            },
            component: () => import("@/views/HomeView.vue"),
        },
        {
            path: "/contact",
            name: "contact",
            meta: {
                title: "veracioux | Contact",
            },
            component: () => import("@/views/ContactView.vue"),
        },
        {
            path: "/cv",
            name: "cv",
            meta: {
                title: "veracioux | CV",
            },
            component: () => import("@/views/CVView.vue"),
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
