import Vue from 'vue';
import App from './App.vue';
import VueRouter from "./router/index.js";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: VueRouter
}).$mount('#app')
