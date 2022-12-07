<script setup lang="ts">
import { ref, reactive } from 'vue'

withDefaults(defineProps<{
  icon: string,
  isActive: boolean,
}>(), {
  icon: 'star-active',
  isActive: true
})

const $emit = defineEmits(['click'])


let timer
const handleClick = (e) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    $emit('click', e)
  }, 100)
}
</script>

<template>
  <svg @click="handleClick" class="icon" :class="{ active: isActive }" aria-hidden="true">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<style lang="less" scoped>
.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: @gray-color-dep;
  transition: 0.3s;
}

.active {
  cursor: pointer;
}

.active:hover {
  color: @theme-color
}
</style>