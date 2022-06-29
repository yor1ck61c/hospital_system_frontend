<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" type="border-card" style="margin-left: 40px; margin-top: 30px; width: 1250px;">
          <el-tab-pane label="单个指标信息统计" name="first">
            <div>
              <el-select v-model="countSingleVO.itemName" size="mini" filterable clearable placeholder="选择指标" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in singleItemNameList"
                  :key="item.itemName"
                  :label="item.itemName"
                  :value="item.itemName"
                />
              </el-select>
              <el-select v-model="countSingleVO.year" size="mini" filterable clearable placeholder="选择年份" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="countSingleVO.startMonth" size="mini" filterable clearable placeholder="起始月份" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="countSingleVO.endMonth" size="mini" filterable clearable placeholder="结束月份" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div style="margin-top: 10px;">
              <el-select v-model="countSingleVO.centerId" size="mini" filterable clearable placeholder="选择中心名称" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in centerInfoList"
                  :key="item.centerId"
                  :label="item.centerName"
                  :value="item.centerId"
                />
              </el-select>
              <el-select v-model="countSingleVO.hospitalLevel" size="mini" filterable clearable placeholder="选择医院等级" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalLevelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="countSingleVO.hospitalType" size="mini" filterable clearable placeholder="选择医院类型" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button type="primary" size="mini" style="margin-left: 5px;" @click="countSingleItem()">搜索</el-button>
              <el-button type="primary" size="mini" style="margin-left: 5px;" @click="openSingleItemEchartDialog()">生成图表</el-button>
              <el-button type="success" size="mini" style="margin-left: 5px;" @click="exportExcelForSingleItem(countSingleVO.itemName)">导出Excel</el-button>
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
                :label="countSingleVO.itemName"
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
              <div ref="count_single" style="width: 800px; height: 500px; margin-top: 20px; margin-left: 100px;" />
              <el-button type="primary" style="margin-left: 50%;" size="mini" @click="singleItemEchartVisible=false">关闭</el-button>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="组合指标信息统计" name="second">
            <div>
              <el-select v-model="typeId" size="mini" filterable clearable placeholder="选择指标类型" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in typeList"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeId"
                />
              </el-select>
              <el-select v-model="countCombinedVO.itemName" size="mini" filterable clearable placeholder="选择指标" style="width: 10%; margin-left: 5px;" @focus="generateCombinedItemNameList">
                <el-option
                  v-for="item in combinedItemNameList"
                  :key="item.itemName"
                  :label="item.itemName"
                  :value="item.itemName"
                />
              </el-select>
              <el-select v-model="countCombinedVO.year" size="mini" filterable clearable placeholder="选择年份" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="countCombinedVO.startMonth" size="mini" filterable clearable placeholder="起始月份" style="width: 8%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="countCombinedVO.endMonth" size="mini" filterable clearable placeholder="结束月份" style="width: 8%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div style="margin-top: 10px;">
              <el-select v-model="countCombinedVO.centerId" size="mini" filterable clearable placeholder="选择中心名称" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in centerInfoList"
                  :key="item.centerId"
                  :label="item.centerName"
                  :value="item.centerId"
                />
              </el-select>
              <el-select v-model="countCombinedVO.hospitalLevel" size="mini" filterable clearable placeholder="选择医院等级" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalLevelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="countCombinedVO.hospitalType" size="mini" filterable clearable placeholder="选择医院类型" style="width: 10%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button type="primary" size="mini" style="margin-left: 5px;" @click="countCombinedItem()">搜索</el-button>
              <el-button type="primary" size="mini" style="margin-left: 5px;" @click="openCombinedItemEchartDialog()">生成图表</el-button>
              <el-button type="success" size="mini" style="margin-left: 5px;" @click="exportExcelForCombinedItem(countCombinedVO.itemName)">导出Excel</el-button>
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
                prop="hospitalName"
                label="医院名称"
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
                :label="countCombinedVO.itemName"
                sortable
                :formatter="formatResult"
                column-key="result"
                header-align="center"
                align="center"
              />
            </el-table>
            <el-dialog :visible.sync="combinedItemEchartVisible" width="1200px" @opened="generateCombinedItemEchart()">
              <div ref="count_combined" style="width: 800px; height: 500px; margin-top: 20px; margin-left: 100px;" />
              <el-button type="primary" style="margin-left: 50%;" size="mini" @click="combinedItemEchartVisible=false">关闭</el-button>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { getCenterTableData } from '@/api/center'
