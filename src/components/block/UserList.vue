<template>
  <div class="user-list">
    <el-form inline :model="form" ref="form">
      <el-form-item label="注册时间" prop="postTime">
        <el-date-picker v-model="registerTime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" :pickerOptions="pickerOptions" @change="changeTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.title" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" pro="nickname">
        <el-input v-model="form.description" placeholder="请输入用户昵称"></el-input>
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
        <el-button type="primary" icon="el-icon-search" @click="findUser">查找</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="userList" :default-sort="{ prop: 'registerTime', order: 'descending' }">
      <el-table-column type="selection" min-width="45" align="center">
      </el-table-column>
      <el-table-column type="index" min-width="50" label="序号" align="center">
      </el-table-column>
      <el-table-column label="注册时间" min-width="80" prop="registerTime" sortable :sort-method="sortByRegisterTime"
        align="center">
        <template slot-scope="scope">
          {{ util.formatTime(scope.row.registerTime) }}
        </template>
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <el-image style="width:50px;height: 50px;border-radius: 50%" :src="scope.row.avatar" fit="cover"
            :preview-src-list="[scope.row.avatar]"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="nickname" label="用户昵称" align="center"></el-table-column>
      <el-table-column prop="status" label="身份" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.identity" type="info">普通用户</el-tag>
          <el-tag v-if="!scope.row.identity">管理用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" min-width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#ff4949" inactive-color="#13ce66" active-text="小黑屋悔改中"
            inactive-text="正常" @change="changeStatus(scope.row, $event)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="total" @current-change="jumpPage"
      style="display:flex;justify-content:center;padding:1.5em 0;">
    </el-pagination>

    <el-dialog title="关押设置" :visible.sync="dialogFormVisible" width="420px">
      <el-form :model="form2" label-width="100px" :rules="rules" ref="form2">
        <el-form-item label="关押时间：" prop="time">
          <el-cascader v-model="form2.time" :options="options2"></el-cascader>
        </el-form-item>
        <el-form-item label="关押原因：" style="margin-bottom:0" prop="reason">
          <el-input type="textarea" :rows="3" resize="none" placeholder="请输入关押原因" v-model="form2.reason" clearable
            maxlength="50" show-word-limit>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const minutes = [{
  value: 1,
  label: '1分钟',
}, {
  value: 30,
  label: '30分钟',
}]
const hours = [{
  value: 0,
  label: "0小时",
  children: minutes
}, {
  value: 1,
  label: "1小时",
  children: minutes
}]

const day = [{
  value: 0,
  label: "0天",
  children: hours
}, {
  value: 1,
  label: "1天",
  children: hours
}
]
export default {
  name: "UserList",
  data() {
    return {
      username: null,
      userList: [],
      dialogFormVisible: false,
      form2: { time: "", reason: "" },
      total: 1,
      rules: {
        time: {
          required: true,
          message: "关押时间不能为空！"
        },
        reason: {
          required: true,
          message: "关押原因不能为空！"
        }
      },
      options2: day,
      form: {
        username: null,
        nickanme: null,
        status: undefined
      },
      registerTime: null,
      orderBy: "post_time",
      isAsc: true,
      currentPage: 1,
      options: [{
        value: true,
        label: '正常'
      }, {
        value: false,
        label: '小黑屋悔改中'
      }, {
        value: null,
        label: '已注销'
      }],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
    }
  },
  methods: {
    changeStatus(user, isRelease) {
      console.log(user, isRelease)
      if (!isRelease) {
        user.status = true
        this.$confirm('此操作将该用户从小黑屋释放, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.myRequest.cancelDisable(user.username).then((res) => {
            console.log(res)

            user.status = false
            this.$message({
              type: 'success',
              message: '释放成功!'
            })
          })
        }).catch(() => {
          user.status = true
          this.$message({
            type: 'info',
            message: '已取消释放'
          })
        })
      } else {
        user.status = false
        this.dialogFormVisible = true
        this.username = user.username
      }
    },
    confirm() {
      console.log(this.form2.time)
      this.$refs.form2.validate((valid) => {
        if (valid) {
          const time = this.form2.time[0] * 3600 * 24 + this.form2.time[1] * 3600 + this.form2.time[2] * 60
          console.log(time)

          this.$axios.myRequest.disableUser(this.username, time, this.form2.reason).then((res) => {
            console.log(res)

            if (res.code === 600) {
              this.$message({
                message: '拉进小黑屋成功！',
                type: 'success'
              })
            } else {
              this.$message({
                message: '拉进小黑屋失败！',
                type: 'error'
              })
            }

            this.dialogFormVisible = false
          })
        }
      })
    },
    jumpPage(currentPage) {
      this.currentPage = currentPage
      this.getUserList(currentPage)
    },
    getUserList() {
      this.$axios.myRequest.getUserList(this.form, this.orderBy, this.isAsc, (this.currentPage - 1) * 10, 10).then((res) => {
        this.userList = res.data.list
        this.total = res.data.total
      })
    },
    findUser() {
      this.getUserList()
    },
    sortByRegisterTime(a, b) {
      console.log(a, b)
      return a.registerTime - b.registerTime
    },
    changeTime() {
      this.form.startTime = this.postTime[0].getTime()
      this.form.endTime = this.postTime[1].getTime()

      console.log(this.form)
    }
  },
  created() {
    this.getUserList(1)
  },
}
</script>

<style lang="less" scoped>
.user-list {
  width: 100%;
  background-color: white;
  padding: 2em 2em 1em 2em;

  .el-table::before {
    background-color: white;
  }
}
</style>