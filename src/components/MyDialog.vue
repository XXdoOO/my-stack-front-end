<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

const $props = withDefaults(defineProps<{
  title: string,
  visible: boolean,
  width?: string
}>(), {
  width: '50%'
})

const $emit = defineEmits(['update:visible', 'confirm'])

watch(() => $props.visible, (newVal) => {
  console.log(newVal);
  if (newVal) {
    maskRef.value.style['z-index'] = 1000
    maskRef.value.style['opacity'] = 1
  }
})

const maskRef = ref()
const cancel = () => {
  $emit('update:visible', false)
  maskRef.value.style['z-index'] = -1
  maskRef.value.style['opacity'] = 0
}
</script>

<template>
  <div class="mask" ref="maskRef" @click="cancel">
    <div class="dialog" @click.stop>
      <div class="title">{{ title }}</div>
      <my-icon class="icon" icon="cancel" @click="cancel"></my-icon>
      <slot></slot>
      <slot name="footer">
        <div class="footer">
          <my-button @click="cancel" plain>取消</my-button>
          <my-button @click="$emit('confirm')">确认</my-button>
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: @mask;
  z-index: -1;
  opacity: 0;
  transition: opacity @transition-time;

  .dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -80%);
    min-width: 350px;
    min-height: 100px;
    background-color: white;
    border-radius: 5px;
    padding: 45px 15px 10px 15px;

    .title {
      position: absolute;
      top: 10px;
      left: 15px;
    }

    .icon {
      position: absolute;
      right: 7px;
      top: 7px;
      font-size: 7px;
    }

    .footer {
      display: flex;
      justify-content: end;
      margin-top: 20px;

      button:last-child {
        margin-left: 20px;
      }
    }
  }
}
</style>