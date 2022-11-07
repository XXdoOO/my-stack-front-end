<template>
  <div class="user-list" style="width: 100%;max-height: calc(100vh - 80px);">
    <el-table :data="userList" style="width: 100%;padding: 1em 2em; max-height: calc(100vh - 80px);overflow: auto">
      <el-table-column label="注册时间" width="180">
        <template slot-scope="scope">
          {{ util.formatTime(scope.row.registerTime) }}
        </template>
      </el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-image style="width:50px;height: 50px;border-radius: 50%" :src="scope.row.avatar" fit="cover"
            :preview-src-list="[scope.row.avatar]"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="nickname" label="用户昵称"></el-table-column>
      <el-table-column prop="status" label="身份">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.identity" type="info">普通用户</el-tag>
          <el-tag v-if="!scope.row.identity">管理用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="!scope.row.status" type="success">正常</el-tag>
          <el-tag v-if="scope.row.status" type="danger">小黑屋悔改中</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.status" plain @click="held(scope.row)" type="primary" size="small">
            关进小黑屋
          </el-button>
          <el-button v-if="scope.row.status" plain @click="release(scope.row)" type="primary" size="small">
            从小黑屋释放
          </el-button>
          <!--<el-button plain icon="el-icon-success" @click="handleClick(scope.row)" type="success" size="small">通过
          </el-button>
          <el-button plain icon="el-icon-error" type="danger" size="small">不通过</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="total"
      style="display:flex;justify-content:center;padding:1.5em 0;">
    </el-pagination>

    <el-dialog title="关押设置" :visible.sync="dialogFormVisible" width="420px">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="关押时间：" prop="time">
          <el-cascader v-model="form.time" :options="options"></el-cascader>
        </el-form-item>
        <el-form-item label="关押原因：" style="margin-bottom:0" prop="reason">
          <el-input type="textarea" :rows="3" resize="none" placeholder="请输入关押原因" v-model="form.reason" clearable
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
      form: { time: "", reason: "" },
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
      options: day
    }
  },
  methods: {
    held(user) {
      console.log(user)
      this.dialogFormVisible = true
      this.username = user.username
    },
    release(user) {
      console.log(user)

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
        this.$message({
          type: 'info',
          message: '已取消释放'
        })
      })
    },
    confirm() {
      console.log(this.form.time)
      this.$refs.form.validate((valid) => {
        if (valid) {
          const time = this.form.time[0] * 3600 * 24 + this.form.time[1] * 3600 + this.form.time[2] * 60
          console.log(time)

          this.$axios.myRequest.disableUser(this.username, time, this.form.reason).then((res) => {
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
    getUserList(currentPage) {
      this.$axios.myRequest.getUserList(currentPage * 10, 10).then((res) => {
        this.userList = res.data.list
        this.total = res.data.total
      })
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getUserList(0)
    })
  }

}
</script>

<style lang="less" scoped>
.user-list {
  background-color: white;

  .el-table::before {
    background-color: white;
  }
}
</style>