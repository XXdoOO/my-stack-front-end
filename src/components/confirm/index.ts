import { createVNode, render } from 'vue'
import Confirm from './confirm.vue'

const confirm = (app, props) => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const vnode = createVNode(Confirm, props)
  render(vnode, div)

  $vm.$el.style.opacity = 1
  $vm.$el.style.zIndex = 999
}
export default confirm