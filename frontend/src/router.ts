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
            component: () => import("@/views/HomeView.vue"),
        },
        {
            path: "/contact",
            name: "contact",
            component: () => import("@/views/ContactView.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: () => import("@/views/404.vue"),
        },
    ],
});

export default router;
