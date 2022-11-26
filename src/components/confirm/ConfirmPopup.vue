<template>
  <div class="confirm-popup" ref="confirm">
    <div class="content">
      <div class="header">提示</div>
      <div class="msg">{{ msg }}</div>
      <div class="btn-group">
        <button @click="cancel">取消</button>
        <button @click="confirm">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    success: {
      type: Function
    },
    msg: {
      type: String,
      default() {
        return "此操作不可逆转，确认删除吗？"
      }
    }
  },
  methods: {
    cancel() {
      this.$refs.confirm.style.opacity = 0
      this.$refs.confirm.style.zIndex = -1
    },
    confirm() {
      this.cancel()
      this.success()
    }
  },
}
</script>
<style lang="less">
.confirm-popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity @transition-time;
  z-index: -1;
  opacity: 0;

  .content {
    min-width: 350px;
    background-color: white;
    border-radius: 5px;
    padding: 12px 15px;

    .msg {
      font-size: 14px;
      margin: 15px 0;
    }

    .btn-group {
      float: right;

      button {
        border-radius: 5px;
        border: 1px solid @theme-color;
        color: white;
        background-color: @theme-color;
        padding: 5px 20px;
        cursor: pointer;
        transition: @transition-time;
      }

      button:first-child {
        margin-right: 10px;
        background-color: white;
        color: @theme-color;
      }
    }
  }
}
</style>