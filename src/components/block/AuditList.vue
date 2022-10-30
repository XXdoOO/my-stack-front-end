<template>
  <el-table :data="$store.state.blogList" style="width: 100%;padding: 1em 2em">
    <el-table-column prop="postTime" label="发布日期" width="180">
      <template slot-scope="scope">
        {{ util.formatTime(scope.row.postTime) }}
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" width="180"></el-table-column>
    <el-table-column prop="description" label="描述" width="250"></el-table-column>
    <el-table-column prop="img" label="封面">
      <template slot-scope="scope">
        <el-image
            v-if="scope.img"
            style="width: 100px; height: 100px"
            :src="scope.img"
            fit="contain"></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="authorInfo" label="作者">
      <template slot-scope="scope">

        <el-button @click="handleClick(scope)" type="text" size="redium">详情
        </el-button>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <el-tag type="success">已通过</el-tag>
      <el-tag type="danger">未通过</el-tag>
    </el-table-column>
    <el-table-column prop="address" label="操作">
      <template slot-scope="scope">
        <el-button plain @click="handleClick(scope.row)" type="primary" size="small">审核
        </el-button>
        <!--<el-button plain icon="el-icon-success" @click="handleClick(scope.row)" type="success" size="small">通过
        </el-button>
        <el-button plain icon="el-icon-error" type="danger" size="small">不通过</el-button>-->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "AuditList",
  data() {
    return {
      auditList: [
        {postTime: "", title: "", description: "", img: "", authorInfo: ""},
        {postTime: "", title: "", description: "", img: "", authorInfo: ""},
        {postTime: "", title: "", description: "", img: "", authorInfo: ""},
        {postTime: "", title: "", description: "", img: "", authorInfo: ""},
      ]
    }
  },
  methods: {
    handleClick(msg) {
      console.log(msg)
    }
  }

}
</script>

<style lang="less" scoped>
</style>