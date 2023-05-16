import { createApp } from "vue";
import App from "./App.vue";
import HttpCheckoutGateway from "./gateway/HttpCheckoutGateway";
import AxiosAdapter from "./http/AxiosAdapter";
import FetchAdapter from "./http/FetchAdapter";

const app = createApp(App);
// const httpClient = new AxiosAdapter();
const httpClient = new FetchAdapter();
app.provide("checkoutGateway", new HttpCheckoutGateway(httpClient));
app.mount("#app");
