import Vue from 'vue';
import App from './App.vue';
import router from "./router/index.js";
import store from "./store/index.js"
import Highlight from './assets/js/highlight'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Message from "./components/message"
import Confirm from "./components/confirm"
import util from "./assets/js/util"
import MyButton from '@/components/MyButton.vue'


Vue.use(Confirm)
Vue.use(Message)
Vue.use(ElementUI)
Vue.use(Highlight)

Vue.component('MyButton', MyButton)

Vue.config.productionTip = false

Vue.prototype.util = util

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')