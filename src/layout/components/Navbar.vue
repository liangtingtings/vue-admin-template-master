<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div style="height: 68px">
      <img src="@/assets/index/logo.png" alt="" class="topSidebarImg" />
      <ul
        class="topSidebar"
        v-if="!route.hidden"
        v-for="route in routes"
        :key="route.path"
      >
        <li
          v-for="item in route.children"
          :key="item.path"
          :class="{
            topSidebarActive:
              activeMenu.indexOf(item.path) != -1 ? true : false,
            tjClass: item.children ? true : false,
          }"
        >
          <router-link v-if="item.children ? false : true" :to="item.path">{{
            item.meta.title
          }}</router-link>
          <span v-else>{{ item.meta.title }}</span>
          <div class="drowBox">
            <span v-for="item1 in item.children" :key="item1.path" :class="activeMenu.indexOf(item1.path)!=-1?'spanactive':''">
              <router-link
                :to="item1.path"
                v-if="item1.meta.title !== '能效管理'" 
                >{{ item1.meta.title }}</router-link
              >
              <strong v-else class="disabledspan">{{ item1.meta.title }}</strong>
            </span>
          </div>
        </li>
      </ul>
      <div class="infoBox">
        <img src="@/assets/index/Icon_user.png" alt="" />
        <span
          @click="showDownBtn = !showDownBtn"
          style="position: relative; cursor: pointer"
        >
          {{ userName }} <i class="el-icon-caret-bottom"></i>
          <div
            class="showDownBtn"
            :class="showDownBtn ? 'showDownBtnAcitve' : ''"
          >
            <div
              @click="showPass = true"
              style="
                padding-bottom: 5px;
                border-bottom: 1px solid rgba(91, 126, 255, 1);
                margin-bottom: 5px;
              "
            >
              修改密码
            </div>
            <div @click="loginOut">退 出</div>
          </div>
        </span>
        <span class="line-q">|</span>
        <span>{{ currentTime }}</span>
        <span class="line-q">|</span>
        <span style="font-size: 14px">
          <span>{{ weekDay }}</span
          ><br />
          {{ dateTime }}
        </span>
      </div>
    </div>

    <!-- <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> Home </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-admin-template/"
          >
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://panjiachen.github.io/vue-element-admin-site/#/"
          >
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div> -->
    <!-- <div class="changePassBox" v-if="showPass"></div> -->
    <el-dialog
      title="修改密码"
      :visible.sync="showPass"
      class="changePassBox"
      append-to-body
    >
      <el-form
        ref="passForm"
        :model="passForm"
        :rules="passRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="username">
          <span> <img src="@/assets/index/Icon_user.png" alt="" />用户名 </span>
          <el-input ref="username" v-model="passForm.username" required />
        </el-form-item>

        <el-form-item prop="password">
          <span> <img src="@/assets/index/pass.png" alt="" />新密码</span>
          <el-input v-model="passForm.password" type="password" required />
        </el-form-item>
        <el-form-item prop="checkPass">
          <span> <img src="@/assets/index/pass.png" alt="" />确认密码 </span>
          <el-input v-model="passForm.checkPass" type="password" required />
        </el-form-item>
      </el-form>
      <div class="el-dialog__footer" style="padding-bottom: 10px">
        <span class="addBtn" @click="savePass"> 确 定 </span>
        <span class="addBtn closeBtn" @click="showPass = false"> 取 消 </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

