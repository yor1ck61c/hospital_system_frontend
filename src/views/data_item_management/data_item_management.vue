<template>
  <el-container>
    <el-tabs v-model="activeName" type="border-card" style="margin-left: 50px; margin-top: 50px; width: 1000px;" @tab-click="handleClick">
      <el-tab-pane label="单个指标管理" name="single">
        <div>
          <el-select v-model="itemName" size="mini" filterable clearable placeholder="请选择单个指标" style="width: 200px; margin-top: 30px;" @focus="generateItemNameTableData">
            <el-option
              v-for="item in itemNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" size="mini" style="margin-left: 10px;" @click="searchItem()">搜索</el-button>
          <el-input
            v-model="bioFeatureItem.itemName"
            size="mini"
            placeholder="请输入要添加的单个指标名称"
            style="width: 200px; margin-left: 20px;"
          />
          <el-button type="primary" size="mini" style="margin-left: 10px;" @click="addSingleItem()">添加单个指标</el-button>
          <el-table
            :data="itemNameTableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
            border
            style="margin-top: 20px;"
          >
            <el-table-column
              prop="bioFeatureItemId"
              label="id"
              width="150px"
            />
            <el-table-column
              prop="itemName"
              label="指标名"
            />
            <el-table-column
              label="操作"
              width="150px"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="deleteItemName(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-sizes="[5, 10, 15]"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="itemNameTableData.length"
            style="text-align:center; margin-top: 50px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="指标项管理" name="double">
        <div>
          <el-select v-model="combinedItemName" size="mini" filterable clearable placeholder="请选择指标" style="width: 150px; margin-top: 10px;" @focus="generateCombinedItemNameTableData">
            <el-option
              v-for="item in combinedItemNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" size="mini" style="margin-left: 10px;" @click="searchCombinedItem(combinedItemName)">搜索</el-button>
          <el-button type="primary" size="mini" style="margin-left: 10px;" @click="addCombinedItemVisible = true">添加指标项</el-button>
          <el-dialog
            title="添加指标项"
            :visible.sync="addCombinedItemVisible"
            center="true"
          >
            <el-form ref="addRef" :model="newCombinedItemForm" :rules="addRule">
              <el-form-item label="指标名" :label-width="formLabelWidth" prop="itemName">
                <el-input
                  v-model="newCombinedItemForm.itemName"
                  autocomplete="off"
                  style="width: 300px;"
                  placeholder="请输入指标名"
                />
              </el-form-item>
              <el-form-item label="公式分子指标名" :label-width="formLabelWidth" prop="numerator">
                <el-select v-model="newCombinedItemForm.numerator" filterable clearable placeholder="请选择公式分子指标名" style="width: 300px;">
                  <el-option
                    v-for="item in itemNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="公式分母指标名" :label-width="formLabelWidth" prop="denominator">
                <el-select v-model="newCombinedItemForm.denominator" filterable clearable placeholder="请选择公式分母指标名" style="width: 300px;">
                  <el-option
                    v-for="item in itemNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="比率" :label-width="formLabelWidth" prop="ratio">
                <el-select v-model="newCombinedItemForm.ratio" filterable clearable placeholder="请选择比率" style="width: 300px;">
                  <el-option
                    v-for="item in ratioList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="定义" :label-width="formLabelWidth" prop="definition">
                <el-input
                  v-model="newCombinedItemForm.definition"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入指标定义"
                />
              </el-form-item>
              <el-form-item label="说明" :label-width="formLabelWidth" prop="description">
                <el-input
                  v-model="newCombinedItemForm.description"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入指标说明"
                />
              </el-form-item>
              <el-form-item label="意义" :label-width="formLabelWidth" prop="meaning">
                <el-input
                  v-model="newCombinedItemForm.meaning"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入指标意义"
                />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addCombinedItemVisible = false">取 消</el-button>
              <el-button type="primary" @click="addCombinedItem('addRef')">确 定</el-button>
            </div>
          </el-dialog>
          <el-table
            :data="combinedItemNameTableData.slice((currentPage2 - 1) * pagesize2, currentPage2 * pagesize2)"
            border
            style="margin-top: 20px;"
          >
            <el-table-column
              prop="cbfiBfiMappingId"
              label="id"
              width="100px"
            />
            <el-table-column
              prop="itemName"
              label="指标名"
              width="250px"
            />
            <el-table-column
              prop="numerator"
              label="分子指标名"
              width="250px"
            />
            <el-table-column
              prop="denominator"
              label="分母指标名"
              width="250px"
            />
            <el-table-column
              label="操作"
              width="100px"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="deleteCombinedItemName(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-sizes="[5, 10, 15]"
            :current-page="currentPage2"
            :page-size="pagesize2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="combinedItemNameTableData.length"
            style="text-align:center; margin-top: 50px;"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import { getItemNameList, getItemNameTableData, addItem, deleteItem, getCombinedItemNameTableData } from '@/api/bio_feature'
