import {createApp} from "vue";
import router from "./router";

import VueKonva from "vue-konva";
import Navbar from "@/components/Navbar.vue";
import Label from "@/components/generic/Label.vue";
import SocialIcon from "@/components/generic/SocialIcon.vue";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faMonero,
} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(faArrowUpRightFromSquare);
library.add(faLinkedin, faGithub, faMonero);

const app = createApp({
    template: "<router-view/>",
});

app.use(router);
app.use(VueKonva);

app.component("Navbar", Navbar);
app.component("Label", Label);
app.component("SocialIcon", SocialIcon);
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.mount("#app");
