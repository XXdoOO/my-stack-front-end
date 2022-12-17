import Message from "./MessagePopup.vue"
import { createVNode, render } from 'vue'

const div = document.createElement('div')
document.body.appendChild(div)

export default (type: 'info' | 'success' | 'error' | 'warn', title: string, msg: string) => {
    const vnode = createVNode(Message, { type, title, msg })
    render(vnode, div)

    console.log(vnode);

    vnode.el.style.opacity = 1
    vnode.el.style.zIndex = 999
}