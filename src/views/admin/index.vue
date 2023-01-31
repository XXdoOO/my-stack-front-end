<template>
  <el-container>
    <el-aside width="200px" class="sidebar">
      <el-menu router background-color="black" text-color="#fff" @open="handleOpen" @close="handleClose"
        :default-active="useRoute().fullPath">
        <el-menu-item index="/" class="logo">
          <my-icon icon="edit" active size="15px"></my-icon>
          <span class="web-name">My Stack 管理后台</span>
        </el-menu-item>
        <!-- <el-menu-item index="/admin">
          <el-icon>
            <Menu />
          </el-icon>
          <span>首页</span>
        </el-menu-item> -->
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
        <el-menu-item index="/admin/comment">
          <el-icon>
            <ChatLineSquare />
          </el-icon>
          <span>评论管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/dict">
          <el-icon>
            <Memo />
          </el-icon>
          <span>字典管理</span>
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
  ChatLineSquare,
  Memo
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

.logo {
  height: 50px !important;

  .web-name {
    margin-left: 5px;
    font-weight: bold;
    color: @theme-color;
    font-size: 15px;
  }
}

.el-menu-item.is-active {
  background-color: @theme-color;
  color: white;
}

.el-menu-item {
  border-radius: 5px;
  margin: 5px;
  height: 40px;
}
</style>
