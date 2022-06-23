<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" type="border-card" style="margin-left: 40px; margin-top: 30px; width: 1250px;" @tab-click="handleClick">
          <el-tab-pane label="单个指标信息对比" name="first">
            <div>
              <el-select v-model="compareSingleVO.itemName" size="mini" filterable clearable placeholder="请选择指标" style="width: 22%; margin-left: 5px;">
                <el-option
                  v-for="item in singleItemNameList"
                  :key="item.itemName"
                  :label="item.itemName"
                  :value="item.itemName"
                />
              </el-select>
              <el-button type="primary" style="margin-left: 15px;" size="mini" @click="compareSingleItem()">搜索</el-button>
              <el-button type="primary" style="margin-left: 5px;" size="mini" @click="openSingleItemEchartDialog()">生成图表</el-button>
              <el-button type="success" size="mini" style="margin-left: 5px" @click="exportExcelForSingleItem(compareSingleVO.itemName)">导出Excel</el-button>
            </div>
            <div style="margin-top: 10px;">
              <el-select v-model="compareSingleVO.compareObjTypeA" size="mini" filterable clearable placeholder="对比对象类型" style="width: 12%; margin-left: 5px;" @focus="clearCompareObj('single', 'A')">
                <el-option
                  v-for="item in compareObjTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-if="compareSingleVO.compareObjTypeA != 'province'" v-model="compareSingleVO.compareObjA" size="mini" filterable clearable placeholder="对比对象" style="width: 12%; margin-left: 5px;" @focus="generateSingleItemCompareObj('A')">
                <el-option
                  v-for="item in compareObjAList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="compareSingleVO.yearA" size="mini" filterable clearable placeholder="请选择年份" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="compareSingleVO.startMonthA" size="mini" filterable clearable placeholder="起始月份" style="width: 8%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="compareSingleVO.endMonthA" size="mini" filterable clearable placeholder="结束月份" style="width: 8%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-if="compareSingleVO.compareObjTypeA != 'hospital'" v-model="compareSingleVO.hospitalLevelA" size="mini" filterable clearable placeholder="请选择医院等级" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalLevelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-if="compareSingleVO.compareObjTypeA != 'hospital'" v-model="compareSingleVO.hospitalTypeA" size="mini" filterable clearable placeholder="请选择医院类型" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <!-- <el-select v-model="echartType" size="mini" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in echartTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select> -->
            </div>
            <div style="margin-top: 10px;">
              <el-select v-model="compareSingleVO.compareObjTypeB" size="mini" filterable clearable placeholder="对比对象类型" style="width: 12%; margin-left: 5px;" @focus="clearCompareObj('single', 'B')">
                <el-option
                  v-for="item in compareObjTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-if="compareSingleVO.compareObjTypeB != 'province'" v-model="compareSingleVO.compareObjB" size="mini" filterable clearable placeholder="对比对象" style="width: 12%; margin-left: 5px;" @focus="generateSingleItemCompareObj('B')">
                <el-option
                  v-for="item in compareObjBList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="compareSingleVO.yearB" size="mini" filterable clearable placeholder="请选择年份" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="compareSingleVO.startMonthB" size="mini" filterable clearable placeholder="起始月份" style="width: 8%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="compareSingleVO.endMonthB" size="mini" filterable clearable placeholder="结束月份" style="width: 8%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-if="compareSingleVO.compareObjTypeB != 'hospital'" v-model="compareSingleVO.hospitalLevelB" size="mini" filterable clearable placeholder="请选择医院等级" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalLevelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-if="compareSingleVO.compareObjTypeB != 'hospital'" v-model="compareSingleVO.hospitalTypeB" size="mini" filterable clearable placeholder="请选择医院类型" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <el-table
              id="singleItemTable"
              :data="singleItemTableData"
              style="width: 100%; margin-top: 20px;"
              size="mini"
              height="500"
              border
            >
              <el-table-column
                prop="hospitalName"
                label="医院名称"
                header-align="center"
                align="center"
              />
              <el-table-column
                prop="singleItemValue"
                :label="compareSingleVO.itemName"
                sortable
                header-align="center"
                align="center"
              />
              <el-table-column
                prop="singleItemAverageValue"
                label="月平均值"
                sortable
                header-align="center"
                align="center"
              />
            </el-table>
            <el-dialog :visible.sync="singleItemEchartVisible" width="1200px" @opened="generateSingleItemEchart()">
              <div ref="compare_single" style="width: 800px; height: 500px; margin-top: 20px; margin-left: 100px;" />
              <el-button type="primary" style="margin-left: 50%;" size="mini" @click="singleItemEchartVisible=false">关闭</el-button>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="组合指标信息对比" name="second">
            <div>
              <el-select v-model="typeId" size="mini" filterable clearable placeholder="请选择指标类型" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in typeList"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeId"
                />
              </el-select>
              <el-select v-model="compareCombinedVO.itemName" size="mini" filterable clearable placeholder="请选择指标" style="width: 22%; margin-left: 5px;" @focus="generateCombinedItemNameList">
                <el-option
                  v-for="item in combinedItemNameList"
                  :key="item.itemName"
                  :label="item.itemName"
                  :value="item.itemName"
                />
              </el-select>
              <el-button type="primary" style="margin-left: 15px;" size="mini" @click="compareCombinedItem()">搜索</el-button>
              <el-button type="primary" style="margin-left: 5px;" size="mini" @click="openCombinedItemEchartDialog()">生成图表</el-button>
              <el-button type="success" size="mini" style="margin-left: 5px" @click="exportExcelForCombinedItem(compareCombinedVO.itemName)">导出Excel</el-button>
            </div>
            <div style="margin-top: 10px;">
              <el-select v-model="compareCombinedVO.compareObjTypeA" size="mini" filterable clearable placeholder="对比对象类型" style="width: 12%; margin-left: 5px;" @focus="clearCompareObj('combined', 'A')">
                <el-option
                  v-for="item in compareObjTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-if="compareCombinedVO.compareObjTypeA != 'province'" v-model="compareCombinedVO.compareObjA" size="mini" filterable clearable placeholder="对比对象" style="width: 12%; margin-left: 5px;" @focus="generateCombinedItemCompareObj('A')">
                <el-option
                  v-for="item in compareObjAList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="compareCombinedVO.yearA" size="mini" filterable clearable placeholder="请选择年份" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="compareCombinedVO.startMonthA" size="mini" filterable clearable placeholder="起始月份" style="width: 8%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="compareCombinedVO.endMonthA" size="mini" filterable clearable placeholder="结束月份" style="width: 8%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-if="compareCombinedVO.compareObjTypeA != 'hospital'" v-model="compareCombinedVO.hospitalLevelA" size="mini" filterable clearable placeholder="请选择医院等级" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalLevelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-if="compareCombinedVO.compareObjTypeA != 'hospital'" v-model="compareCombinedVO.hospitalTypeA" size="mini" filterable clearable placeholder="请选择医院类型" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <!-- <el-select v-model="echartType" size="mini" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in echartTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select> -->
            </div>
            <div style="margin-top: 10px;">
              <el-select v-model="compareCombinedVO.compareObjTypeB" size="mini" filterable clearable placeholder="对比对象类型" style="width: 12%; margin-left: 5px;" @focus="clearCompareObj('combined', 'B')">
                <el-option
                  v-for="item in compareObjTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-if="compareCombinedVO.compareObjTypeB != 'province'" v-model="compareCombinedVO.compareObjB" size="mini" filterable clearable placeholder="对比对象" style="width: 12%; margin-left: 5px;" @focus="generateCombinedItemCompareObj('B')">
                <el-option
                  v-for="item in compareObjBList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="compareCombinedVO.yearB" size="mini" filterable clearable placeholder="请选择年份" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="compareCombinedVO.startMonthB" size="mini" filterable clearable placeholder="起始月份" style="width: 8%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="compareCombinedVO.endMonthB" size="mini" filterable clearable placeholder="结束月份" style="width: 8%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-if="compareCombinedVO.compareObjTypeB != 'hospital'" v-model="compareCombinedVO.hospitalLevelB" size="mini" filterable clearable placeholder="请选择医院等级" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalLevelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-if="compareCombinedVO.compareObjTypeB != 'hospital'" v-model="compareCombinedVO.hospitalTypeB" size="mini" filterable clearable placeholder="请选择医院类型" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <el-table
              id="combinedItemTable"
              :data="combinedItemTableData"
              style="width: 100%; margin-top: 20px;"
              size="mini"
              height="500"
              border
            >
              <el-table-column
                prop="compareObjName"
                label="比较对象名称"
                header-align="center"
                align="center"
              />
              <el-table-column
                prop="numeratorValue"
                :label="numeratorName"
                sortable
                header-align="center"
                align="center"
              />
              <el-table-column
                prop="denominatorValue"
                :label="denominatorName"
                sortable
                header-align="center"
                align="center"
              />
              <el-table-column
                prop="result"
                :label="compareCombinedVO.itemName"
                sortable
                :formatter="formatResult"
                column-key="result"
                header-align="center"
                align="center"
              />
            </el-table>
            <el-dialog :visible.sync="combinedItemEchartVisible" width="1200px" @opened="generateCombinedItemEchart()">
              <div ref="compare_combined" style="width: 800px; height: 500px; margin-top: 20px; margin-left: 100px;" />
              <el-button type="primary" style="margin-left: 50%;" size="mini" @click="combinedItemEchartVisible=false">关闭</el-button>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>

