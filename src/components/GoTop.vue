<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MyIcon from '@/components/MyIcon.vue'
const display = ref<string>('none')

const goTop = () => {
  document.documentElement.scrollTop = 0
}

const scrollToTop = () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  let browserHeight = window.outerHeight

  if (scrollTop > browserHeight) {
    display.value = 'flex'
  } else {
    display.value = 'none'
  }
}

onMounted(() => {
  window.addEventListener("scroll", scrollToTop)
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollToTop)
})
</script>

<template>
  <MyIcon icon="arrow-down" @click="goTop()" class="goTop" :style="{ display: display }" title="返回顶部"></MyIcon>
</template>

<style lang="less" scoped>
.goTop {
  font-size: 12px;
  position: fixed;
  right: 70px;
  bottom: 70px;
  padding: 7px;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
  transform: rotate(180deg);
}
</style>