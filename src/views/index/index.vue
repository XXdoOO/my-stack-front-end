<script setup lang="ts">
import { ref, reactive } from 'vue'
import MyHeader from '@/components/MyHeader.vue'
import MyFooter from '@/components/MyFooter.vue'


</script>

<template>
  <MyHeader></MyHeader>
  <RouterView></RouterView>
  <MyFooter></MyFooter>
</template>

<style lang="less" scoped>

</style>