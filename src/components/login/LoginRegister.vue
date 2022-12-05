<script setup lang="ts">
import MyButton from '@/components/MyButton.vue'

const regex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

export default {
  name: "LoginRegister",
  components: { MyButton },
  data() {
    return {
      active: false,
      time: '',
      tip: {
        loginTip: "",
        tipClass: false,
        registerTip: "",
      },
      loginFrom: {
        email: "1972524359@qq.com",
        password: "xx",
        code: ''
      },
      registerFrom: {
        email: "1972524359@qq.com",
        password: "xx",
        password2: "xx",
        code: ''
      },
      isDisableSend: false,
      countdown: 60
    };
  },
  methods: {
    hiddenPopup() {
      this.$refs.login.style.opacity = 0
      this.$refs.login.style.zIndex = -999
    },
    login() {
      let email = this.loginFrom.email
      let password = this.loginFrom.password
      let code = this.loginFrom.code

      if (email.length === 0 || password.length === 0) {
        this.tip.loginTip = "邮箱或密码不能为空"
        this.tip.tipClass = true
      } else if (!regex.test(email)) {
        this.tip.loginTip = "邮箱格式错误"
        this.tip.tipClass = true
      } else if (code.length === 0) {
        this.tip.loginTip = "验证码不能为空"
        this.tip.tipClass = true
      } else {
        console.log(this.$store)

        api.login({
          email,
          password,
          code
        }).then((data) => {
          sessionStorage.setItem("userInfo", JSON.stringify(data))

          window.location.reload()
        }).catch(msg => {
          this.time = new Date()
          this.tip.loginTip = msg
          this.tip.tipClass = true
        })
      }
    },
    register() {
      let email = this.registerFrom.email
      let password = this.registerFrom.password
      let password2 = this.registerFrom.password2
      let code = this.registerFrom.code

      if (email.length === 0) {
        this.tip.registerTip = "邮箱不能为空"
        this.tip.tipClass = true
      } else if (!regex.test(email)) {
        this.tip.registerTip = "邮箱格式错误"
        this.tip.tipClass = true
      } else if (code.length === 0) {
        this.tip.registerTip = "验证码不能为空"
        this.tip.tipClass = true
      } else if (password.length === 0 || password2.length === 0) {
        this.tip.registerTip = "密码或确认密码不能为空"
        this.tip.tipClass = true
      } else if (password !== password2) {
        this.tip.registerTip = "两次密码不一致";
        this.tip.tipClass = true
      } else {
        api.register({ email, password, code }).then(() => {
          this.tip.registerTip = '注册成功'
        }).catch(msg => {
          this.tip.registerTip = msg
          this.tip.tipClass = true
        })
      }
    },
    sendCode() {
      if (this.registerFrom.email.length == 0) {
        this.tip.registerTip = "邮箱不能为空"
        this.tip.tipClass = true
      } else if (!regex.test(this.registerFrom.email)) {
        this.tip.registerTip = "邮箱格式错误"
        this.tip.tipClass = true
      } else {
        api.sendCode(this.registerFrom.email).then(res => {
          console.log(res)

          this.isDisableSend = true
          setInterval(() => {
            if (this.countdown > 0) {
              this.countdown--
            } else {
              this.isDisableSend = false
            }
          }, 1000)
        })
      }
    }
  },
};
</script>
<template>
  <div class="login-register" ref="login" @click="hiddenPopup">
    <div @click.stop="">
      <div class="cover" :class="{ cover: true, active }">
        <div>My Stack</div>
      </div>
      <div :class="{ login: true, active }">
        <h1>登录</h1>
        <input class="form-input" type="text" maxlength="32" required placeholder="请输入邮箱" v-model="loginFrom.email" />
        <input class="form-input" type="password" maxlength="16" required placeholder="请输入密码"
          v-model="loginFrom.password" />
        <div class="kaptcha">
          <input class="form-input" type="text" maxlength="8" required placeholder="请输入验证码" v-model="loginFrom.code" />
          <MyButton type="text" class="toggle" @click="time = new Date()">换一张</MyButton>
          <img :src="`/kaptcha?time=${time}`" />
        </div>
        <p :class="{ active: tip.tipClass }" @animationend="tip.tipClass = false">
          {{ tip.loginTip }}
        </p>

        <MyButton @click="login" style="margin-top: 20px">登录
        </MyButton>
        <p @click="active = !active">没有账号？点击注册</p>
      </div>
      <div :class="{ register: true, active }">
        <h1>注册</h1>
        <div class="email">
          <input class="form-input" type="text" maxlength="32" required placeholder="请输入邮箱"
            v-model="registerFrom.email" />
          <MyButton type="text" class="toggle" :disabled="isDisableSend" @click="sendCode">{{ isDisableSend ?
              `${countdown}后重新发送` : '发送验证码'
          }}</MyButton>
        </div>
        <input class="form-input" type="text" maxlength="8" required placeholder="请输入验证码" v-model="registerFrom.code" />
        <input class="form-input" type="password" maxlength="16" required placeholder="请输入密码"
          v-model="registerFrom.password" />
        <input class="form-input" type="password" maxlength="16" required placeholder="请输入确认密码" style="margin-bottom:0"
          v-model="registerFrom.password2" />
        <p :class="{ active: tip.tipClass }" @animationend="tip.tipClass = false">
          {{ tip.registerTip }}
        </p>

        <MyButton style="margin-top: 20px" @click="register">注册
        </MyButton>
        <p @click="active = !active">已有账号？点击登录</p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@keyframes tip {
  0% {
    margin-left: 0;
  }

  25% {
    margin-left: 30px;
  }

  50% {
    margin-left: 0;
  }

  75% {
    margin-left: 30px;
  }

  100% {
    margin-left: 0;
  }
}

