import { createVNode, render } from 'vue'
import Confirm from './confirm.vue'

const div = document.createElement('div')
document.body.appendChild(div)

export default (msg: string, confirm: Function) => {
  const vnode = createVNode(Confirm, { msg, confirm })
  render(vnode, div)

  vnode.el.style.opacity = 1
  vnode.el.style.zIndex = 999
}