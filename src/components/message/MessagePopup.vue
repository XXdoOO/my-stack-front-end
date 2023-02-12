<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

withDefaults(defineProps<{
  message: string,
  type: 'info' | 'success' | 'error' | 'warn'
}>(), {})


const msg = ref<HTMLElement>()
const timer = setTimeout(() => {
  msg.value.style.opacity = '0'
  msg.value.style.zIndex = '-1'
}, 3000)

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<template>
  <div :class="['message', 'message-' + type]" ref="msg">
    <div class="message-text">
      <div class="message-content">
        <my-icon :icon="type" :class="type"></my-icon>
        <div>提示信息：{{ message }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.message {
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  z-index: 999;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}

.message-title {
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: bold;
}

.message-content {
  font-size: 12px;
  display: flex;
  align-items: center;

  :first-child {
    margin-right: 5px;
  }

  .success {
    color: @success-color;
  }

  .error {
    color: @danger-color;
  }
}

.message-actions {
  display: flex;
  justify-items: center;
}

.message-success {
  background-color: #f0f9eb;
  border: 1px solid #67C23A;

}

.message-success .message-title,
.message-success .message-content {
  color: #67C23A;
}

.message-warning {
  background-color: #fdf6ec;
  border: 1px solid #E6A23C;
}

.message-error .message-title,
.message-error .message-content {
  color: #E6A23C;
}

.message-error {
  background-color: #fef0f0;
  border: 1px solid #F56C6C
}

.message-error .message-title,
.message-error .message-content {
  color: #F56C6C;
}
</style>