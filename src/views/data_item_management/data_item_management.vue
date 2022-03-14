<template>
  <el-container>
    <el-tabs v-model="activeName" type="border-card" style="margin-left: 50px; margin-top: 50px; width: 800px;">
      <el-tab-pane label="单个指标管理" name="single">
        <div>
          <el-select v-model="itemName" filterable clearable placeholder="请选择单个指标" style="width: 200px; margin-top: 30px;">
            <el-option
              v-for="item in itemNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" style="margin-left: 20px;" @click="searchItem(itemName)">搜索</el-button>
          <el-input
            v-model="bioFeatureItem.itemName"
            placeholder="请输入要添加的单个指标名称"
            style="width: 200px; margin-left: 20px;"
          />
          <el-button type="primary" style="margin-left: 20px;" @click="addSingleItem()">添加单个指标</el-button>
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
                <el-button type="text" size="small" @click="updateItemName(scope.row)">编辑</el-button>
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
      <el-tab-pane label="指标项管理" name="double">指标项管理</el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import { getItemNameList, getItemNameTableData, addItem, deleteItem } from '@/api/bio_feature'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'DataItemManagement',
  data() {
    return {
      currentPage: 1,
      pagesize: 5,
      activeName: 'single',
      bioFeatureItem: {
        itemName: ''
      },
      itemNameList: [],
      addItemName: '',
      itemNameTableData: []
    }
  },
  mounted() {
    this.generateSingleItemName()
    this.generateItemNameTableData()
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
    generateSingleItemName() {
      var that = this
      if (this.itemNameList.length === 0) {
        getItemNameList().then((res) => {
          const { data } = res
          this.generateItemNameList(that.itemNameList, data)
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
    // 搜索指定指标项
    searchItem(name) {
      if (name === '') {
        this.generateItemNameTableData()
      }
      for (var i = 0; i < this.itemNameTableData.length; i++) {
        console.log(name)
        if (this.itemNameTableData[i].itemName === name) {
          var obj = this.itemNameTableData[i]
          this.itemNameTableData = []
          this.itemNameTableData.push(obj)
        }
      }
      this.itemName = ''
    },
    // 添加一个指标项
    addSingleItem() {
      var that = this
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
    }
  }
}
</script>
