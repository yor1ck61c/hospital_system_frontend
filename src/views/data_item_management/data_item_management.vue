<template>
  <el-container>
    <el-tabs v-model="activeName" type="border-card" style="margin-left: 50px; margin-top: 30px; width: 1000px;">
      <el-tab-pane label="单个指标管理" name="single">
        <div>
          <el-select v-model="itemName" size="mini" filterable clearable placeholder="请选择单个指标" style="width: 200px; margin-top: 10px;" @focus="generateSingleItemTableData()">
            <el-option
              v-for="item in itemNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" size="mini" style="margin-left: 10px;" @click="searchSingleItem()">搜索</el-button>
          <el-input
            v-model="bioFeatureItem.itemName"
            size="mini"
            placeholder="请输入要添加的单个指标名称"
            style="width: 200px; margin-left: 20px;"
          />
          <el-button type="primary" size="mini" style="margin-left: 10px;" @click="addSingleItem()">添加单个指标</el-button>
          <el-table
            :data="singleItemTableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
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
            >
              <template slot-scope="scope">
                <input v-model="scope.row.itemName" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="150px"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="updateSingleItem(scope.row)">更改</el-button>
                <el-button type="text" size="small" @click="deleteSingleItem(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-sizes="[5, 10, 15]"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="singleItemTableData.length"
            style="text-align:center; margin-top: 50px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="组合指标管理" name="combined">
        <div>
          <el-select v-model="searchType" size="mini" filterable clearable placeholder="搜索条件" style="width: 150px; margin-top: 10px;" @change="generateSearchItemList()">
            <el-option
              v-for="item in searchTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="combinedItemName" size="mini" filterable clearable placeholder="请选择指标" style="width: 150px; margin-top: 10px; margin-left: 5px;" @focus="checkSearchType()">
            <el-option
              v-for="item in searchItemList"
              :key="item.cbfiBfiMappingId"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" size="mini" style="margin-left: 10px;" @click="searchCombinedItem(combinedItemName)">搜索</el-button>
          <el-button type="primary" size="mini" style="margin-left: 10px;" @click="generateCombinedItemTableData()">刷新表格</el-button>
          <el-button type="primary" size="mini" style="margin-left: 10px;" @click="addCombinedItemVisible = true">添加指标项</el-button>
          <el-dialog
            title="添加指标项"
            :visible.sync="addCombinedItemVisible"
            :center="true"
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
              <el-form-item label="指标代码" :label-width="formLabelWidth" prop="code">
                <el-input
                  v-model="newCombinedItemForm.code"
                  placeholder="请输入指标代码"
                />
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
          <el-dialog
            title="更新指标项"
            :visible.sync="updateCombinedItemVisible"
            :center="true"
          >
            <el-form ref="updateRef" :model="updateCombinedItemForm" :rules="updateRule">
              <el-form-item label="指标名" :label-width="formLabelWidth" prop="itemName">
                <el-input
                  v-model="updateCombinedItemForm.itemName"
                  autocomplete="off"
                  style="width: 300px;"
                  placeholder="请输入指标名"
                />
              </el-form-item>
              <el-form-item label="公式分子指标名" :label-width="formLabelWidth" prop="numerator">
                <el-select v-model="updateCombinedItemForm.numerator" filterable clearable placeholder="请选择公式分子指标名" style="width: 300px;">
                  <el-option
                    v-for="item in itemNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="公式分母指标名" :label-width="formLabelWidth" prop="denominator">
                <el-select v-model="updateCombinedItemForm.denominator" filterable clearable placeholder="请选择公式分母指标名" style="width: 300px;">
                  <el-option
                    v-for="item in itemNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="比率" :label-width="formLabelWidth" prop="ratio">
                <el-select v-model="updateCombinedItemForm.ratio" filterable clearable placeholder="请选择比率" style="width: 300px;">
                  <el-option
                    v-for="item in ratioList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="指标代码" :label-width="formLabelWidth" prop="code">
                <el-input
                  v-model="updateCombinedItemForm.code"
                  placeholder="请输入指标代码"
                />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="updateCombinedItemVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateCombinedItem('updateRef')">确 定</el-button>
            </div>
          </el-dialog>
          <el-table
            :data="combinedItemTableData.slice((currentPage2 - 1) * pagesize2, currentPage2 * pagesize2)"
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
                <el-button type="text" size="small" @click="prepareUpdateCombinedItem(scope.row)">更改</el-button>
                <el-button type="text" size="small" @click="deleteCombinedItem(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-sizes="[5, 10, 15]"
            :current-page="currentPage2"
            :page-size="pagesize2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="combinedItemTableData.length"
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
import { getItemNameList, getItemNameTableData, addItem, deleteItem, getCombinedItemTableData } from '@/api/bio_feature'
import { updateSingleItem, deleteCombinedItem, addCombinedItem, updateCombinedItem } from '@/api/bio_feature'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'DataItemManagement',
  data() {
    return {
      currentPage: 1,
      pagesize: 5,
      currentPage2: 1,
      pagesize2: 5,
      activeName: 'combined',
      bioFeatureItem: {
        itemName: ''
      },
      itemName: '',
      itemNameList: [],
      addItemName: '',
      singleItemTableData: [],
      combinedItemName: '',
      combinedItemNameList: [],
      combinedItemTableData: [],
      tempCombinedItemTableData: [],
      addCombinedItemVisible: false,
      newCombinedItemForm: {
        itemName: '',
        numerator: '',
        denominator: '',
        ratio: '100',
        definition: '',
        description: '',
        meaning: '',
        code: ''
      },
      updateCombinedItemForm: {
        itemName: '',
        numerator: '',
        denominator: '',
        ratio: '100',
        definition: '',
        description: '',
        meaning: '',
        code: ''
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
        ],
        code: [
          { required: true, message: '请输入指标代码', trigger: 'change' }
        ]
      },
      updateRule: {
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
        code: [
          { required: true, message: '请输入指标代码', trigger: 'change' }
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
      }],
      searchTypeList: [{
        value: '按名称搜索',
        label: '按名称搜索'
      }, {
        value: '按代码搜索',
        label: '按代码搜索'
      }],
      searchItemList: [],
      searchType: '',
      updateCombinedItemVisible: false
    }
  },
  mounted() {
    this.generateSingleItemName()
    this.generateSingleItemTableData()
    this.generateCombinedItemTableData()
  },
  methods: {
    handleSizeChange(size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    handleSizeChange2(size) {
      this.pagesize2 = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange2(currentPage) {
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
    // 获取单项表格数据
    generateSingleItemTableData() {
      var that = this
      getItemNameTableData().then((res) => {
        that.singleItemTableData = []
        const { data } = res
        that.singleItemTableData = data
      })
    },
    // 获取组合项表格数据
    generateCombinedItemTableData() {
      var that = this
      getCombinedItemTableData().then((res) => {
        that.combinedItemTableData = []
        const { data } = res
        that.combinedItemTableData = data
        that.tempCombinedItemTableData = data
      })
    },
    // 搜索指定指标项
    searchSingleItem() {
      if (this.itemName === '') {
        // Message({
        //   message: '请先选择指标',
        //   type: 'error'
        // })
        this.generateSingleItemTableData()
        return
      }
      for (var i = 0; i < this.singleItemTableData.length; i++) {
        if (this.singleItemTableData[i].itemName === this.itemName) {
          var obj = this.singleItemTableData[i]
          this.singleItemTableData = []
          this.singleItemTableData.push(obj)
          break
        }
      }
      this.itemName = ''
    },
    searchCombinedItem(name) {
      if (name === '') {
        this.generateCombinedItemTableData()
        return
      }
      this.combinedItemTableData = []
      for (var i = 0; i < this.tempCombinedItemTableData.length; i++) {
        if (this.tempCombinedItemTableData[i].itemName.indexOf(name) !== -1) {
          var obj = this.tempCombinedItemTableData[i]
          this.combinedItemTableData.push(obj)
        }
      }
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
          this.generateSingleItemTableData()
        }, 500)
      })
      that.bioFeatureItem = ''
    },
    // 删除单个指标项
    deleteSingleItem(data) {
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
            this.generateSingleItemTableData()
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
    // 删除组合指标项
    deleteCombinedItem(data) {
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
            this.generateCombinedItemTableData()
          }, 500)
          this.searchType = ''
          this.combinedItemName = ''
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
    // 添加组合指标项
    addCombinedItem(refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          addCombinedItem(this.newCombinedItemForm).then(() => {
            Message.success({
              message: '添加成功！'
            })
            this.addCombinedItemVisible = false
            setTimeout(() => {
              this.generateCombinedItemTableData()
            }, 500)
            this.searchType = ''
            this.combinedItemName = ''
          })
        } else {
          Message.error({
            message: '请填写正确的信息！'
          })
          return false
        }
      })
    },
    prepareUpdateCombinedItem(data) {
      this.updateCombinedItemForm = data
      this.updateCombinedItemVisible = true
    },
    updateCombinedItem() {
      var that = this
      this.$refs['updateRef'].validate((valid) => {
        if (valid) {
          updateCombinedItem(that.updateCombinedItemForm).then(() => {
            Message.success({
              message: '更改成功！'
            })
            this.updateCombinedItemVisible = false
            setTimeout(() => {
              this.generateCombinedItemTableData()
            }, 500)
            this.searchType = ''
            this.combinedItemName = ''
          })
        } else {
          Message.error({
            message: '请填写正确的信息！'
          })
          return false
        }
      })
    },
    // 根据搜索条件获取组合指标项搜索名称列表
    generateSearchItemList() {
      // eslint-disable-next-line eqeqeq
      // 若搜索条件不为空，根据tempCombinedItemTableData对应搜索名称列表
      this.searchItemList = []
      var i, obj
      if (this.searchType === '按名称搜索') {
        for (i = 0; i < this.tempCombinedItemTableData.length; i++) {
          obj = {
            label: this.tempCombinedItemTableData[i].itemName,
            value: this.tempCombinedItemTableData[i].itemName
          }
          this.searchItemList.push(obj)
        }
        return
      }
      if (this.searchType === '按代码搜索') {
        for (i = 0; i < this.tempCombinedItemTableData.length; i++) {
          obj = {
            key: this.tempCombinedItemTableData[i].cbfiBfiMappingId,
            label: this.tempCombinedItemTableData[i].code,
            value: this.tempCombinedItemTableData[i].itemName
          }
          this.searchItemList.push(obj)
        }
        return
      }
    },
    checkSearchType() {
      if (this.searchType === '') {
        // 若搜索条件为空, 提示用户选择搜索条件
        Message({
          message: '请选择搜索条件！',
          type: 'error'
        })
        this.searchItemList = []
      }
    },
    updateSingleItem(data) {
      updateSingleItem(data).then((res) => {
        Message.success({
          message: res.msg || '更改失败'
        })
        setTimeout(() => {
          this.generateSingleItemName()
          this.generateSingleItemTableData()
        }, 500)
        this.itemName = ''
      })
    }
  }
}
</script>