import md5 from "js-md5";
import { updatePassword } from "@/api/user";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value == "" || !value) {
        callback(new Error(" "));
      } else {
        if (this.passForm.checkPass !== "") {
          this.$refs.passForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value == "" || !value) {
        callback(new Error(" "));
      } else if (value !== this.passForm.password) {
        callback(new Error(" "));
      } else {
        callback();
      }
    };
    return {
      weekDay: "",
      timer: "",
      dateTime: "",
      currentTime: "",
      userName: sessionStorage.getItem("userName"),
      passRules: {
        username: {
          required: true,
          message: " ",
          trigger: "blur",
        },
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      passForm: {},
      showDownBtn: false,
      showPass: false,
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
  created() {
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function () {
      _this.currentTime = //修改数据date
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds();
    }, 1000);
  },
  mounted() {
    this.userName = sessionStorage.getItem("userName");
    this.weekDay = this.getWeekDate();
    this.dateTime =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
  },
  methods: {
    getWeekDate() {
      var now = new Date();
      var day = now.getDay();
      var weeks = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      );
      var week = weeks[day];
      return week;
    },
    savePass() {
      this.$refs.passForm.validate((valid) => {
        if (valid) {
          updatePassword({
            account: this.passForm.username,
            userId: sessionStorage.getItem("userId"),
            password: md5(this.passForm.password),
          }).then((res) => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.showPass = false;
            // this.loginOut()
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    loginOut() {
      sessionStorage.setItem("loginState", "");

      this.$router.push({ path: "/login" });
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>
<style lang="scss" >
.changePassBox {
  .el-dialog {
    width: 320px;
    border-radius: 4px;
    .el-dialog__header {
      //
      background-color: rgba(23, 39, 90, 0.8);
      .el-dialog__title {
        color: #fff;
      }
    }
    .el-dialog__header::after {
      content: "";
      display: block;
      height: 1px;
      width: 100%;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
      margin-top: 10px;
    }
    .el-dialog__headerbtn {
      display: none;
    }

    .el-dialog__body {
      background-color: rgba(23, 39, 90, 0.8);
      padding: 0px 30px 10px;
      color: #e1e1e1;
      vertical-align: middle;
      span {
        vertical-align: middle;
        display: inline-block;
        width: 85px;
        img {
          margin-top: 10px;
          margin-right: 5px;
          vertical-align: top;
        }
      }
      .el-input {
        width: 66%;
      }
    }

    background: rgba(91, 126, 255, 0.3);
  }
}
</style>
<style lang="scss" scoped>
.showDownBtn {
  width: 100px;
  text-align: center;
  display: none;
  background: rgba(91, 126, 255, 0.6);
  border-radius: 4px;
  padding: 10px 5px;
  position: absolute;
  font-size: 16px;
  color: rgba(228, 234, 255, 1);
  margin-left: -20px;
  margin-top: 20px;
}
.showDownBtnAcitve {
  display: block;
}
.infoBox {
  float: right;
  line-height: 24px;
  padding-top: 12px;
  color: #ffffff;
  margin-right: 24px;
  font-size: 20px;
  img,
  span {
    display: inline-block;
    vertical-align: middle;
  }
  img {
    margin-right: 5px;
    margin-top: -2px;
  }
  span.line-q {
    color: rgba(255, 255, 255, 0.3);
    margin: 0px 10px;
  }
}
.navbar {
  z-index: 1;
  height: 68px;
  // overflow: hidden;
  position: relative;
  // background: #fff;

  background: linear-gradient(
    180deg,
    rgba(91, 126, 255, 0.06) 0%,
    rgba(91, 126, 255, 0.16)
  );
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .topSidebarImg {
    vertical-align: middle;
  }
  .topSidebar {
    height: 68px;
    line-height: 66px;
    display: inline;
    vertical-align: middle;
    margin: 0;
    padding: 0;
    margin-left: 20px;
    li.tjClass:hover {
      .drowBox {
        display: block;
      }
    }
    li {
      cursor: pointer;
      list-style: none;
      display: inline-block;
      width: 130px;
      height: 68px;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 400;
      color: #abbdff;
      text-align: center;
      background: url("../../assets/index/Button_Normal.png") no-repeat center;
      position: relative;
      .drowBox {
        cursor: pointer;
        display: none;
        position: absolute;
        text-align: center;
        line-height: 34px;
        width: 91%;
        top: 54px;
        padding-top: 10px;
        background: rgba(91, 126, 255, 0.4);

        border-radius: 4px;
        span {
          width: 80%;
          margin: 0 auto 10px;
          display: block;
          font-size: 14px;
          color: rgba(171, 189, 255, 1);
          background: linear-gradient(
            90deg,
            rgba(91, 126, 255, 0.4) 0%,
            rgba(138, 191, 255, 0.4) 47%,
            rgba(91, 126, 255, 0.4) 100%
          );
          border-radius: 4px;
          // border: 1px solid #5b7eff;
        }
        span:hover {
          border: 1px solid #5b7eff;
          color: #fff;
        }
        span.spanactive {
          border: 1px solid #5b7eff;
          color: #fff;
        }
        .disabledspan{
          background: rgba(91, 126, 255, .2)!important;
          color: rgba(171, 189, 255, .45)!important; 
        }
      }
    }
    li.topSidebarActive {
      background: url("../../assets/index/Button_Selected.png") no-repeat center;
      font-weight: 600;
      color: #ffffff;
    }
  }
}
</style>
