<script setup lang="ts">
import MyHeader from '@/components/MyHeader.vue'
import MyFooter from '@/components/MyFooter.vue'
import GoTop from '@/components/GoTop.vue'

</script>

<template>
  <MyHeader></MyHeader>
  <RouterView></RouterView>
  <MyFooter></MyFooter>
  <GoTop></GoTop>
</template>

<style lang="less" scoped></style>