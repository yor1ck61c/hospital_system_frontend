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
        style="width: 700px; margin-left: 50px;margin-top: 20px;"
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
  </el-container>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { addCenter, updateCenter, getCenterTableData, deleteCenter } from '@/api/center'
export default {
  name: 'CenterManagement',
  data() {
    return {
      currentPage: 1,
      pagesize: 5,
      centerName: '',
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
      updateCenterVisible: false
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
