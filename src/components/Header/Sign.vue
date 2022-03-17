<template>
  <div>
    <div class="sign" v-if="!this.$store.state.isLogin">
      <el-link style="font-size:15px;" @click="login()">登陆</el-link>
      <el-link style="font-size:15px" @click="register()">注册</el-link>
    </div>
    <div class="avatar-box" v-if="this.$store.state.isLogin">
      <el-dropdown style="cursor: pointer;height: 40px;" trigger="click" @command="handleCommand">
        <el-avatar icon="el-icon-user"
                   style="color: #303133;background: white; box-shadow: 0 3px 4px rgba(0, 0, 0, .12), 0 0 7px rgba(0, 0, 0, .04)">
        </el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="font-size: 14px; color: #303133;text-align: center" disabled>{{this.$store.state.user.name}}</el-dropdown-item>
          <el-dropdown-item divided style="font-size: 12px" command="exit">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
        style="padding-top: 5px"
        :title="title"
        :visible.sync="visible"
        width="25%"
        :before-close="clear"
        v-loading="load"
        center>
      <div class="center">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user-solid" type="text" v-model="ruleForm.username" autocomplete="off"
                      :max="10" placeholder="请输入用户名"
                      clearable class="sign-input"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" :max="10" placeholder="请输入密码"
                      clearable class="sign-input"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass" v-if="title === '注册'">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" :max="10" placeholder="请再次输入密码"
                      clearable class="sign-input"></el-input>
          </el-form-item>
          <div class="center">
            <el-button type="primary" style="width: 250px" @click="submitForm('ruleForm')">
              {{ title === '登陆' ? '登陆' : '注册' }}
            </el-button>
          </div>
        </el-form>
      </div>
      <span slot="footer">
          <el-link icon="el-icon-s-promotion" @click="toggleSign">{{ title === '登陆' ? '快速注册' : '返回登陆' }}</el-link>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import instance from "../../utils/request";

export default {
  name: "Sign",
  components: {},
  data() {
    const checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'));
      } else if (value.length > 10) {
        return callback(new Error('用户名过长'));
      }
      callback();
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (value.length > 18) {
          return callback(new Error('密码过长'));
        }
        if (this.title === '登陆') {
          callback();
          return;
        }
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      title: '',
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
      },
      rules: {
        username: [
          {validator: checkUsername, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      },
      load: false
    }
  },
  methods: {
    login() {
      this.title = '登陆';
      this.visible = true;
    },
    register() {
      this.title = '注册';
      this.visible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const user = {
            username: this.ruleForm.username,
            password: this.ruleForm.password
          }
          if (this.title === '登陆') {
            this.logIn(user);
          } else {
            this.signIn(user);
          }
        } else {
          return false;
        }
      });
    },
    logIn(user) {
      this.load = true;
      instance.post('users/login', user).then(res => {
        if (res.data !== '') {
          this.$message({
            duration: 1000,
            message: '登陆成功',
            type: 'success'
          });
          localStorage.setItem('token', res.data);
          this.$store.state.isLogin = true;
          this.load = false;
          this.clear();
        } else {
          this.load = false;
          this.$message({
            duration: 1000,
            message: '用户名或密码错误',
            type: 'error'
          });
        }
      })
    },
    signIn(user) {
      this.load = true;
      instance.get('users/findByUsername/' + user.username).then(res => {
        this.load = false;
        if (res.data !== '') {
          this.$message({
            duration: 1000,
            message: '用户名已存在',
            type: 'error'
          });
        } else {
          instance.post('users/register', user).then(res => {
            this.load = false;
            this.$message({
              duration: 1000,
              message: '注册成功',
              type: 'success'
            });
            localStorage.removeItem('token');
            this.clear();
            this.login();
          }).catch(e => {
            this.load = false;
            this.$message({
              duration: 1000,
              message: '注册失败',
              type: 'error'
            });
          })
        }
      })
    },
    toggleSign() {
      this.clear();
      this.title = this.title === '登陆' ? '注册' : '登陆';
      this.visible = true;
    },
    clear() {
      this.visible = false;
      this.ruleForm.username = '';
      this.ruleForm.password = '';
      this.ruleForm.checkPass = '';
    },
    exit() {
      this.load = true;
      instance.get('users/logout').then(res => {
        if (res.status === 200) {
          localStorage.removeItem('token');
          this.load = false;
          this.$message({
            duration: 1000,
            message: '退出成功',
            type: 'success'
          });
          setTimeout(() => {
            location.reload();
          }, 400);
        }
      }).catch(e => {
        this.$message({
          duration: 1000,
          message: '退出失败',
          type: 'error'
        });
      })
    },
    handleCommand(command) {
      if (command === 'exit') {
        this.exit();
      }
    },
    parseToken(token) {
      let strings = token.split(".");
      return JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))))
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const obj = this.parseToken(token);
      this.$store.state.user = obj;
    }
  }
}
</script>

<style scoped>
.sign {
  width: 120px;
  float: right;
  line-height: 60px;
  margin-right: 80px;
  display: flex;
  justify-content: space-between;
}

.avatar-box {
  float: right;
  line-height: 85px;
  padding-right: 80px;
}
</style>