.login-register {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity @transition-time;
  z-index: -999;
  opacity: 0;

  >div {
    position: relative;
    overflow: hidden;
    width: 800px;
    height: 520px;
    aspect-ratio: calc(1 / 0.618);
    border-radius: 10px;
    box-shadow: @shadow-color;

    .cover {
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      left: 0;
      background-image: url(../../assets/img/cover.webp);
      z-index: 3;
      transition: 0.5s;
    }

    .cover.active {
      left: 50%;
      background-position-x: 100%;
    }

    .login,
    .register {
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      right: 0;
      background-color: white;
      transition: 0.5s;
      display: flex;
      flex-direction: column;
      padding: 40px;

      >h1 {
        text-align: center;
        margin-bottom: 40px;
        color: @theme-color;
      }

      .kaptcha {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 40px;

        input {
          padding-right: 120px;
        }

        .toggle {
          position: absolute;
          right: 110px;
          top: 50%;
          transform: translateY(-50%);
        }

        img {
          position: absolute;
          right: 2px;
          top: 2px;
          width: auto;
          height: 36px;
          border-radius: 5px;
        }
      }

      .email {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 40px;
        margin-bottom: 20px;

        input {
          padding-right: 70px;
        }

        .toggle {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      >p:first-of-type {
        font-size: 14px;
        color: red;
        padding: 5px 10px;
        height: 29px;
      }

      >p.active:first-of-type {
        animation: tip 0.6s;
      }

      >p:last-child {
        cursor: pointer;
        color: black;
        font-size: 14px;
        text-decoration: underline;
        transition: 0.3s;
        text-align: center;
        margin-top: 15px;
      }

      >p:last-child:hover {
        color: @theme-color;
      }
    }

    .login.active {
      z-index: 1;
      right: 50%;
    }

    .register.active {
      z-index: 2;
      right: 50%;
    }

    .login {
      z-index: 2;
    }

    .register {
      z-index: 1;
    }
  }
}

.form-input {
  outline: none;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border: 1px solid @theme-color;
  padding-right: 165px;
  border-radius: 5px;
}

.cover {
  position: relative;

  div {
    position: absolute;
    left: 100px;
    top: 50px;
    color: white;
    font-size: 30px;
  }
}
</style>