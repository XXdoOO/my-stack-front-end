<template>
  <div style="width: 100%;max-height: calc(100vh - 80px);">
    <el-table :data="userList"
              style="width: 100%;padding: 1em 2em; max-height: calc(100vh - 80px);overflow: auto">
      <el-table-column label="注册时间" width="180">
        <template slot-scope="scope">
          {{ util.formatTime(scope.row.registerTime) }}
        </template>
      </el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-image
              style="width:50px;height: 50px;border-radius: 50%"
              :src="scope.row.avatar"
              fit="cover"
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
          <el-tag v-if="scope.row.registerTime > scope.row.disableTime" type="success">正常</el-tag>
          <el-tag v-if="scope.row.registerTime < scope.row.disableTime" type="danger" @click="dialogFormVisible = true">
            小黑屋悔改中
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.registerTime > scope.row.disableTime" plain @click="held(scope.row)"
                     type="primary" size="small">
            关进小黑屋
          </el-button>
          <el-button v-if="scope.row.registerTime < scope.row.disableTime" plain @click="release(scope.row)"
                     type="primary" size="small">
            从小黑屋释放
          </el-button>
          <!--<el-button plain icon="el-icon-success" @click="handleClick(scope.row)" type="success" size="small">通过
          </el-button>
          <el-button plain icon="el-icon-error" type="danger" size="small">不通过</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="关押设置" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="关押时间（小时）">
          <el-time-select
              v-model="form.time"
              :picker-options="{
          start: '00:30',
          step: '00:30',
          end: '24:00'
          }"
              placeholder="选择时间">
          </el-time-select>
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
export default {
  name: "UserList",
  data() {
    return {
      userList: [],
      dialogFormVisible: false,
      form: {time: ""}
    }
  },
  methods: {
    held(msg) {
      console.log(msg)
      this.dialogFormVisible = true
    },
    release(msg) {
      console.log(msg)
    },
    confirm() {
      console.log(this.form.time)
    },
  }, beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$axios.myRequest.getUserList().then((res) => {
        vm.userList = res.data.data
      })
    })
  }

}
</script>

<style lang="less" scoped>
</style>