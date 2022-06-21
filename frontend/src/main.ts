import {createApp} from "vue";
// For some reason using "@/router" here doesn't work. It's not a roadblock,
// but it's weird
import router from "./router";

import VueKonva from "vue-konva";
import VueLazyload from "vue-lazyload";
import App from "@/App.vue";

const app = createApp(App);

app.use(router);
app.use(VueKonva);
app.use(VueLazyload);

app.mount("#app");
