<template>
  <div
    style="width:100%;background-color: white;padding: 2em 2em 1em 2em;">
    <el-form inline :model="form" ref="form">
      <el-form-item label="发布时间" prop="postTime">
        <el-date-picker v-model="postTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" :pickerOptions="pickerOptions" @change="changeTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="authorNickname">
        <el-input v-model="form.authorNickname" placeholder="请输入作者"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="info" icon="el-icon-refresh" @click="$refs.form.resetFields()">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="findBlog">查找</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="auditList" :default-sort="{ prop: 'postTime', order: 'descending' }">
      <el-table-column type="selection" min-width="45" align="center">
      </el-table-column>
      <el-table-column type="index" min-width="50" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="postTime" label="发布时间" min-width="140" sortable :sort-method="sortByPostTime">
        <template slot-scope="scope">
          {{ util.formatTime(scope.row.postTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="150"></el-table-column>
      <el-table-column prop="description" label="描述" min-width="280"></el-table-column>
      <el-table-column prop="img" label="封面" min-width="150">
        <template slot-scope="scope">
          <el-image v-if="scope.row.cover" style="height: 80px;" :src="scope.row.cover" fit="contain"
            :preview-src-list="[scope.row.cover]"></el-image>
          <span v-if="!scope.row.cover">暂无</span>
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
      <el-table-column prop="address" label="操作" min-width="280px">
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
      dialogVisible: false,
      postTime: null,
      form: {
        startTime: null,
        endTime: null,
        title: null,
        description: null,
        authorNickname: null,
        status: undefined
      },
      orderBy: "post_time",
      isAsc: true,
      currentPage: 1,
      options: [{
        value: true,
        label: '已通过'
      }, {
        value: false,
        label: '未通过'
      }, {
        value: null,
        label: '待审核'
      }],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
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
    getBlogList() {
      this.$axios.myRequest.getPostBlogList(this.form, this.orderBy, this.isAsc, (this.currentPage - 1) * 10, 10).then((res) => {
        this.auditList = res.data.list
        this.total = res.data.total
      })
    },
    getPostBlogList(currentPage) {
      this.currentPage = currentPage
      this.getBlogList()
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
    },
    sortByPostTime(a, b) {
      return a.postTime - b.postTime
    },
    findBlog() {
      console.log(this.form)
      this.getBlogList()
    },
    changeTime() {
      this.form.startTime = this.postTime[0].getTime()
      this.form.endTime = this.postTime[1].getTime()

      console.log(this.form)
    }
  },
  created() {
    this.getBlogList()
  }
}
</script>

<style lang="less" scoped>
.el-table::before {
  background-color: white;
}
</style>