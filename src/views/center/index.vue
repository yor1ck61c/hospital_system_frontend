<template>
  <el-container>
    <el-header>
      <div>
        <el-select v-model="centerName" filterable clearable placeholder="请选择中心名称" style="width: 20%; margin-left: 50px; margin-top: 30px;" @focus="generateCenterTable">
          <el-option
            v-for="item in centerNameList"
            :key="item.centerId"
            :label="item.centerName"
            :value="item.centerName"
          />
        </el-select>
        <el-button type="primary" style="margin-left: 20px;" @click="searchCenter()">搜索</el-button>
        <el-button type="primary" style="margin-left: 20px;" @click="addCenterVisible = true">新增中心</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="centerTableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
        border
        style="width: 1000px; margin-left: 50px;margin-top: 20px;"
      >
        <el-table-column
          prop="centerId"
          label="中心id"
        />
        <el-table-column
          prop="centerName"
          label="中心名称"
        />
        <el-table-column
          prop="centerType"
          label="中心类型"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updateCenter(scope.row)">更改</el-button>
            <el-button type="text" size="small" @click="deleteCenter(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="findHospitalList(scope.row)">查看属于该中心的医院列表</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[5, 10, 15]"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="centerTableData.length"
        style="margin-left: 200px; margin-top: 50px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-main>
    <el-dialog
      title="新增中心"
      :visible.sync="addCenterVisible"
      style="text-align: center"
      center
    >
      <el-form ref="addRef" :model="newCenterForm" :rules="addRule">
        <el-form-item label="中心名称" :label-width="formLabelWidth" prop="centerName">
          <el-input
            v-model="newCenterForm.centerName"
            autocomplete="off"
            style="width: 300px;"
            placeholder="请输入中心名称"
          />
        </el-form-item>
        <el-form-item label="中心类型" :label-width="formLabelWidth" prop="centerType">
          <el-select v-model="newCenterForm.centerType" filterable clearable placeholder="请选择中心类型" style="width: 300px;">
            <el-option
              v-for="item in centerTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCenterVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCenter('addRef')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="更改中心信息"
      :visible.sync="updateCenterVisible"
      style="text-align: center"
      center
    >
      <el-form ref="updateRef" :model="newCenterForm" :rules="addRule">
        <el-form-item label="中心名称" :label-width="formLabelWidth" prop="centerName">
          <el-input
            v-model="newCenterForm.centerName"
            autocomplete="off"
            style="width: 300px;"
            placeholder="请输入中心名称"
          />
        </el-form-item>
        <el-form-item label="中心类型" :label-width="formLabelWidth" prop="centerType">
          <el-select v-model="newCenterForm.centerType" filterable clearable placeholder="请选择中心类型" style="width: 300px;">
            <el-option
              v-for="item in centerTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateCenterVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCenterInfo('updateRef')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="tableCenterName"
      :visible.sync="hospitalListTableVisible"
      style="text-align: center"
      center
    >
      <el-table
        :data="hospitalInfoList.slice((currentPage2 - 1) * pagesize2, currentPage2 * pagesize2)"
        border
      >
        <!-- style="width: 1000px; margin-left: 50px;margin-top: 20px;" -->
        <el-table-column
          prop="id"
          label="医院用户id"
        />
        <el-table-column
          prop="hospitalName"
          label="医院名称"
        />
        <el-table-column
          prop="hospitalType"
          label="医院类型"
        />
        <el-table-column
          prop="hospitalLevel"
          label="医院等级"
        />
      </el-table>
      <el-pagination
        :page-sizes="[5, 10]"
        :current-page="currentPage2"
        :page-size="pagesize2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="hospitalInfoList.length"
        style="margin-left: 200px; margin-top: 50px;"
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="hospitalListTableVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { addCenter, updateCenter, getCenterTableData, deleteCenter, getHospitalInfoListByCenterId } from '@/api/center'
export default {
  name: 'CenterManagement',
  data() {
    return {
      currentPage: 1,
      pagesize: 5,
      currentPage2: 1,
      pagesize2: 5,
      // 查找中心时输入的中心名称
      centerName: '',
      // 表格title显示的中心名称
      tableCenterName: '',
      // 医院列表table的数据，包括医院id，医院名称，医院类型
      hospitalInfoList: '',
      centerNameList: [],
      centerTableData: [],
      newCenterForm: {
        centerName: '',
        centerType: ''
      },
      addCenterVisible: false,
      centerTypeList: [{
        value: '1',
        label: '分中心'
      }, {
        value: '2',
        label: '主中心'
      }
      ],
      formLabelWidth: '120px',
      addRule: {
        centerName: [
          { required: true, message: '请输入中心名称', trigger: 'blur' }
        ],
        centerType: [
          { required: true, message: '请选择中心类型', trigger: 'blur' }
        ]
      },
      updateCenterVisible: false,
      hospitalListTableVisible: false
    }
  },
  mounted() {
    this.generateCenterTable()
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
    handleSizeChange2: function(size) {
      this.pagesize2 = size
      console.log(this.pagesize2) // 每页下拉显示数据
    },
    handleCurrentChange2: function(currentPage) {
      this.currentPage2 = currentPage
      console.log(this.currentPage2) // 点击第几页
    },
    generateCenterTable() {
      var that = this
      getCenterTableData().then((res) => {
        that.centerTableData = []
        const { data } = res
        that.centerTableData = data
        that.centerNameList = data
      })
    },
    searchCenter() {
      if (this.centerName === '') {
        Message({
          message: '请先选择中心名称',
          type: 'error'
        })
        return
      }
      for (var i = 0; i < this.centerTableData.length; i++) {
        if (this.centerTableData[i].centerName === this.centerName) {
          var obj = this.centerTableData[i]
          this.centerTableData = []
          this.centerTableData.push(obj)
          break
        }
      }
      this.centerName = ''
    },
    updateCenter(center) {
      this.updateCenterVisible = true
      this.newCenterForm = center
    },
    findHospitalList(center) {
      this.tableCenterName = center.centerName
      this.hospitalListTableVisible = true
      var that = this
      getHospitalInfoListByCenterId(center.centerId).then((res) => {
        that.hospitalInfoList = res.data
      })
      // 打印hospitalInfoList的长度
      console.log(this.hospitalInfoList.length)
    },
    deleteCenter(data) {
      MessageBox.confirm('确定删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCenter(data).then((res) => {
          Message.success({
            message: res.msg || '删除失败！'
          })
          setTimeout(() => {
            this.generateCenterTable()
          }, 500)
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
    addCenter: function(refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          addCenter(this.newCenterForm).then(() => {
            Message.success({
              message: '添加成功！'
            })
            this.addCenterVisible = false
            setTimeout(() => {
              this.generateCenterTable()
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
    updateCenterInfo: function(refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          updateCenter(this.newCenterForm).then(() => {
            Message.success({
              message: '更新成功！'
            })
            this.updateCenterVisible = false
            setTimeout(() => {
              this.generateCenterTable()
            }, 500)
          })
        } else {
          Message.error({
            message: '请填写正确的信息！'
          })
          return false
        }
      })
    }
  }
}
</script>
