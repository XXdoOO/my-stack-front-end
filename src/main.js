import Vue from 'vue';
import App from './App.vue';
import router from "./router/index.js";
import store from "./store/index.js"
import Highlight from './assets/js/highlight'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Message from "./components/message"
import Login from "./components/login"


Vue.use(Login);
Vue.use(Message);
Vue.use(ElementUI);
Vue.use(Highlight);
Vue.config.productionTip = false

window.vm = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
