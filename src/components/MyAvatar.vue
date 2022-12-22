<script setup lang="ts">
import { ref, reactive } from 'vue'

const props = withDefaults(defineProps<{
  size?: string | number,
  src: string
}>(), {
  size: '50px'
})

const src = ref(props.src)
</script>

<template>
  <img class="avatar" :src="src" alt="头像" @error="src = '/api/avatar/1.jpg'" />
</template>

<style lang="less" scoped>
.avatar {
  display: inline-block;
  width: v-bind(size);
  height: v-bind(size);
  border-radius: 50%;
  border: 1px solid @border-color;
}
</style>