<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'primary' | 'danger' | 'text',
  icon?: string,
  plain?: boolean,
  disabled?: boolean
}>(), {
  type: 'primary',
  plain: false,
  disabled: false
})

let timer
const $emit = defineEmits(['click'])

const handleClick = (e) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    $emit('click', e)
  }, 100)
}
</script>
<template>
  <button class="my-button" :class="[type, { plain: plain, disabled: disabled }]" @click="handleClick"
    :disabled="disabled">
    <span>
      <slot>按钮</slot>
    </span>
  </button>
</template>
<style lang="less" scoped>
.my-button {
  border-radius: 5px;
  position: relative;
  padding: 5px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: @transition-time;
}

.my-button::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: @transition-time;
}

.my-button.disabled::before {
  background-color: rgba(255, 255, 255, .3);
}

.primary {
  color: white;
  border: 1px solid @theme-color;
  background-color: @theme-color;
}

.primary:not(.disabled, .plain):hover::before {
  background-color: rgba(255, 255, 255, .3);
}

.primary.plain {
  color: @theme-color;
  background-color: @theme-color2;
}

.primary.plain:not(.disabled):hover {
  background-color: @theme-color;
  color: white;
}

.danger {
  color: white;
  border: 1px solid @danger-color;
  background-color: @danger-color;
}

.danger:not(.disabled, .plain):hover::before {
  background-color: rgba(255, 255, 255, .3);
}

.danger.plain {
  color: @danger-color;
  background-color: @danger-color2;
}

.danger.plain:not(.disabled):hover {
  background-color: @danger-color;
  color: white;
}


.text {
  border: none;
  background-color: transparent;
  color: @theme-color;
  padding: 0;
}

.text:not(.disabled):hover::before {
  background-color: rgba(255, 255, 255, .3);
}

.disabled {
  cursor: not-allowed;
}
</style>