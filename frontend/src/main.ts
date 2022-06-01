import {createApp} from "vue";
import router from "@/router";

import VueKonva from "vue-konva";
import App from "@/App.vue";

const app = createApp(App);

app.use(router);
app.use(VueKonva);

app.mount("#app");
