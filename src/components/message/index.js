import Message from "./MessagePopup.vue";

// export const message = (props) => {
//   // Vue.extend传递组件选项，返回一个组件构造函数
//   const constructor = Vue.extend({
//     render(h) {
//       return h(Message, { props });
//     },
//   });
//   const vm = new constructor().$mount();
//   // 获取组件的DOM，将其挂载到body上
//   document.body.appendChild(vm.$el);

//   // 创建这个组件的同时返回这个组件实例，在这个实例上提供删除方法。
//   const comp = vm.$children[0];
//   comp.remove = () => {
//     document.body.remove(comp);
//     vm.$destroy();
//   };
//   return comp;
// };

export default {
  // 向外暴露install方法
  install(Vue) {
      let message = null;

      function show(props) { // 添加方法，后面挂载到$message上
          if (!message) {
              const messageConstructor = Vue.extend({ // 使用 Vue 构造器，创建一个子类
                  render(h) {
                      return h(Message, {
                          props: {...props} // 将通过this.$message.show传进来的props传入组件中
                      })
                  }
              });
              let instance = new messageConstructor(); // 实例化

              this.vm = instance.$mount(document.createElement('div')) // 创建一个空的div标签并挂载到上面
              document.body.appendChild(this.vm.$el); // 挂载到全局节点
          }
      }

      Vue.prototype.$xMessage = {
          show,
      }
  }
}