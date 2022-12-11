import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'
import MyIcon from '@/components/MyIcon.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('my-icon', MyIcon)

app.mount('#app')
