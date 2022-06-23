<template>
  <el-container>
    <el-header>
      <div>
        <el-select v-model="centerId" size="mini" filterable clearable placeholder="请选择中心名称" style="width: 12%; margin-left: 50px; margin-top: 30px;">
          <el-option
            v-for="item in centerNameList"
            :key="item.centerId"
            :label="item.centerName"
            :value="item.centerId"
          />
        </el-select>
        <el-select v-model="hospitalName" size="mini" filterable clearable placeholder="请选择医院" style="width: 12%; margin-left: 20px; margin-top: 30px;" @focus="generateHosptialNameList">
          <el-option
            v-for="item in hospitalNameList"
            :key="item.id"
            :label="item.hospitalName"
            :value="item.hospitalName"
          />
        </el-select>
        <el-button type="primary" size="mini" style="margin-left: 20px;" @click="searchHospital()">搜索</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="hospitalTableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
        border
        style="width: 700px; margin-left: 50px;margin-top: 20px;"
        size="mini"
      >
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
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleGrant(scope.row)">授予权限</el-button>
            <el-button type="text" size="small" @click="deleteVisible=true; generatetempAuthenticationTableData(scope.row)">更改权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[5, 10, 15]"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="hospitalTableData.length"
        style="margin-left: 150px; margin-top: 50px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-dialog
        title="授予查看权限"
        :visible.sync="grantVisible"
        center
      >
        <el-form :model="grantInfoForm">
          <el-select v-model="centerId2" filterable clearable placeholder="请选择中心名称" style="width: 20%; margin-left: 50px; margin-top: 30px;">
            <el-option
              v-for="item in centerNameList"
              :key="item.centerId"
              :label="item.centerName"
              :value="item.centerId"
            />
          </el-select>
          <el-select v-model="grantInfoForm.otherHospitalUserId" filterable clearable placeholder="请选择授予查看权限的医院" style="width: 30%; margin-left: 50px; margin-top: 30px;" @focus="generateHosptialNameList2">
            <el-option
              v-for="item in hospitalNameList2"
              :key="item.id"
              :label="item.hospitalName"
              :value="item.id"
            />
          </el-select>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="grantVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGrant()">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="临时权限列表"
        :visible.sync="deleteVisible"
        center
      >
        <el-table
          :data="tempAuthenticationTableData"
          border
          style="width: 650px; margin-left: 50px;margin-top: 20px;"
        >
          <el-table-column
            prop="hospitalName"
            label="医院名称"
          />
          <el-table-column
            prop="otherHospitalName"
            label="可查看医院名称"
          />
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除权限</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </el-main>

  </el-container>
</template>

<script>
import { getCenterTableData, generateHospitalTableData, saveTempGrand, generateTempAuthTableData, deleteTempAuth, getViceCenterName } from '@/api/center'
import { Message, MessageBox } from 'element-ui'

export default {
  name: 'OtherHospitalInfo',
  data() {
    return {
      hospitalName: '',
      centerId: '',
      centerId2: '',
      hospitalNameList: [],
      hospitalNameList2: [],
      centerNameList: [],
      hospitalTableData: [],
      grantVisible: false,
      deleteVisible: false,
      currentPage: 1,
      pagesize: 5,
      grantInfoForm: {
        userId: '',
        otherHospitalUserId: ''
      },
      tempAuthenticationTableData: []
    }
  },
  mounted() {
    this.generateHosptialTableList()
  },
  methods: {
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    handleGrant(data) {
      this.grantVisible = true
      this.grantInfoForm.userId = data.id
    },
    addGrant() {
      saveTempGrand(this.grantInfoForm).then((res) => {
        Message({
          message: res.msg,
          type: 'success'
        })
      })
      this.grantVisible = false
    },
    generateHosptialTableList() {
      var that = this
      var centerType = this.$store.getters.centerType
      // eslint-disable-next-line eqeqeq
      if (centerType == 2) {
        getCenterTableData().then((res) => {
          that.centerNameList = res.data
        })
      }
      // eslint-disable-next-line eqeqeq
      if (centerType == 1) {
        getViceCenterName(this.$store.getters.userId).then((res) => {
          const { data } = res
          that.centerNameList.push(data)
        })
      }
    },
    generateHosptialNameList() {
      var that = this
      if (this.centerId === '') {
        Message({
          message: '请先选择中心名称',
          type: 'error'
        })
        return
      } else {
        generateHospitalTableData(this.centerId).then((res) => {
          that.hospitalNameList = res.data
          that.hospitalTableData = res.data
        })
      }
    },
    generateHosptialNameList2() {
      var that = this
      if (this.centerId2 === '') {
        Message({
          message: '请先选择中心名称',
          type: 'error'
        })
        return
      } else {
        generateHospitalTableData(this.centerId2).then((res) => {
          that.hospitalNameList2 = res.data
        })
      }
    },
    searchHospital() {
      if (this.hospitalName === '') {
        this.generateHosptialNameList()
      }
      for (var i = 0; i < this.hospitalTableData.length; i++) {
        if (this.hospitalTableData[i].hospitalName === this.hospitalName) {
          var obj = this.hospitalTableData[i]
          this.hospitalTableData = []
          this.hospitalTableData.push(obj)
          break
        }
      }
      this.hospitalName = ''
    },
    generatetempAuthenticationTableData(data) {
      var that = this
      generateTempAuthTableData(data.id).then((res) => {
        that.tempAuthenticationTableData = res.data
      })
    },
    handleDelete(data) {
      var that = this
      MessageBox.confirm('确定删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTempAuth(data).then((res) => {
          Message.success({
            message: res.msg || '删除失败！'
          })
          generateTempAuthTableData(data.userId).then((res) => {
            that.tempAuthenticationTableData = res.data
          })
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
    }
  }
}
</script>