import { getItemNameList } from '@/api/bio_feature'
import { compareSingle, compareCombined, getTypeList, getCombinedItemNameList } from '@/api/data_analyze'
import { getCombinedItemCompareObj } from '@/api/data_analyze'
import echarts from 'echarts'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { Message } from 'element-ui'

export default {
  name: 'DataCompare',
  data() {
    return {
      // 比较单个数据
      compareSingleVO: {
        itemName: '',
        compareObjTypeA: '',
        compareObjA: '',
        yearA: '',
        startMonthA: '',
        endMonthA: '',
        hospitalLevelA: '',
        hospitalTypeA: '',
        compareObjTypeB: '',
        compareObjB: '',
        yearB: '',
        startMonthB: '',
        endMonthB: '',
        hospitalLevelB: '',
        hospitalTypeB: ''
      },
      // 比较组合数据
      compareCombinedVO: {
        itemName: '',
        compareObjTypeA: '',
        compareObjA: '',
        yearA: '',
        startMonthA: '',
        endMonthA: '',
        hospitalLevelA: '',
        hospitalTypeA: '',
        compareObjTypeB: '',
        compareObjB: '',
        yearB: '',
        startMonthB: '',
        endMonthB: '',
        hospitalLevelB: '',
        hospitalTypeB: ''
      },
      // 单个数据指标名称列表
      singleItemNameList: [],
      // 组合数据指标名称列表
      combinedItemNameList: [],
      // 医院信息列表
      hospitalInfoList: [],
      year: [
        {
          value: '2020',
          label: '2020'
        }, {
          value: '2021',
          label: '2021'
        }, {
          value: '2022',
          label: '2022'
        }, {
          value: '2023',
          label: '2023'
        }, {
          value: '2024',
          label: '2024'
        }, {
          value: '2025',
          label: '2025'
        }
      ],
      month: [
        {
          value: 'january',
          label: '1月'
        }, {
          value: 'february',
          label: '2月'
        }, {
          value: 'march',
          label: '3月'
        }, {
          value: 'april',
          label: '4月'
        }, {
          value: 'may',
          label: '5月'
        }, {
          value: 'june',
          label: '6月'
        }, {
          value: 'july',
          label: '7月'
        }, {
          value: 'august',
          label: '8月'
        }, {
          value: 'september',
          label: '9月'
        }, {
          value: 'october',
          label: '10月'
        }, {
          value: 'november',
          label: '11月'
        }, {
          value: 'december',
          label: '12月'
        }
      ],
      compareObjTypeList: [
        {
          value: 'hospital',
          label: '医院'
        }, {
          value: 'center',
          label: '分中心'
        },
        {
          value: 'province',
          label: '全省'
        }
      ],
      hospitalLevelOptions: [{
        value: '省级',
        label: '省级'
      }, {
        value: '市级',
        label: '市级'
      }, {
        value: '县级',
        label: '县级'
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
      }],
      compareObjAList: [],
      compareObjBList: [],
      echartType: 'line',
      echartTypeList: [
        {
          value: 'bar',
          label: '柱状图'
        }, {
          value: 'line',
          label: '折线图'
        }
      ],
      typeId: '',
      typeList: [],
      // tabs默认显示
      activeName: 'second',
      combinedItemTableData: [],
      numeratorName: '',
      denominatorName: '',
      singleItemTableData: [],
      singleItemEchartVisible: false,
      combinedItemEchartVisible: false
    }
  },
  mounted() {
    this.generateSingleItemNameList()
    this.generateTypeList()
  },
  methods: {
    // 清空比较对象
    clearCompareObj(dataType, type) {
      if (dataType === 'combined') {
        if (type === 'A') {
          this.compareCombinedVO.compareObjA = ''
        }
        if (type === 'B') {
          this.compareCombinedVO.compareObjB = ''
        }
      }
      if (dataType === 'single') {
        if (type === 'A') {
          this.compareSingleVO.compareObjA = ''
        }
        if (type === 'B') {
          this.compareSingleVO.compareObjB = ''
        }
      }
    },
    // 表格中每行数据后加百分号
    formatResult(row, column, cellValue, index) {
      return cellValue + '%'
    },
    // 获取单个数据的指标名称列表
    generateSingleItemNameList() {
      var that = this
      getItemNameList().then((res) => {
        that.singleItemNameList = []
        const { data } = res
        that.singleItemNameList = data
      })
    },
    // 获取组合指标类型列表
    generateTypeList() {
      var that = this
      getTypeList().then((res) => {
        that.typeList = []
        const { data } = res
        that.typeList = data
      })
    },
    // 根据组合指标类型id获取组合指标名称列表
    generateCombinedItemNameList() {
      // 如果组合指标类型id为空，则提示先选择组合指标类型
      if (this.typeId === '') {
        Message({
          message: '请先选择组合指标类型',
          type: 'warning'
        })
        return
      }
      // 如果组合指标类型id不为空，则根据组合指标类型id获取组合指标名称列表
      var that = this
      getCombinedItemNameList(this.typeId).then((res) => {
        that.combinedItemNameList = []
        const { data } = res
        that.combinedItemNameList = data
      })
    },
    // 根据比较类型获取对应的比较对象列表
    generateCombinedItemCompareObj(type) {
      var that = this
      if (type === 'A') {
        // 首先检查比较类型是否为空
        if (that.compareCombinedVO.compareObjTypeA === '') {
          Message({
            message: '请先选择比较类型A',
            type: 'warning'
          })
          return
        }
        // 如果比较类型不为空，则根据比较类型获取对应的比较对象列表
        getCombinedItemCompareObj(that.compareCombinedVO.compareObjTypeA).then((res) => {
          that.compareObjAList = []
          const { data } = res
          Object.keys(data).forEach((key) => {
            that.compareObjAList.push({
              value: key,
              label: data[key]
            })
          })
        })
      }
      if (type === 'B') {
        // 首先检查比较类型是否为空
        if (that.compareCombinedVO.compareObjTypeB === '') {
          Message({
            message: '请先选择比较类型B',
            type: 'warning'
          })
          return
        }
        // 如果比较类型不为空，则根据比较类型获取对应的比较对象列表
        getCombinedItemCompareObj(that.compareCombinedVO.compareObjTypeB).then((res) => {
          that.compareObjBList = []
          const { data } = res
          Object.keys(data).forEach((key) => {
            that.compareObjBList.push({
              value: key,
              label: data[key]
            })
          })
        })
      }
    },
    generateSingleItemCompareObj(type) {
      var that = this
      if (type === 'A') {
        // 首先检查比较类型是否为空
        if (that.compareSingleVO.compareObjTypeA === '') {
          Message({
            message: '请先选择比较类型A',
            type: 'warning'
          })
          return
        }
        // 如果比较类型不为空，则根据比较类型获取对应的比较对象列表
        getCombinedItemCompareObj(that.compareSingleVO.compareObjTypeA).then((res) => {
          that.compareObjAList = []
          const { data } = res
          Object.keys(data).forEach((key) => {
            that.compareObjAList.push({
              value: key,
              label: data[key]
            })
          })
        })
      }
      if (type === 'B') {
        // 首先检查比较类型是否为空
        if (that.compareSingleVO.compareObjTypeB === '') {
          Message({
            message: '请先选择比较类型B',
            type: 'warning'
          })
          return
        }
        // 如果比较类型不为空，则根据比较类型获取对应的比较对象列表
        getCombinedItemCompareObj(that.compareSingleVO.compareObjTypeB).then((res) => {
          that.compareObjBList = []
          const { data } = res
          Object.keys(data).forEach((key) => {
            that.compareObjBList.push({
              value: key,
              label: data[key]
            })
          })
        })
      }
    },
    // 比较单个数据
    compareSingleItem() {
      // 首先判断itemName是否为空
      if (this.compareSingleVO.itemName === '') {
        this.$message({
          message: '请先选择组合指标类型',
          type: 'warning'
        })
        return
      }
      // 判断其他指标是否为空
      if (this.compareSingleVO.yearA === '') {
        this.$message({
          message: '请先选择比较对象A的年份',
          type: 'warning'
        })
        return
      }
      if (this.compareSingleVO.compareObjA === null && that.compareSingleVO.compareObjTypeA !== 'province') {
        this.$message({
          message: '请先选择比较对象A名称',
          type: 'warning'
        })
        return
      }
      // 判断起始月是否为空
      if (this.compareSingleVO.startMonthA === '') {
        this.$message({
          message: '请先选择比较对象A的起始月',
          type: 'warning'
        })
        return
      }
      // 判断结束月是否为空
      if (this.compareSingleVO.endMonthA === '') {
        this.$message({
          message: '请先选择比较对象A的结束月',
          type: 'warning'
        })
        return
      }
      if (this.compareSingleVO.yearB === '') {
        this.$message({
          message: '请先选择比较对象B的年份',
          type: 'warning'
        })
        return
      }
      if (this.compareSingleVO.compareObjB === null && this.compareSingleVO.compareObjTypeB !== 'province') {
        this.$message({
          message: '请先选择比较对象B名称',
          type: 'warning'
        })
        return
      }
      // 判断起始月是否为空
      if (this.compareSingleVO.startMonthB === '') {
        this.$message({
          message: '请先选择比较对象B的起始月',
          type: 'warning'
        })
        return
      }
      // 判断结束月是否为空
      if (this.compareSingleVO.endMonthB === '') {
        this.$message({
          message: '请先选择比较对象B的结束月',
          type: 'warning'
        })
        return
      }
      // 起始月份必须小于结束月份
      if (this.parseMonthIntoNum(this.compareSingleVO.startMonthA) > this.parseMonthIntoNum(this.compareSingleVO.endMonthA) || this.parseMonthIntoNum(this.compareSingleVO.startMonthB) > this.parseMonthIntoNum(this.compareSingleVO.endMonthB)) {
        this.$message({
          message: '起始月份必须小于结束月份',
          type: 'warning'
        })
        return
      }
      var that = this
      compareSingle(this.compareSingleVO).then((res) => {
        const { data } = res
        that.handleCompareDataForSingle(data)
      })
    },
    // 比较组合数据
    compareCombinedItem() {
      // 首先判断itemName是否为空
      if (this.compareCombinedVO.itemName === '') {
        this.$message({
          message: '请先选择组合指标类型',
          type: 'warning'
        })
        return
      }
      // 判断其他指标是否为空
      if (this.compareCombinedVO.yearA === '') {
        this.$message({
          message: '请先选择比较对象A的年份',
          type: 'warning'
        })
        return
      }
      if (this.compareCombinedVO.compareObjA === null && that.compareCombinedVO.compareObjTypeA !== 'province') {
        this.$message({
          message: '请先选择比较对象A名称',
          type: 'warning'
        })
        return
      }
      // 判断起始月是否为空
      if (this.compareCombinedVO.startMonthA === '') {
        this.$message({
          message: '请先选择比较对象A的起始月',
          type: 'warning'
        })
        return
      }
      // 判断结束月是否为空
      if (this.compareCombinedVO.endMonthA === '') {
        this.$message({
          message: '请先选择比较对象A的结束月',
          type: 'warning'
        })
        return
      }
      if (this.compareCombinedVO.yearB === '') {
        this.$message({
          message: '请先选择比较对象B的年份',
          type: 'warning'
        })
        return
      }
      if (this.compareCombinedVO.compareObjB === null && this.compareCombinedVO.compareObjTypeB !== 'province') {
        this.$message({
          message: '请先选择比较对象B名称',
          type: 'warning'
        })
        return
      }
      // 判断起始月是否为空
      if (this.compareCombinedVO.startMonthB === '') {
        this.$message({
          message: '请先选择比较对象B的起始月',
          type: 'warning'
        })
        return
      }
      // 判断结束月是否为空
      if (this.compareCombinedVO.endMonthB === '') {
        this.$message({
          message: '请先选择比较对象B的结束月',
          type: 'warning'
        })
        return
      }
      // 起始月份必须小于结束月份
      if (this.parseMonthIntoNum(this.compareCombinedVO.startMonthA) > this.parseMonthIntoNum(this.compareCombinedVO.endMonthA) || this.parseMonthIntoNum(this.compareCombinedVO.startMonthB) > this.parseMonthIntoNum(this.compareCombinedVO.endMonthB)) {
        this.$message({
          message: '起始月份必须小于结束月份',
          type: 'warning'
        })
        return
      }
      var that = this
      // 调用axios方法获取两个比较对象的数据
      compareCombined(this.compareCombinedVO).then((res) => {
        const { data } = res
        // 处理对比数据
        that.handleCompareDataForCombined(data)
      })
    },
    // 切换tabs触发
    handleClick() {
    },
    // 初始化单个指标对比图表
    openSingleItemEchartDialog() {
      if (this.singleItemTableData.length === 0) {
        Message({
          message: '请先获取表格数据',
          type: 'warning'
        })
        return
      }
      this.singleItemEchartVisible = true
    },
    generateSingleItemEchart() {
      var that = this
      var myChart = echarts.init(this.$refs.compare_single)
      var option = {
        title: {
          text: that.compareSingleVO.itemName + '对比图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          right: 80
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value'
        },
        xAxis: {
          type: 'category',
          data: ['总值', '月平均值']
        },
        series: [
          {
            name: that.singleItemTableData[0]['hospitalName'],
            type: 'bar',
            barWidth: 80,
            color: '#40d286',
            data: [that.singleItemTableData[0]['singleItemValue'], that.singleItemTableData[0]['singleItemAverageValue']]
          },
          {
            name: that.singleItemTableData[1]['hospitalName'],
            type: 'bar',
            barWidth: 80,
            color: '#1d72f1',
            data: [that.singleItemTableData[1]['singleItemValue'], that.singleItemTableData[1]['singleItemAverageValue']]
          }
        ]
      }
      myChart.setOption(option)
    },
    // 初始化组合指标对比图表
    openCombinedItemEchartDialog() {
      if (this.combinedItemTableData.length === 0) {
        Message({
          message: '请先获取表格数据',
          type: 'warning'
        })
        return
      }
      this.combinedItemEchartVisible = true
    },
    generateCombinedItemEchart() {
      var that = this
      var myChart = echarts.init(this.$refs.compare_combined)
      var option = {
        title: {
          text: that.compareCombinedVO.itemName
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          right: 80
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
          }
        },
        xAxis: {
          type: 'category',
          data: [that.compareCombinedVO.itemName]
        },
        series: [
          {
            name: that.combinedItemTableData[0]['compareObjName'],
            type: 'bar',
            color: '#40d286',
            barWidth: 80,
            data: [that.combinedItemTableData[0]['result']]
          },
          {
            name: that.combinedItemTableData[1]['compareObjName'],
            type: 'bar',
            color: '#1d72f1',
            barWidth: 80,
            data: [that.combinedItemTableData[1]['result']]
          }
        ]
      }
      myChart.setOption(option)
    },
    // 处理对比数据, data中包含两个Value对象Value A，Value B
    handleCompareDataForCombined(data) {
      var that = this
      var compareObjA = this.getCompareObjName(that.compareCombinedVO.compareObjA, that.compareCombinedVO.compareObjTypeA, 'A')
      var compareObjB = this.getCompareObjName(that.compareCombinedVO.compareObjB, that.compareCombinedVO.compareObjTypeB, 'B')
      var { ratio } = data
      var objAData = data[compareObjA]
      that.numeratorName = objAData[0].itemName
      that.denominatorName = objAData[1].itemName
      var numeratorValueA = that.calculateValueByMonth(objAData[0], that.compareCombinedVO.startMonthA, that.compareCombinedVO.endMonthA)
      var denominatorValueA = that.calculateValueByMonth(objAData[1], that.compareCombinedVO.startMonthA, that.compareCombinedVO.endMonthA)
      var objATableData = {
        compareObjName: compareObjA,
        numeratorValue: numeratorValueA,
        denominatorValue: denominatorValueA,
        result: denominatorValueA === 0 ? 0 : parseInt(numeratorValueA / denominatorValueA * ratio)
      }
      var objBData = data[compareObjB]
      var numeratorValueB = that.calculateValueByMonth(objBData[0], that.compareCombinedVO.startMonthB, that.compareCombinedVO.endMonthB)
      var denominatorValueB = that.calculateValueByMonth(objBData[1], that.compareCombinedVO.startMonthB, that.compareCombinedVO.endMonthB)
      var objBTableData = {
        compareObjName: compareObjB,
        numeratorValue: numeratorValueB,
        denominatorValue: denominatorValueB,
        result: denominatorValueB === 0 ? 0 : parseInt(numeratorValueB / denominatorValueB * ratio)
      }
      that.combinedItemTableData = [objATableData, objBTableData]
    },
    handleCompareDataForSingle(data) {
      var that = this
      that.singleItemTableData = []
      var objA = data['objA']
      var objAName = Object.keys(objA)[0]
      var dataA = this.calculateValueByMonth(objA[objAName], this.compareSingleVO.startMonthA, this.compareSingleVO.endMonthA)
      var tableDataA = {
        hospitalName: Object.keys(objA)[0],
        singleItemValue: dataA,
        singleItemAverageValue: parseInt(dataA / (that.parseMonthIntoNum(that.compareSingleVO.endMonthA) - that.parseMonthIntoNum(that.compareSingleVO.startMonthA) + 1))
      }
      var objB = data['objB']
      var objBName = Object.keys(objB)[0]
      var dataB = this.calculateValueByMonth(objB[objBName], this.compareSingleVO.startMonthB, this.compareSingleVO.endMonthB)
      var tableDataB = {
        hospitalName: Object.keys(objB)[0],
        singleItemValue: dataB,
        singleItemAverageValue: parseInt(dataB / (that.parseMonthIntoNum(that.compareSingleVO.endMonthB) - that.parseMonthIntoNum(that.compareSingleVO.startMonthB) + 1))
      }
      that.singleItemTableData.push(tableDataA)
      that.singleItemTableData.push(tableDataB)
    },
    getCompareObjName(compareObj, compareObjType, type) {
      var that = this
      var compareObjName = ''
      if (type === 'A') {
        if (compareObjType === 'hospital' || compareObjType === 'center') {
          for (var i = 0; i < that.compareObjAList.length; i++) {
            if (that.compareObjAList[i].value === compareObj) {
              compareObjName = that.compareObjAList[i].label
            }
          }
        }
      }
      if (type === 'B') {
        if (compareObjType === 'hospital' || compareObjType === 'center') {
          for (var j = 0; j < that.compareObjBList.length; j++) {
            if (that.compareObjBList[j].value === compareObj) {
              compareObjName = that.compareObjBList[j].label
            }
          }
        }
      }
      if (compareObjType === 'province') {
        compareObjName = '全省数据'
      }
      return compareObjName
    },
    // 计算单个医院某月到某月的数据
    calculateValueByMonth(value, startMonth, endMonth) {
      var start = this.parseMonthIntoNum(startMonth)
      var end = this.parseMonthIntoNum(endMonth)
      var result = 0
      for (var i = start; i <= end; i++) {
        if (value[this.parseNumIntoMonth(i)] != null) {
          result += value[this.parseNumIntoMonth(i)]
        }
      }
      return result
    },
    // 将月份的英文转换为对应数字
    parseMonthIntoNum(month) {
      switch (month) {
        case 'january':
          return 1
        case 'february':
          return 2
        case 'march':
          return 3
        case 'april':
          return 4
        case 'may':
          return 5
        case 'june':
          return 6
        case 'july':
          return 7
        case 'august':
          return 8
        case 'september':
          return 9
        case 'october':
          return 10
        case 'november':
          return 11
        case 'december':
          return 12
        default:
          return 0
      }
    },
    // 将月份数字转换为对应英文
    parseNumIntoMonth(num) {
      switch (num) {
        case 1:
          return 'january'
        case 2:
          return 'february'
        case 3:
          return 'march'
        case 4:
          return 'april'
        case 5:
          return 'may'
        case 6:
          return 'june'
        case 7:
          return 'july'
        case 8:
          return 'august'
        case 9:
          return 'september'
        case 10:
          return 'october'
        case 11:
          return 'november'
        case 12:
          return 'december'
        default:
          return 'january'
      }
    },
    exportExcelForCombinedItem(itemName) {
      // 先判断有没有表格数据
      if (this.combinedItemTableData.length === 0) {
        Message.warning({
          message: '无法导出excel表格, 请先获取表格数据！'
        })
        return false
      }
      var xlsxParam = { raw: true }
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector('#combinedItemTable'),
        xlsxParam
      )
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          // 设置导出文件名称
          itemName + '对比数据.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    exportExcelForSingleItem(itemName) {
      // 先判断有没有表格数据
      if (this.singleItemTableData.length === 0) {
        Message.warning({
          message: '无法导出excel表格, 请先获取表格数据！'
        })
        return false
      }
      var xlsxParam = { raw: true }
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector('#singleItemTable'),
        xlsxParam
      )
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          // 设置导出文件名称
          itemName + '对比数据.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  }
}
</script>
