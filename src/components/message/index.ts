import Message from "./MessagePopup.vue"
import { createVNode, render } from 'vue'

const div = document.createElement('div')
document.body.appendChild(div)

interface Props {
    type: 'info' | 'success' | 'error' | 'warn',
    message: string
}

export default (props: Props) => {
    const vnode = createVNode(Message, { ...props })
    render(vnode, div)

    console.log(vnode);

    vnode.el.style.opacity = 1
    vnode.el.style.zIndex = 999
}