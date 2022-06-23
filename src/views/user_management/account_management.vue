<template>
  <el-container>
    <el-header>
      <div>
        <el-select v-model="hospitalName" filterable clearable placeholder="请选择医院" style="width: 15%;  margin-top: 30px;" @focus="getAcccountInfoTableData">
          <el-option
            v-for="item in hospitalNameList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" style="margin-left: 30px;" @click="searchHospital(hospitalName)">搜索</el-button>
        <el-button type="primary" style="margin-left: 30px;" @click="goToRegisterPage()">新增用户</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="acccountInfoTableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
        border
        style="margin-top: 30px;"
      >
        <el-table-column
          prop="id"
          label="id"
        />
        <el-table-column
          prop="username"
          label="用户名"
        />
        <el-table-column
          prop="password"
          label="密码"
        />
        <el-table-column
          prop="role"
          label="角色"
        />
        <el-table-column
          prop="hospitalName"
          label="医院名称"
        />
        <el-table-column
          prop="hospitalLevel"
          label="医院等级"
        />
        <el-table-column
          prop="hospitalType"
          label="医院类型"
        />
        <el-table-column
          prop="centerType"
          label="是否为中心医院"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updateUser(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[5, 10, 15]"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="acccountInfoTableData.length"
        style="text-align:center; margin-top: 50px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-main>
    <el-dialog
      title="更改用户信息"
      :visible.sync="updateUserInfoVisible"
      center
    >
      <el-form ref="updateRef" :model="userInfoForm" :rules="AccountRule">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input
            v-model="userInfoForm.username"
            autocomplete="off"
            style="width: 300px;"
          />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="userInfoForm.password"
            :type="passwordType"
            autocomplete="off"
            name="password"
            style="width: 300px;"
          />
          <span class="show-pwd" style="margin-left: 20px;" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
          <el-radio-group v-model="userInfoForm.role">
            <el-radio label="super_admin" />
            <el-radio label="hospital" />
            <el-radio label="sub_center" />
            <el-radio label="center" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="医院名称" :label-width="formLabelWidth" prop="hospitalName">
          <el-input
            v-model="userInfoForm.hospitalName"
            autocomplete="off"
            style="width: 300px;"
          />
        </el-form-item>
        <el-form-item label="医院等级" :label-width="formLabelWidth" prop="hospitalLevel">
          <el-select v-model="userInfoForm.hospitalLevel" filterable clearable placeholder="请选择医院等级" style="width: 300px;">
            <el-option
              v-for="item in levelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="医院类型" :label-width="formLabelWidth" prop="hospitalType">
          <el-select v-model="userInfoForm.hospitalType" filterable clearable placeholder="请选择医院类型" style="width: 300px;">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否为中心医院" :label-width="formLabelWidth" prop="centerType">
          <el-select v-model="userInfoForm.centerType" filterable clearable placeholder="请选择是否为中心医院" style="width: 300px;">
            <el-option
              v-for="item in centerType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateUserInfoVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo('updateRef')">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { getAccountInfoList, generateHospitalNameList, handleUpdate, deleteUserById } from '@/api/user'
import { Message, MessageBox } from 'element-ui'

export default {
  name: 'OtherHospitalInfo',
  data() {
    return {
      updateUserInfoVisible: false,
      // 更新用户表单对象
      userInfoForm: {
        id: '',
        username: '',
        password: '',
        role: '',
        hospitalName: '',
        hospitalLevel: '',
        hospitalType: '',
        centerType: ''
      },
      // 更新用户表单校验对象
      AccountRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        hospitalName: [
          { required: true, message: '请输入医院名称', trigger: 'blur' }
        ],
        hospitalLevel: [
          { required: true, message: '请输入医院等级', trigger: 'blur' }
        ],
        hospitalType: [
          { required: true, message: '请输入医院类型', trigger: 'blur' }
        ],
        centerType: [
          { required: true, message: '请输入中心类型', trigger: 'blur' }
        ]
      },
      currentPage: 1,
      pagesize: 5,
      hospitalName: '',
      hospitalNameList: [],
      acccountInfoTableData: [],
      formLabelWidth: '230px',
      passwordType: 'password',
      levelList: [
        {
          value: '省级',
          label: '省级'
        }, {
          value: '市级',
          label: '市级'
        }, {
          value: '县级',
          label: '县级'
        }
      ],
      centerType: [
        {
          value: '2',
          label: '主中心医院'
        }, {
          value: '1',
          label: '分中心医院'
        }, {
          value: '0',
          label: '非中心医院'
        }
      ],
      typeList: [{
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
      }]
    }
  },
  mounted() {
    this.getAcccountInfoTableData()
    this.getHospitalNameList()
  },
  methods: {
    // 分页方法
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    // 获取用户信息
    getAcccountInfoTableData() {
      var that = this
      that.acccountInfoTableData = []
      getAccountInfoList().then((res) => {
        const { data } = res
        that.acccountInfoTableData = data
      })
    },
    // 获取所有医院名称
    getHospitalNameList() {
      var that = this
      that.hospitalNameList = []
      generateHospitalNameList().then((res) => {
        const { data } = res
        that.generateItemNameList(that.hospitalNameList, data)
      })
    },
    // 搜索某个医院
    searchHospital(name) {
      if (name === '') {
        Message({
          message: '请先选择医院',
          type: 'error'
        })
        return
      }
      for (var i = 0; i < this.acccountInfoTableData.length; i++) {
        if (this.acccountInfoTableData[i].hospitalName === name) {
          var obj = this.acccountInfoTableData[i]
          this.acccountInfoTableData = []
          this.acccountInfoTableData.push(obj)
          break
        }
      }
      this.hospitalName = ''
    },
    // 通用方法，将后端返回来的名称数组变成可供el-option展示的形式。
    // list：要渲染的数组。data：只包含数据的数组。返回{label value}均为data中item_name的对象数组。
    generateItemNameList(list, data) {
      for (var i = 0; i < data.length; i++) {
        var tempObj = {}
        tempObj.value = data[i]
        tempObj.label = data[i]
        list.push(tempObj)
      }
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
    // 点击编辑后的方法
    updateUser(data) {
      this.userInfoForm = data
      this.updateUserInfoVisible = true
    },
    // 更新用户信息
    updateUserInfo: function(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          handleUpdate(this.userInfoForm).then(() => {
            Message.success({
              message: '更改成功！'
            })
            this.updateUserInfoVisible = false
            setTimeout(() => {
              this.getAcccountInfoTableData()
              this.getHospitalNameList()
            }, 500)
          })
        } else {
          Message.error({
            message: '请填写正确的信息！'
          })
          return false
        }
      })
    },
    deleteUser(userInfo) {
      var that = this
      MessageBox.confirm('确定删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserById(userInfo.id).then((res) => {
          Message.success({
            message: res.msg || '删除失败！'
          })
          that.getAcccountInfoTableData()
        }).catch(() => {
          Message.warning({
            message: '删除失败'
          })
        })
      }).catch(() => {
        Message.info({
          message: '已取消删除'
        })
      })
    },
    goToRegisterPage() {
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>
