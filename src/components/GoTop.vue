<script setup lang="ts">
import MyIcon from '@/components/MyIcon.vue'

const goTop = () => {
  document.documentElement.scrollTop = 0
}

const goBottom = () => {
  document.documentElement.scrollTop = document.body.scrollHeight
}
</script>

<template>
  <MyIcon icon="arrow-down" @click="goTop()" class="goTop" title="返回顶部"></MyIcon>
  <MyIcon icon="arrow-down" @click="goBottom()" class="goBottom" title="返回底部"></MyIcon>
</template>

<style lang="less" scoped>
.goTop,
.goBottom {
  font-size: 12px;
  position: fixed;
  right: 60px;
  padding: 7px;
  cursor: pointer;
  background-color: white;
  box-shadow: @shadow-color;
}

.goTop {
  bottom: 90px;
  transform: rotate(180deg);
  border-radius: 0 0 5px 5px;
}

.goBottom {
  bottom: 50px;
  border-radius: 0 0 5px 5px;
}
</style>