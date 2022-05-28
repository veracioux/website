import {createApp} from "vue";
import router from "@/router";

import VueKonva from "vue-konva";

const app = createApp({
    template: "<router-view/>",
});

app.use(router);
app.use(VueKonva);

app.mount("#app");
