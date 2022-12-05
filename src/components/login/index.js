import Login from "./LoginRegister.vue"

export default {
    // 向外暴露install方法
    install(Vue) {
        const loginConstructor = Vue.extend({ // 使用 Vue 构造器，创建一个子类
            render(h) {
                return h(Login)
            }
        });

        let instance = new loginConstructor(); // 实例化
        this.vm = instance.$mount(document.createElement('div')) // 创建一个空的div标签并挂载到上面
        document.body.appendChild(this.vm.$el); // 挂载到全局节点

        const show = () => { // 添加方法，后面挂载到$message上
            console.log(this.vm.$el.style.opacity);
            this.vm.$el.style.opacity = 1
            this.vm.$el.style.zIndex = 999
        }

        Vue.prototype.$loginRegister = {
            show
        }
    }
}