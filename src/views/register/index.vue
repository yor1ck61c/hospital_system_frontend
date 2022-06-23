<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">新用户注册</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="请输入用户名，6 ~ 12位"
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
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          prop="password"
          @keyup.enter.native="handleRegister"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="rePassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="rePasswordType"
          ref="rePassword"
          v-model="registerForm.rePassword"
          :type="rePasswordType"
          placeholder="请再次输入密码"
          name="rePassword"
          tabindex="3"
          prop="rePassword"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showRePwd">
          <svg-icon
            :icon-class="rePasswordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item prop="hospitalName">
        <span class="svg-container">
          <i class="el-icon-edit" />
        </span>
        <el-input
          v-model="registerForm.hospitalName"
          placeholder="请输入医院名称"
          name="hospitalName"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="hospitalType">
        <span class="svg-container">
          <i class="el-icon-edit" />
        </span>
        <el-select
          v-model="registerForm.hospitalType"
          prop="hospitalType"
          filterable
          placeholder="请选择医院类型"
          style="width: 90%;"
        >
          <el-option
            v-for="item in hospitalTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="hospitalLevel">
        <span class="svg-container">
          <i class="el-icon-edit" />
        </span>
        <el-select
          v-model="registerForm.hospitalLevel"
          name="hospitalLevel"
          filterable
          placeholder="请选择医院等级"
          style="width: 90%;"
        >
          <el-option
            v-for="item in hospitalLevelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="centerType">
        <span class="svg-container">
          <i class="el-icon-edit" />
        </span>
        <el-select
          v-model="registerForm.centerType"
          filterable
          placeholder="请选择是否为分中心/主中心"
          style="width: 90%;"
        >
          <el-option
            v-for="item in centerTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="centerName">
        <span class="svg-container">
          <i class="el-icon-edit" />
        </span>
        <el-select
          v-model="registerForm.centerId"
          clearable
          filterable
          placeholder="请选择所在中心名称"
          style="width: 90%;"
        >
          <el-option
            v-for="item in centerNameList"
            :key="item.centerId"
            :label="item.centerName"
            :value="item.centerId"
          />
        </el-select>
      </el-form-item>
      <div style="width: 100%; text-align: center; margin-top: 0px;">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 20%; margin-bottom: 30px; margin-top: 20px;"
          @click.native.prevent="handleRegister"
        >注册</el-button>
        <el-button
          type="primary"
          style="width: 20%; margin-bottom: 30px; margin-left: 90px"
          @click.native.prevent="backToLoginPage"
        >返回</el-button>
      </div>
      <div class="tips" />
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/user'
import { Message } from 'element-ui'
import { getCenterTableData } from '@/api/center'
export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('用户名长度不能小于6位'))
      } else if (value.length > 12) {
        callback(new Error('用户名长度不能大于12位'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不能小于6位'))
      } else {
        callback()
      }
    }
    const validateRePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不能小于6位'))
      } else if (this.registerForm.password !== value) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }

    return {
      registerForm: {
        username: '',
        password: '',
        role: '', // 默认为普通用户
        rePassword: '',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        introduction: '',
        hospitalName: '',
        hospitalLevel: '', // 医院等级：省级/市级/县级/无
        hospitalType: '', // 医院类型：综合/中医/妇幼/非公益/无
        centerType: '', // 中心类型，是否为主中心/分中心。主中心：2 分中心：1 普通医院：0
        centerId: ''
      },
      registerRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        rePassword: [
          { required: true, trigger: 'blur', validator: validateRePassword }
        ],
        hospitalName: [
          { required: true, message: '请输入医院名称', trigger: 'blur' }
        ],
        hospitalLevel: [
          { required: true, message: '请选择医院等级', trigger: 'change' }
        ],
        hospitalType: [
          { required: true, message: '请选择医院类型', trigger: 'change' }
        ],
        centerType: [
          { required: true, message: '请选择是否为分中心/主中心', trigger: 'change' }
        ],
        centerId: [
          { required: true, message: '请选择所属中心名称', trigger: 'change' }
        ]
      },
      hospitalLevelOptions: [{
        value: '省级',
        label: '省级'
      }, {
        value: '市级',
        label: '市级'
      }, {
        value: '县级',
        label: '县级'
      }, {
        value: '无',
        label: '无'
      }],
      hospitalTypeOptions: [{
        value: '综合医院',
        label: '综合医院'
      }, {
        value: '中医院',
        label: '中医院'
      }, {
        value: '妇幼医院',
        label: '妇幼医院'
      }, {
        value: '非公立医院',
        label: '非公立医院'
      }, {
        value: '无',
        label: '无'
      }],
      centerTypeOptions: [{
        value: '0',
        label: '普通医院'
      }, {
        value: '1',
        label: '分中心账号'
      }, {
        value: '2',
        label: '主中心账号'
      }],
      loading: false,
      passwordType: 'password',
      rePasswordType: 'password',
      redirect: undefined,
      centerNameList: []
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    this.generateCenterInfo()
  },
  methods: {
    generateCenterInfo() {
      var that = this
      that.centerNameList = []
      getCenterTableData().then((res) => {
        that.centerNameList = res.data
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showRePwd() {
      if (this.rePasswordType === 'password') {
        this.rePasswordType = ''
      } else {
        this.rePasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.rePasswordType.focus()
      })
    },
    handleRegister() {
      var that = this
      // 调用了element-ui自带的表单校验async-validator
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 播放加载动画
          this.loading = true
          // eslint-disable-next-line eqeqeq
          if (that.registerForm.centerType == 0) {
            that.registerForm.role = 'hospital'
          }
          // eslint-disable-next-line eqeqeq
          if (that.registerForm.centerType == 1) {
            that.registerForm.role = 'sub_center'
          }
          // eslint-disable-next-line eqeqeq
          if (that.registerForm.centerType == 2) {
            that.registerForm.role = 'center'
          }
          register(that.registerForm).then((res) => {
            const result = res.data
            // 返回结果不为空
            if (result != null) {
              if (result.code === 20000) {
                // 注册成功
                Message.success({
                  message: result.msg
                })
                that.backToLoginPageWithData(result.data)
              }
              if (res.data.code === 30001) {
              // 用户名重复
                Message.error({
                  message:
                  '当前用户名已被注册'
                })
              }
              if (res.data.code === 30000) {
              // 用户名重复
                Message.error({
                  message:
                  '注册失败'
                })
              }
            // 返回结果为空
            } else {
              Message.error({
                message:
                  '注册失败'
              })
            }
            that.loading = false
          })
        // 没有通过表单校验
        } else {
          // 表单内容有误，阻止提交。
          console.log('error submit!!')
          Message.warning({
            message: '填写信息有误'
          })
          return false
        }
      })
    },
    backToLoginPage() {
      this.$router.push({
        path: '/login'
      })
    },
    backToLoginPageWithData(data) {
      this.$router.push({
        name: 'login',
        params: {
          username: data.username,
          password: data.password
        }
      })
    }
  }
}
</script>

<style lang='scss'>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
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
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 70px 35px 0;
    margin: 0 auto;
    overflow: hidden;
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
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 30px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
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
}
</style>
