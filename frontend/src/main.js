import Vue from "vue";
import App from "./App.vue";

import VueKonva from "vue-konva";
import VueCompositionAPI from "@vue/composition-api";

Vue.use(VueKonva)
Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

let app = new Vue({render: h => h(App)})
app.$mount("#app")
