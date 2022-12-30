<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { RefreshRight, Download, Search } from '@element-plus/icons-vue'
import { getBlogList2 } from '@/api/blog'
import util from '@/util/util';

const blogList = ref([])
const form = reactive({
  title: '',
  description: '',
  authorNickname: '',
  status: '',
  startTime: '',
  createTime: '',
  endTime: '',
  pageNum: 1,
  pageSize: 10,
  total: 100
})
const loading = ref(false)

const getBlogList = () => {
  loading.value = true
  console.log(form);

  form.startTime = util.formatTime(form.startTime)
  form.endTime = util.formatTime(form.endTime)

  console.log(form);
  getBlogList2(form).then((data: any) => {
    form.total = data.total
    blogList.value.length = 0
    data.list.map(item => {
      blogList.value.push({
        id: item.id,
        title: item.title,
        description: item.description,
        cover: item.cover,
        author: item.authorNickname,
        status: item.status,
        createTime: item.createTime
      })
    })

    loading.value = false
  })
}

watch([() => form.pageNum, () => form.pageSize], (newVal, oldVal) => {
  getBlogList()
})

getBlogList()

const reset = () => {
  const tableForm = ref()

  tableForm.value.resetFields()

}

const changeTime = (e) => {
  console.log(e);

}

</script>

<template>
  <el-form inline ref="tableForm" :model="form">
    <el-form-item label="标题：" prop="title">
      <el-input v-model="form.title" placeholder="请输入标题" clearable></el-input>
    </el-form-item>
    <el-form-item label="描述：" prop="description">
      <el-input v-model="form.description" placeholder="请输入描述" clearable></el-input>
    </el-form-item>
    <el-form-item label="作者：" prop="authorNickname">
      <el-input v-model="form.authorNickname" placeholder="请输入作者昵称" clearable></el-input>
    </el-form-item>
    <el-form-item label="审核状态：" prop="status">
      <el-select v-model="form.status" placeholder="请选择审核状态" clearable>
        <el-option label="待审核" value="0"></el-option>
        <el-option label="已通过" value="1"></el-option>
        <el-option label="未通过" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发布时间：" prop="createTime">
      <el-date-picker v-model="form.createTime" value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange"
        range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" clearable />
    </el-form-item>
    <el-form-item>
      <el-button :icon="RefreshRight" @click="reset">重置</el-button>
      <el-button :icon="Download" type="warning">导出</el-button>
      <el-button type="primary" :icon="Search" @click="getBlogList">查找</el-button>
    </el-form-item>
  </el-form>

  <el-table v-loading="loading" :data="blogList">
    <el-table-column label="序号" align="center" type="index" min-width="50"></el-table-column>
    <el-table-column label="标题" align="center" prop="title"></el-table-column>
    <el-table-column label="描述" align="center" prop="description" min-width="200px"></el-table-column>
    <el-table-column label="封面" align="center" prop="cover">
      <template #default="scope">
        <el-image v-if="scope.row.cover" style="height: 100px" :src="scope.row.cover" :zoom-rate="1.2" fit="cover" />
      </template>
    </el-table-column>
    <el-table-column label="作者" align="center" prop="author"></el-table-column>
    <el-table-column label="审核状态" align="center" prop="status">
      <template #default="scope">
        <el-tag v-if="scope.row.status == 0" type="info" effect="dark">待审核</el-tag>
        <el-tag v-if="scope.row.status == 1" type="success" effect="dark">已通过</el-tag>
        <el-tag v-if="scope.row.status == 2" type="danger" effect="dark">未通过</el-tag>
      </template>
    </el-table-column>
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