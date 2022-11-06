<template>
  <main class="admin-page">
    <el-aside width="200px">
      <el-menu :router="true" :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/admin/blogList">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>博客管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/admin/userList">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="content">
      <router-view></router-view>
    </el-container>
  </main>
</template>

<script>
export default {
  name: "AdminPage",
  data() {
    return {
      blogList: []
    }
  },
}
</script>

<style lang="less" scoped>
.admin-page {
  margin-top: 70px !important;
  display: flex;
  height: calc(100vh - 80px);
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}

.content {
  overflow: auto;
}
</style>