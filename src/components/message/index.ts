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

    vnode.el.style.opacity = 1
    vnode.el.style.zIndex = 999

    const timer = setTimeout(() => {
        vnode.el.style.opacity = '0'
        vnode.el.style.zIndex = '-1'

        clearTimeout(timer)
    }, 3000)
}