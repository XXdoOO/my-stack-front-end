<template>
  <div class="root">
    <div>
      <div :class="{ cover: true, active }"></div>
      <div :class="{ login: true, active }">
        <h1>登录</h1>
        <input
          type="text"
          maxlength="10"
          required
          placeholder="请输入用户名"
          v-model="loginFrom.username"
        />
        <input
          type="password"
          maxlength="10"
          required
          placeholder="请输入密码"
          v-model="loginFrom.password"
        />
        <p
          :class="{ active: tip.tipClass }"
          @animationend="tip.tipClass = false"
        >
          {{ tip.loginTip }}
        </p>

        <button
          type="submit"
          @click="login(loginFrom.username, loginFrom.password)"
        >
          登录
        </button>
        <p @click="active = !active">没有账号？点击注册</p>
      </div>
      <div :class="{ register: true, active }">
        <h1>注册</h1>
        <input
          type="text"
          maxlength="10"
          required
          placeholder="请输入用户名"
          v-model="registerFrom.username"
        />
        <input
          type="password"
          maxlength="10"
          required
          placeholder="请输入密码"
          v-model="registerFrom.password"
        />
        <input
          type="password"
          maxlength="10"
          required
          placeholder="请输入确认密码"
          v-model="registerFrom.password2"
        />
        <p
          :class="{ active: tip.tipClass }"
          @animationend="tip.tipClass = false"
        >
          {{ tip.registerTip }}
        </p>

        <button
          @click="
            register(
              registerFrom.username,
              registerFrom.password,
              registerFrom.password2
            )
          "
        >
          注册
        </button>
        <p @click="active = !active">已有账号？点击登录</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "LoginRegister",
  data() {
    return {
      active: false,
      tip: {
        loginTip: "",
        tipClass: false,
        registerTip: "",
      },
      loginFrom: {
        username: "",
        password: "",
      },
      registerFrom: {
        username: "",
        password: "",
        password2: "",
      },
    };
  },
  methods: {
    login(username, password) {
      if (username.length === 0 || password.length === 0) {
        this.tip.loginTip = "用户名或密码不能为空！";
        this.tip.tipClass = true;
      } else {
        axios
          .post(
            `http://localhost:8080/login?username=${username}&password=${password}`
          )
          .then(
            (response) => {
              console.log(response);
              if (response.data.statusCode !== 200) {
                this.tip.loginTip = response.data.msg;
                this.tip.tipClass = true;
              } else {
                this.$router.push("/index");
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    },
    register(username, password, password2) {
      if (username.length === 0) {
        this.tip.registerTip = "用户名不能为空！";
        this.tip.tipClass = true;
      } else if (password.length === 0 || password2.length === 0) {
        this.tip.registerTip = "密码或确认不能为空！";
        this.tip.tipClass = true;
      } else if (password !== password2) {
        this.tip.registerTip = "两次密码不一致！";
        this.tip.tipClass = true;
      } else {
        axios
          .post(
            `http://localhost:8080/register?username=${username}&password=${password}`
          )
          .then(
            (response) => {
              console.log(response);
              if (response.data.statusCode !== 200) {
                this.tip.loginTip = response.data.msg;
                this.tip.tipClass = true;
              } else {
                this.active = true;
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    },
  },
};
</script>
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

@keyframes enter {
  from {
    transform: scale(0.7);
  }

  to {
    transform: scale(1);
  }
}

.root {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: enter 1s;

  > div {
    position: relative;
    overflow: hidden;
    width: 800px;
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
      padding: 60px;

      > h1 {
        text-align: center;
        margin-bottom: 40px;
        color: @theme-color;
      }

      > input {
        outline: none;
        border: 1px solid @theme-color;
        border-radius: 5px;
        width: 100%;
        height: 40px;
        font-size: 16px;
        padding: 0 10px;
        margin-bottom: 20px;
      }

      > input:last-of-type {
        margin-bottom: 0;
      }

      > button {
        color: @theme-color;
        background-color: white;
        border: 1px solid @theme-color;
        width: 150px;
        height: 40px;
        border-radius: 5px;
        font-weight: bold;
        transition: 0.3s;
        cursor: pointer;
        font-size: 16px;
        margin: 20px auto;
      }

      > button:hover {
        color: white;
        background-color: @theme-color;
      }

      > p:first-of-type {
        font-size: 14px;
        color: red;
        padding: 5px 10px;
        height: 29px;
      }

      > p.active:first-of-type {
        animation: tip 0.6s;
      }

      > p:last-child {
        cursor: pointer;
        color: black;
        font-size: 14px;
        text-decoration: underline;
        transition: 0.3s;
        text-align: center;
      }

      > p:last-child:hover {
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
</style>