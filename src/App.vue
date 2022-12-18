<script setup lang="ts">
import { store } from '@/stores/index'
import user from './api/user';

const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))

if (userInfo) {
  store().userInfo = userInfo
}

</script>

<template>
  <router-view></router-view>
</template>

<style lang="less" scoped>

</style>
