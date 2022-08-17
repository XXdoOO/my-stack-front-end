import Vue from 'vue';
import App from './App.vue';
import VueRouter from "./router/index.js";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

Vue.prototype.axios = axios;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: VueRouter
}).$mount('#app')
