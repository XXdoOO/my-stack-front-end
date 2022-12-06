<script setup lang="ts">
import { ref, reactive } from 'vue'

withDefaults(defineProps<{
  icon: string,
  isActive: boolean,
}>(), {
  icon: 'star',
  isActive: true
})

const active = ref<string>('')
</script>

<template>
  <svg class="icon" :class="{ active: isActive }" aria-hidden="true">
    <use :xlink:href="`#${icon}-active`"></use>
  </svg>
  <span class="iconfont" :class="`${icon}${active}`" @mouseover="(active = '-active')" @mouseout="(active = '')"></span>
</template>

<style lang="less" scoped>
.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.icon symbol {
  transition: all 12s;
}

.iconfont::before {
  transition: all 2s;
}

.icon use {
  transition: 2s;
}

// .active {
//   cursor: pointer;
// }

// .active:hover {
//   color: @theme-color
// }
</style>