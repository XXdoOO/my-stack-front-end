import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import 

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
