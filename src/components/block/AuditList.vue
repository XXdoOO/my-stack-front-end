<template>
  <div style="width:100%;max-height: calc(100vh - 80px);overflow: auto;background-color: white;">
    <el-table :data="auditList" style="width: 100%;padding: 1em 2em;">
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
          <el-link type="primary" :href="`#/user/${scope.row.authorUsername}/postBlogList`">{{
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
      <el-table-column prop="address" label="操作" width="330px">
        <template slot-scope="scope">
          <el-button plain type="primary" size="small" @click="getBlogDetails(scope.row.id)">
            查看详情
          </el-button>
          <el-button icon="el-icon-close" plain @click="handleClick(scope.row, false)" type="danger" size="small">
            驳回
          </el-button>
          <el-button icon="el-icon-check" plain @click="handleClick(scope.row, true)" type="success" size="small">
            通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="total" @current-change="getPostBlogList"
      style="display:flex;justify-content:center;padding:1.5em 0;">
    </el-pagination>

    <el-dialog title="博客详情" :visible.sync="dialogVisible" width="900px">
      <MarkdownPreview :initialValue="blog.content" theme="gitHub"></MarkdownPreview>

      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-arrow-left" plain @click="jumpBlog(-1)" type="primary" size="small">
          上一篇
        </el-button>
        <el-button plain @click="jumpBlog(1)" type="primary" size="small">
          下一篇<el-icon class="el-icon-arrow-right el-icon--right"></el-icon>
        </el-button>
        <el-button icon="el-icon-close" plain @click="handleClick(blog, false)" type="danger" size="small">
          驳回
        </el-button>
        <el-button icon="el-icon-check" plain @click="handleClick(blog, true)" type="success" size="small">
          通过
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { MarkdownPreview } from 'vue-meditor'
export default {
  name: "AuditList",
  components: { MarkdownPreview },
  data() {
    return {
      auditList: [],
      total: 0,
      blog: {},
      dialogVisible: false
    }
  },
  methods: {
    handleClick(blog, isPass) {
      this.dialogVisible = false

      this.$axios.myRequest.auditBlog(blog.id, isPass).then((res) => {
        console.log(res)

        if (res.code === 600) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          if (isPass) {
            blog.status = true
          } else {
            blog.status = false
          }
        }
      })
    },
    getPostBlogList(currentPage) {
      console.log(currentPage)
      this.$axios.myRequest.getPostBlogList(null, --currentPage * 10, 10).then((res) => {
        console.log(res)
        this.auditList = res.data.list
        this.total = res.data.total
      })
    },
    getBlogDetails(blogId) {
      this.$axios.myRequest.getBlogDetails(blogId).then((res) => {
        res.data.content = res.data.content.replace(/\\u002F/g, "/")

        this.blog = res.data

        this.dialogVisible = true
      });
    },
    jumpBlog(go) {
      for (let index = 0; index < this.auditList.length; index++) {
        if (this.auditList[index].id === this.blog.id) {
          if (index + go >= 0 && index + go < this.auditList.length) {
            this.getBlogDetails(this.auditList[index + go].id)
          } else {
            this.$message('已经到顶/底了!');
          }
          break
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getPostBlogList(1)
    })
  }

}
</script>

<style lang="less" scoped>
.el-table::before {
  background-color: white;
}
</style>