import { getItemNameList } from '@/api/bio_feature'
import { countSingleItem, countCombinedItem, getTypeList, getCombinedItemNameList } from '@/api/data_analyze'
import { Message } from 'element-ui'
import echarts from 'echarts'
export default {
  name: 'DataCount',
  data() {
    return {
      currentPage: 1,
      pagesize: 5,
      activeName: 'second',
      typeId: '',
      typeList: [],
      numeratorName: '',
      denominatorName: '',
      // 搜索VO，包括指标名称，数据年份，中心名称，医院等级，医院类型
      countSingleVO: {
        itemName: '',
        year: '',
        startMonth: '',
        endMonth: '',
        centerId: '',
        hospitalLevel: '',
        hospitalType: ''
      },
      countCombinedVO: {
        itemName: '',
        year: '',
        startMonth: '',
        endMonth: '',
        centerId: '',
        hospitalLevel: '',
        hospitalType: ''
      },
      // 单个数据指标名称列表
      singleItemNameList: [],
      // 组合数据指标名称列表
      combinedItemNameList: [],
      // 中心名称列表
      centerInfoList: [],
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
      // 组合指标表格数据
      combinedItemTableData: [],
      // 单个指标表格数据
      singleItemTableData: [],
      monthList: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
      combinedItemEchartVisible: false,
      singleItemEchartVisible: false
    }
  },
  mounted() {
    this.generateCenterNameList()
    this.generateSingleItemNameList()
    this.generateTypeList()
  },
  methods: {
    // 表格中每行数据后加百分号
    formatResult(row, column, cellValue, index) {
      return cellValue + '%'
    },
    // 获取中心名称列表
    generateCenterNameList() {
      var that = this
      getCenterTableData().then(res => {
        that.centerInfoList = []
        const { data } = res
        that.centerInfoList = data
        // 加入一个额外选项，该选项表示统计所有分中心信息
        that.centerInfoList.unshift({
          centerId: '0',
          centerName: '统计所有分中心'
        })
      })
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
    // 统计单个数据信息
    countSingleItem() {
      var that = this
      // 若countSingleVO的年份或数据项为空，返回false
      // eslint-disable-next-line eqeqeq
      if (this.countSingleVO.itemName == '') {
        Message.error({
          message: '指标名称不能为空！'
        })
        return false
      }
      // eslint-disable-next-line eqeqeq
      if (this.countSingleVO.year == '') {
        Message.warning({
          message: '年份不能为空！'
        })
        return false
      }
      // 判断起始月份和结束月份是否合法
      if (this.parseMonthIntoNum(this.countSingleVO.startMonth) > this.parseMonthIntoNum(this.countSingleVO.endMonth)) {
        Message.error({
          message: '起始月份不能大于结束月份！'
        })
        return false
      }
      countSingleItem(this.countSingleVO).then((res) => {
        // 先判断是否为统计各个分中心综合数据
        // eslint-disable-next-line eqeqeq
        if (res.data.isSubCenterData == 1) {
          that.generateSingleItemTableDataForSubCenter(res.data)
        } else {
          that.generateSingleItemTableData(res.data)
        }
      })
    },
    // 根据返回结果生成单项指标表格数据
    generateSingleItemTableData(data) {
      var that = this
      var valueList = data['values']
      this.singleItemTableData = []
      var totalValue = 0
      for (var i = 0; i < valueList.length; i++) {
        var item = valueList[i]
        // 每行包含两项数据: 医院名称和该指标的值
        var value = this.calculateValueByMonth(item, this.countSingleVO.startMonth, this.countSingleVO.endMonth)
        totalValue += value
        var row = {
          hospitalName: item['hospitalName'],
          singleItemValue: value,
          singleItemAverageValue: parseInt(value / (that.parseMonthIntoNum(this.countSingleVO.endMonth) - that.parseMonthIntoNum(this.countSingleVO.startMonth) + 1))
        }
        this.singleItemTableData.push(row)
      }
      // // 计算平均值
      // var averageRow = {
      //   hospitalName: '平均值',
      //   singleItemValue: totalValue === 0 ? 0 : parseInt(totalValue / valueList.length)
      // }
      // this.singleItemTableData.unshift(averageRow)
      // 总和
      var totalRow = {
        // eslint-disable-next-line eqeqeq
        hospitalName: that.countSingleVO.centerId == 0 || that.countSingleVO.centerId == '' ? '湖南省主中心' : that.centerInfoList.find(item => item.centerId == that.countSingleVO.centerId).centerName,
        singleItemValue: totalValue,
        singleItemAverageValue: parseInt(totalValue / (valueList.length + (that.parseMonthIntoNum(this.countSingleVO.endMonth) - that.parseMonthIntoNum(this.countSingleVO.startMonth) + 1)))
      }
      this.singleItemTableData.unshift(totalRow)
    },
    // 根据返回结果生成各分中心单项指标表格数据
    generateSingleItemTableDataForSubCenter(data) {
      this.singleItemTableData = []
      var keys = Object.keys(data)
      var totalValue = 0
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        if (key === 'isSubCenterData') {
          continue
        }
        var value = this.calculateValueByMonth(data[key], this.countSingleVO.startMonth, this.countSingleVO.endMonth)
        totalValue += value
        var row = {
          hospitalName: key,
          singleItemValue: value,
          singleItemAverageValue: parseInt(value / (this.parseMonthIntoNum(this.countSingleVO.endMonth) - this.parseMonthIntoNum(this.countSingleVO.startMonth) + 1))
        }
        this.singleItemTableData.push(row)
      }
      // // 计算平均值
      // var averageRow = {
      //   hospitalName: '各分中心平均值',
      //   singleItemValue: totalValue === 0 ? 0 : parseInt(totalValue / keys.length)
      // }
      // this.singleItemTableData.unshift(averageRow)
      // 总和
      var totalRow = {
        hospitalName: '湖南省主中心',
        singleItemValue: totalValue,
        singleItemAverageValue: parseInt(totalValue / (keys.length - 1 + (this.parseMonthIntoNum(this.countSingleVO.endMonth) - this.parseMonthIntoNum(this.countSingleVO.startMonth) + 1)))
      }
      this.singleItemTableData.unshift(totalRow)
    },
    // 统计组合数据信息
    countCombinedItem() {
      var that = this
      // 若countCombinedVO的年份或数据项或起始月份或结束月份为空，返回false
      // eslint-disable-next-line eqeqeq
      if (this.countCombinedVO.itemName == '') {
        Message.error({
          message: '指标名称不能为空！'
        })
        return false
      }
      // eslint-disable-next-line eqeqeq
      if (this.countCombinedVO.year == '') {
        Message.warning({
          message: '年份不能为空！'
        })
        return false
      }
      // eslint-disable-next-line eqeqeq
      if (this.countCombinedVO.startMonth == '') {
        Message.warning({
          message: '起始月份不能为空！'
        })
        return false
      }
      // eslint-disable-next-line eqeqeq
      if (this.countCombinedVO.endMonth == '') {
        Message.warning({
          message: '结束月份不能为空！'
        })
        return false
      }
      // 判断起始月份和结束月份是否合法
      if (this.parseMonthIntoNum(this.countCombinedVO.startMonth) > this.parseMonthIntoNum(this.countCombinedVO.endMonth)) {
        Message.error({
          message: '起始月份不能大于结束月份！'
        })
        return false
      }
      countCombinedItem(this.countCombinedVO).then((res) => {
        // 先判断是否为统计各个分中心综合数据
        // eslint-disable-next-line eqeqeq
        if (res.data.isSubCenterData == 1) {
          that.generateCombinedItemTableDataForSubCenter(res.data)
        } else {
          var { valueList, ratio, hospitalNum } = res.data
          that.generateCombinedItemTableData(valueList, ratio, hospitalNum)
        }
      })
    },
    // 根据返回结果生成组合指标表格数据
    generateCombinedItemTableData(valueList, ratio, hospitalNum) {
      var that = this
      that.combinedItemTableData = []
      var totalNumeratorValue = 0
      var totalDenominatorValue = 0
      // 设置分子项和分母项名称
      that.numeratorName = valueList[0][0].itemName
      that.denominatorName = valueList[0][1].itemName
      // 计算每个医院的值
      for (var i = 0; i < valueList.length; i++) {
        var item = valueList[i]
        var numeratorValue = this.calculateValueByMonth(item[0], this.countCombinedVO.startMonth, this.countCombinedVO.endMonth)
        var denominatorValue = this.calculateValueByMonth(item[1], this.countCombinedVO.startMonth, this.countCombinedVO.endMonth)
        totalNumeratorValue += numeratorValue
        totalDenominatorValue += denominatorValue
        var itemData = {
          hospitalName: item[0].hospitalName,
          numeratorValue: numeratorValue,
          denominatorValue: denominatorValue,
          result: denominatorValue === 0 ? 0 : parseFloat((numeratorValue / denominatorValue * ratio).toFixed(2))
        }
        that.combinedItemTableData.push(itemData)
      }
      // 转换成浮点数
      var totalData = {
        // eslint-disable-next-line eqeqeq
        hospitalName: that.countCombinedVO.centerId == 0 || that.countCombinedVO.centerId == '' ? '湖南省主中心' : that.centerInfoList.find(item => item.centerId == that.countCombinedVO.centerId).centerName,
        numeratorValue: totalNumeratorValue,
        denominatorValue: totalDenominatorValue,
        result: totalDenominatorValue === 0 ? 0 : parseFloat((totalNumeratorValue / totalDenominatorValue * ratio).toFixed(2))
      }
      // 将总数据添加到表格数组中的第一个位置
      that.combinedItemTableData.unshift(totalData)
    },
    // 根据返回结果生成各个分中心组合指标表格数据
    generateCombinedItemTableDataForSubCenter(data) {
      var that = this
      var totalNumeratorValue = 0
      var totalDenominatorValue = 0
      that.combinedItemTableData = []
      // 设置分子项和分母项名称
      that.numeratorName = data['numeratorName']
      that.denominatorName = data['denominatorName']
      var ratio = data['ratio']
      var keyList = Object.keys(data)
      for (var i = 0; i < keyList.length; i++) {
        // 如果key不是分中心，则跳过
        // eslint-disable-next-line eqeqeq
        if (keyList[i] == 'numeratorName' || keyList[i] == 'denominatorName' || keyList[i] == 'isSubCenterData' || keyList[i] == 'ratio') {
          continue
        }
        // 计算单个分中心某月到某月的数据
        var numeratorValue = this.calculateValueByMonth(data[keyList[i]][0], this.countCombinedVO.startMonth, this.countCombinedVO.endMonth)
        var denominatorValue = this.calculateValueByMonth(data[keyList[i]][1], this.countCombinedVO.startMonth, this.countCombinedVO.endMonth)
        totalNumeratorValue += numeratorValue
        totalDenominatorValue += denominatorValue
        var tempItem
        // eslint-disable-next-line eqeqeq
        tempItem = {
          hospitalName: keyList[i],
          numeratorValue: numeratorValue,
          denominatorValue: denominatorValue,
          result: denominatorValue === 0 ? 0 : parseFloat((numeratorValue / denominatorValue * ratio).toFixed(2))
        }
        that.combinedItemTableData.push(tempItem)
      }
      var totalItem = {
        hospitalName: '湖南省主中心',
        numeratorValue: totalNumeratorValue,
        denominatorValue: totalDenominatorValue,
        result: totalDenominatorValue === 0 ? 0 : parseFloat((totalNumeratorValue / totalDenominatorValue * ratio).toFixed(2))
      }
      that.combinedItemTableData.unshift(totalItem)
    },
    // 计算单个医院某月到某月的数据
    calculateValueByMonth(value, startMonth, endMonth) {
      if (value == null) {
        return 0
      }
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
    // 将组合数据表格数据导出为excel
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
          itemName + '数据.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    // 将单个数据表格数据导出为excel
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
          itemName + '数据.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
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
      var hospitalNameList = []
      var valueList = []
      for (var i = 0; i < this.singleItemTableData.length; i++) {
        hospitalNameList.push(this.singleItemTableData[i]['hospitalName'])
        valueList.push(this.singleItemTableData[i]['singleItemAverageValue'])
      }
      var that = this
      var myChart = echarts.init(this.$refs.count_single)
      var option = {
        title: {
          text: that.countSingleVO.itemName + '统计图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          left: 0,
          top: 28
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
          data: hospitalNameList,
          axisLabel: {
            // x轴文字的配置
            show: true,
            interval: 0, // 使x轴文字显示全
            rotate: 60
          }
        },
        series: [
          {
            name: that.countSingleVO.itemName,
            type: 'bar',
            color: '#40d286',
            data: valueList
          }
        ]
      }
      myChart.setOption(option)
    },
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
      var hospitalNameList = []
      var valueList = []
      for (var i = 0; i < this.combinedItemTableData.length; i++) {
        hospitalNameList.push(this.combinedItemTableData[i]['hospitalName'])
        valueList.push(this.combinedItemTableData[i]['result'])
      }
      var that = this
      var myChart = echarts.init(this.$refs.count_combined)
      var option = {
        title: {
          text: that.countCombinedVO.itemName + '统计图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          left: 0,
          top: 28
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
          data: hospitalNameList,
          axisLabel: {
            // x轴文字的配置
            show: true,
            interval: 0, // 使x轴文字显示全
            rotate: 60
          }
        },
        series: [
          {
            name: that.countCombinedVO.itemName,
            type: 'bar',
            color: '#40d286',
            data: valueList
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
