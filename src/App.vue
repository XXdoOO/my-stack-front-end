<script setup lang="ts">
import { store } from '@/stores/index'
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))

if (userInfo) {
  store().userInfo = userInfo
}

</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="less" scoped>

</style>
