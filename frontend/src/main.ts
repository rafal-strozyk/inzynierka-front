import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import API from "@/helpers/api-helper";

import "@/styles/styles.scss";
import "@/styles/tailwind.css";

declare global {
  interface Window {
    API: typeof API;
  }
}
window.API = API || {};

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
