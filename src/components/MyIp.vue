<script setup lang="ts">
import { ref, reactive } from 'vue'
const props = withDefaults(defineProps<{
  size?: 'medium' | 'small'
}>(), {
  size: 'medium'
})

</script>

<template>
  <div class="ip" :class="size">ip属地：<slot></slot>
  </div>
</template>

<style lang="less" scoped>
.ip {
  background-color: @theme-color2;
  color: @gray-color-dep;
}

.medium {
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 5px;
}

.small {
  padding: 3px 7px;
  font-size: 12px;
  border-radius: 3px;
}
</style>