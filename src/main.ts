import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'
import MyIcon from '@/components/MyIcon.vue'

import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'

import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)


VueMarkdownEditor.use(vuepressTheme, {
  Prism,
})

VMdPreview.use(vuepressTheme, {
  Prism
})

VueMarkdownEditor.use(createLineNumbertPlugin())
VueMarkdownEditor.use(createCopyCodePlugin())
VMdPreview.use(createLineNumbertPlugin())
VMdPreview.use(createCopyCodePlugin())

app.use(VueMarkdownEditor)
app.use(VMdPreview)

app.component('my-icon', MyIcon)
app.mount('#app')
