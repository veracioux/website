import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";

import VueKonva from "vue-konva";
import Navbar from "@/components/Navbar.vue";

const app = createApp(App);

app.use(router);
app.use(VueKonva);

app.component("Navbar", Navbar);

app.mount("#app");
