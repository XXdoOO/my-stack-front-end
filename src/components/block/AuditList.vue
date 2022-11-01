<template>
  <div style="width:100%;max-height: calc(100vh - 80px);overflow: auto;background-color: white;">
    <el-table :data="auditList" style="width: 100%;padding: 1em 2em; max-height: calc(100vh - 45px);">
      <el-table-column prop="postTime" label="发布时间" width="180">
        <template slot-scope="scope">
          {{ util.formatTime(scope.row.postTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="description" label="描述" width="250"></el-table-column>
      <el-table-column prop="img" label="封面">
        <template slot-scope="scope">
          <el-image v-if="scope.row.cover" style="height: 80px;" :src="scope.row.cover" fit="contain"
            :preview-src-list="[scope.row.cover]"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="authorInfo" label="作者">
        <template slot-scope="scope">
          <el-link type="primary" :href="`/user/${scope.row.authorUsername}/postBlogList`">{{
              scope.row.authorNickname
          }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == null">待审核</el-tag>
          <el-tag v-if="scope.row.status" type="success">已通过</el-tag>
          <el-tag v-if="scope.row.status == false" type="danger">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button plain @click="handleClick(scope.row)" type="primary" size="small">
            {{ scope.row.status == null ? "审核" : "重新审核" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="1000"
      style="display:flex;justify-content:center;padding:1.5em 0;">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "AuditList",
  data() {
    return {
      auditList: []
    }
  },
  methods: {
    handleClick(msg) {
      console.log(msg)
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$axios.myRequest.getPostBlogList(null, 0, 100).then((res) => {
        vm.auditList = res.data.data
      })
    })
  }

}
</script>

<style lang="less" scoped>

</style>