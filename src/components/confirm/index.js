import Confirm from "./ConfirmPopup.vue"

export default {
  // 向外暴露install方法
  install(Vue) {
    function show(props) { // 添加方法，后面挂载到$message上
      const messageConstructor = Vue.extend({ // 使用 Vue 构造器，创建一个子类
        render(h) {
          return h(Confirm, {
            props: { ...props } // 将通过this.$message.show传进来的props传入组件中
          })
        }
      });
      let instance = new messageConstructor(); // 实例化

      this.vm = instance.$mount(document.createElement('div')) // 创建一个空的div标签并挂载到上面
      document.body.appendChild(this.vm.$el); // 挂载到全局节点

      this.vm.$el.style.opacity = 1
      this.vm.$el.style.zIndex = 999
    }

    Vue.prototype.$xConfirm = {
      show
    }
  }
}