import { getCombinedBioFeatureItemNameList, deleteCombinedItem, addCombinedItem } from '@/api/bio_feature'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'DataItemManagement',
  data() {
    return {
      currentPage: 1,
      pagesize: 5,
      currentPage2: 1,
      pagesize2: 5,
      activeName: 'single',
      bioFeatureItem: {
        itemName: ''
      },
      itemName: '',
      itemNameList: [],
      addItemName: '',
      itemNameTableData: [],
      combinedItemName: '',
      combinedItemNameList: [],
      combinedItemNameTableData: [],
      addCombinedItemVisible: false,
      newCombinedItemForm: {
        itemName: '',
        numerator: '',
        denominator: '',
        ratio: '100',
        definition: '',
        description: '',
        meaning: ''
      },
      formLabelWidth: '120px',
      addRule: {
        itemName: [
          { required: true, message: '请输入指标名', trigger: 'blur' }
        ],
        numerator: [
          { required: true, message: '请输入公式分子指标项', trigger: 'change' }
        ],
        denominator: [
          { required: true, message: '请选择公式分母指标项', trigger: 'change' }
        ],
        ratio: [
          { required: true, message: '请选择比率', trigger: 'change' }
        ],
        definition: [
          { required: true, message: '请输入指标定义', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入指标说明', trigger: 'blur' }
        ],
        meaning: [
          { required: true, message: '请输入指标意义', trigger: 'blur' }
        ]
      },
      ratioList: [{
        value: '100',
        label: '100%'
      }, {
        value: '1000',
        label: '1000%'
      }, {
        value: '10000',
        label: '10000%'
      }]
    }
  },
  mounted() {
    this.generateSingleItemName()
    this.generateItemNameTableData()
  },
  methods: {
    handleClick() {
      if (this.combinedItemNameList.length === 0) {
        this.generateCombinedItemName()
      }
      if (this.combinedItemNameTableData.length === 0) {
        this.generateCombinedItemNameTableData()
      }
    },
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
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange2: function(currentPage) {
      this.currentPage2 = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    // 生成指标项搜索列表
    generateSingleItemName() {
      var that = this
      this.itemNameList = []
      if (this.itemNameList.length === 0) {
        getItemNameList().then((res) => {
          const { data } = res
          that.generateItemNameList(that.itemNameList, data)
        })
      } else {
        console.log('已完成加载')
      }
    },
    generateCombinedItemName() {
      var that = this
      this.combinedItemNameList = []
      if (this.combinedItemNameList.length === 0) {
        getCombinedBioFeatureItemNameList().then((res) => {
          const { data } = res
          this.generateItemNameList(that.combinedItemNameList, data)
        })
      } else {
        console.log('已完成加载')
      }
    },
    // 通用方法，将后端返回来的名称数组变成可供el-option展示的形式。
    // list：要渲染的数组。data：只包含item_name的数组。返回{label value}均为data中item_name的对象数组。
    generateItemNameList(list, data) {
      for (var i = 0; i < data.length; i++) {
        var tempObj = {}
        tempObj.value = data[i].itemName
        tempObj.label = data[i].itemName
        list.push(tempObj)
      }
    },
    // 获取表格数据
    generateItemNameTableData() {
      var that = this
      getItemNameTableData().then((res) => {
        that.itemNameTableData = []
        const { data } = res
        that.itemNameTableData = data
      })
    },
    generateCombinedItemNameTableData() {
      var that = this
      getCombinedItemNameTableData().then((res) => {
        that.combinedItemNameTableData = []
        const { data } = res
        that.combinedItemNameTableData = data
      })
    },
    // 搜索指定指标项
    searchItem() {
      if (this.itemName === '') {
        Message({
          message: '请先选择指标',
          type: 'error'
        })
        return
      }
      for (var i = 0; i < this.itemNameTableData.length; i++) {
        if (this.itemNameTableData[i].itemName === this.itemName) {
          var obj = this.itemNameTableData[i]
          this.itemNameTableData = []
          this.itemNameTableData.push(obj)
          break
        }
      }
      this.itemName = ''
    },
    searchCombinedItem(name) {
      if (name === '') {
        Message({
          message: '请先选择指标',
          type: 'error'
        })
        return
      }
      for (var i = 0; i < this.combinedItemNameTableData.length; i++) {
        if (this.combinedItemNameTableData[i].itemName === name) {
          var obj = this.combinedItemNameTableData[i]
          this.combinedItemNameTableData = []
          this.combinedItemNameTableData.push(obj)
          break
        }
      }
      this.combinedItemName = ''
    },
    // 添加单个指标项
    addSingleItem() {
      var that = this
      if (that.bioFeatureItem.itemName === '') {
        Message({
          message: '指标项不能为空！',
          type: 'error'
        })
        return
      }
      addItem(that.bioFeatureItem).then((res) => {
        Message.success({
          message: res.msg || '添加失败'
        })
        setTimeout(() => {
          this.generateSingleItemName()
          this.generateItemNameTableData()
        }, 500)
      })
    },
    // 添加组合指标项
    // 删除一个指标项
    deleteItemName(data) {
      MessageBox.confirm('确定删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteItem(data).then((res) => {
          Message.success({
            message: res.msg || '删除失败！'
          })
          setTimeout(() => {
            this.generateSingleItemName()
            this.generateItemNameTableData()
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
    deleteCombinedItemName(data) {
      MessageBox.confirm('确定删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCombinedItem(data).then((res) => {
          Message.success({
            message: res.msg || '删除失败！'
          })
          setTimeout(() => {
            this.generateCombinedItemName()
            this.generateCombinedItemNameTableData()
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
    addCombinedItem: function(refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          addCombinedItem(this.newCombinedItemForm).then(() => {
            Message.success({
              message: '添加成功！'
            })
            this.addCombinedItemVisible = false
            setTimeout(() => {
              this.generateCombinedItemName()
              this.generateCombinedItemNameTableData()
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
