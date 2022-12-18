<script setup lang="ts">
import { ref } from 'vue'
import MyButton from '@/components/MyButton.vue';

const props = defineProps<{
  msg: string,
  confirm?: Function
}>()

const popup = ref()

const cancel = () => {
  popup.value.style.opacity = 0
  popup.value.style.zIndex = -1
}

const confirm = () => {
  cancel()
  props.confirm()
}
</script>

<template>
  <div class="confirm-popup" ref="popup">
    <div class="content">
      <div class="header">提示</div>
      <div class="msg">{{ msg }}</div>
      <div class="btn-group">
        <my-button @click="cancel" plain>取消</my-button>
        <my-button class="confirm" @click="confirm">确认</my-button>
      </div>
    </div>
  </div>
</template>
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
    min-width: 400px;
    background-color: white;
    border-radius: 5px;
    padding: 12px 15px;

    .msg {
      font-size: 14px;
      margin: 15px 0;
    }

    .btn-group {
      float: right;
      display: flex;

      .confirm {
        margin-left: 30px;
      }
    }
  }
}
</style>