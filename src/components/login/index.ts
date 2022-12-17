import Login from "./LoginRegister.vue"
import { createVNode, render } from 'vue'

const div = document.createElement('div')
document.body.appendChild(div)

export default () => {
    const vnode = createVNode(Login)
    render(vnode, div)

    vnode.el.style.opacity = 1
    vnode.el.style.zIndex = 999
}