<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">智慧楼宇管控平台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        class="loginBtn"
        @click.native.prevent="handleLogin"
        >登 录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { validUsername } from "@/utils/validate";
import md5 from "js-md5";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      sessionStorage.setItem("loginState", true);

      this.$router.push({ path: "/" });
      // this.$router.push({ path: "/form/index" });
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          login({
            account: this.loginForm.username,
            password: md5(this.loginForm.password),
          }).then((res) => {
            if (res.message == "登录成功") {
              sessionStorage.setItem("userName", res.userName);
              sessionStorage.setItem("userId", res.userId);
              sessionStorage.setItem("loginState", true);

              this.$router.push({ path: "/" });
            } else {
              this.$message({
                message: res.message,
                type: "error",
              });
            }
          });
          // this.$store.dispatch('user/login', {account:this.loginForm.username,password:md5(this.loginForm.password)}).then(() => {
          //   this.$router.push({ path: this.redirect || '/' })
          //   this.loading = false
          // }).catch(() => {
          //   this.loading = false
          // })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    .el-form-item__content {
      line-height: 30px;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 8px 5px 8px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #5b7eff;
    background: none;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    width: 420px;
    position: fixed;
    padding: 40px 50px;
    margin: 0 auto;
    overflow: hidden;
    right: 20%;
    background: rgba(23, 39, 90, 0.62);
    box-shadow: 2px 2px 7px 0px rgba(23, 39, 90, 0.62);
    border-radius: 4px;
    box-sizing: border-box;
    top: 25%;
    border-right: 3px solid rgba(91, 126, 255, 1);
    border-left: 3px solid rgba(91, 126, 255, 1);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #fff;
    // vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-weight: 600;
      color: #ffffff;
      line-height: 42px;
      letter-spacing: 2px;
      text-align: center;
      font-size: 30px;
      text-shadow: 2px 2px 8px #5b7eff;
      margin: 0 0 30px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .loginBtn {
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(91, 126, 255, 0.2) 0%,
      rgba(138, 191, 255, 0.2) 47%,
      rgba(91, 126, 255, 0.2) 100%
    );
    border-radius: 4px;
    border: 1px solid #5b7eff;
    margin-top: 30px;
  }
}
</style>
