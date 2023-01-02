<template>
  <el-container>
    <el-aside width="200px" class="sidebar">
      <el-menu router active-text-color="#40a0ff" background-color="black" text-color="#fff" @open="handleOpen"
        @close="handleClose" :default-active="useRoute().fullPath">
        <el-menu-item index="/">
          <el-icon>
            <Menu />
          </el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/admin/blog">
          <el-icon>
            <Notebook />
          </el-icon>
          <span>博客管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/user">
          <el-icon>
            <User />
          </el-icon>
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <RouterView></RouterView>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import {
  User,
  Menu,
  Notebook,
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

console.log(useRoute().fullPath);


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="less" scoped>
.sidebar {
  background-color: black;
}

.main {
  background-color: white;
  overflow: auto;
  height: 100vh;
}
</style>
