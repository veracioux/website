import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";

import VueKonva from "vue-konva";
import Navbar from "@/components/Navbar.vue";
import Label from "@/components/generic/Label.vue";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
library.add(faArrowUpRightFromSquare);

const app = createApp(App);

app.use(router);
app.use(VueKonva);

app.component("Navbar", Navbar);
app.component("Label", Label);
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.mount("#app");
