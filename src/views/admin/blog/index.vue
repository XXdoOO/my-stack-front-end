<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RefreshRight, Download, Search } from '@element-plus/icons-vue'

const blogList = ref([{ title: 'xxxxx', description: '222222' }])
const form = ref({
  title: '',
  description: '',
  author: '',
  createTime: '',
  pageNum: 0,
  pageSize: 10,
  total: 100
})

</script>

<template>
  <el-form inline>
    <el-form-item label="标题：">
      <el-input placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item label="描述：">
      <el-input placeholder="请输入描述"></el-input>
    </el-form-item>
    <el-form-item label="作者：">
      <el-input placeholder="请输入作者昵称"></el-input>
    </el-form-item>
    <el-form-item label="状态：">
      <el-input placeholder="请输入状态"></el-input>
    </el-form-item>
    <el-form-item label="发布时间：">
      <el-time-picker v-model="form.createTime" is-range range-separator="至" start-placeholder="开始时间"
        end-placeholder="结束时间" />
    </el-form-item>
    <el-form-item>
      <el-button :icon="RefreshRight">重置</el-button>
      <el-button :icon="Download" type="warning">导出</el-button>
      <el-button type="primary" :icon="Search">查找</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="blogList">
    <el-table-column label="序号" align="center" type="index" min-width="50"></el-table-column>
    <el-table-column label="标题" align="center" prop="title"></el-table-column>
    <el-table-column label="描述" align="center" prop="description"></el-table-column>
    <el-table-column label="封面" align="center" prop="cover"></el-table-column>
    <el-table-column label="作者" align="center" prop="author"></el-table-column>
    <el-table-column label="状态" align="center" prop="status"></el-table-column>
    <el-table-column label="发布时间" align="center" prop="createTime"></el-table-column>
  </el-table>

  <el-pagination class="pagination" v-model:current-page="form.pageNum" v-model:page-size="form.pageSize" background
    layout="total, sizes, prev, pager, next" :total="form.total" />
</template>

<style lang="less" scoped>
.pagination {
  padding: 20px;
  justify-content: end;
}
</style>