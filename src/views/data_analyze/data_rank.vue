<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" type="border-card" style="margin-left: 40px; margin-top: 30px; width: 1250px;" @tab-click="handleClick">
          <el-tab-pane label="单个指标信息排行(图表)" name="first">
            <div>
              <el-select v-model="rankSingleVO.itemName" size="mini" filterable clearable placeholder="选择指标" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in singleItemNameList"
                  :key="item.itemName"
                  :label="item.itemName"
                  :value="item.itemName"
                />
              </el-select>
              <el-select v-model="rankSingleVO.year" size="mini" filterable clearable placeholder="选择年份" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="rankSingleVO.month" size="mini" filterable clearable placeholder="选择月份" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button type="primary" size="mini" style="margin-left: 5px;" @click="rankSingleItem()">搜索</el-button>
            </div>
            <div style="margin-top: 10px;">
              <el-select v-model="rankSingleVO.centerId" size="mini" filterable clearable placeholder="选择中心名称" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in centerInfoList"
                  :key="item.centerId"
                  :label="item.centerName"
                  :value="item.centerId"
                />
              </el-select>
              <el-select v-model="rankSingleVO.hospitalLevel" size="mini" filterable clearable placeholder="选择医院等级" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalLevelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="rankSingleVO.hospitalType" size="mini" filterable clearable placeholder="选择医院类型" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="rankSingleVO.order" size="mini" filterable clearable placeholder="选择排序类型" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in orderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div ref="compare_single" style="width: 1000px; height: 500px; margin-top: 20px;" />
          </el-tab-pane>
          <el-tab-pane label="组合指标信息排行（图表）" name="second">
            <div>
              <el-select v-model="typeId" size="mini" filterable clearable placeholder="选择指标类型" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in typeList"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeId"
                />
              </el-select>
              <el-select v-model="rankCombinedVO.itemName" size="mini" filterable clearable placeholder="选择指标" style="width: 12%; margin-left: 5px;" @focus="generateCombinedItemNameList">
                <el-option
                  v-for="item in combinedItemNameList"
                  :key="item.itemName"
                  :label="item.itemName"
                  :value="item.itemName"
                />
              </el-select>
              <el-select v-model="rankCombinedVO.year" size="mini" filterable clearable placeholder="选择年份" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="rankCombinedVO.month" size="mini" filterable clearable placeholder="选择月份" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button type="primary" size="mini" style="margin-left: 5px;" @click="rankCombinedItem()">搜索</el-button>
            </div>
            <div style="margin-top: 10px;">
              <el-select v-model="rankCombinedVO.centerId" size="mini" filterable clearable placeholder="选择中心名称" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in centerInfoList"
                  :key="item.centerId"
                  :label="item.centerName"
                  :value="item.centerId"
                />
              </el-select>
              <el-select v-model="rankCombinedVO.hospitalLevel" size="mini" filterable clearable placeholder="选择医院等级" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalLevelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="rankCombinedVO.hospitalType" size="mini" filterable clearable placeholder="选择医院类型" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in hospitalTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="rankCombinedVO.order" size="mini" filterable clearable placeholder="选择排序类型" style="width: 12%; margin-left: 5px;">
                <el-option
                  v-for="item in orderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div ref="compare_combined" style="width: 1000px; height: 500px; margin-top: 20px;" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { getCenterTableData } from '@/api/center'
import { getItemNameList } from '@/api/bio_feature'
import { rankSingle, rankCombined, getTypeList, getCombinedItemNameList } from '@/api/data_analyze'
import { Message } from 'element-ui'
import echarts from 'echarts'

export default {
  name: 'DataRank',
  data() {
    return {
      // 对单个数据排行
      rankSingleVO: {
        itemName: '',
        year: '',
        centerId: '',
        hospitalLevel: '',
        hospitalType: '',
        month: '',
        order: ''
      },
      typeId: '',
      typeList: [],
      // 对组合数据排行
      rankCombinedVO: {
        itemName: '',
        year: '',
        centerId: '',
        hospitalLevel: '',
        hospitalType: '',
        month: '',
        order: ''
      },
      // 单个数据指标名称列表
      singleItemNameList: [],
      // 组合数据指标名称列表
      combinedItemNameList: [],
      // 医院信息列表
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
          label: '一月'
        },
        {
          value: 'february',
          label: '二月'
        },
        {
          value: 'march',
          label: '三月'
        },
        {
          value: 'april',
          label: '四月'
        },
        {
          value: 'may',
          label: '五月'
        },
        {
          value: 'june',
          label: '六月'
        },
        {
          value: 'july',
          label: '七月'
        },
        {
          value: 'august',
          label: '八月'
        },
        {
          value: 'september',
          label: '九月'
        },
        {
          value: 'october',
          label: '十月'
        },
        {
          value: 'november',
          label: '十一月'
        },
        {
          value: 'december',
          label: '十二月'
        }
      ],
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
      orderOptions: [{
        value: 'asc',
        label: '由小到大'
      }, {
        value: 'desc',
        label: '由大到小'
      }],
      // tabs默认显示
      activeName: 'first'
    }
  },
  mounted() {
    this.generateSingleItemNameList()
    this.generateCenterNameList()
    this.generateTypeList()
  },
  methods: {
    // 获取组合指标类型列表
    generateTypeList() {
      var that = this
      getTypeList().then((res) => {
        that.typeList = []
        const { data } = res
        that.typeList = data
      })
    },
    // 获取中心名称列表
    generateCenterNameList() {
      var that = this
      getCenterTableData().then(res => {
        that.centerInfoList = []
        const { data } = res
        that.centerInfoList = data
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
    // 比较单个数据
    rankSingleItem() {
      // 判断rankSingleVO是否为空
      if (this.rankSingleVO.itemName === '' || this.rankSingleVO.year === '' || this.rankSingleVO.month === '' || this.rankSingleVO.order === '') {
        this.$message({
          message: '请完整填写对单个数据排行的条件',
          type: 'warning'
        })
        return
      }
      rankSingle(this.rankSingleVO).then((res) => {
        const { data } = res
        this.handleRankData(data, 'single', this.rankSingleVO.month)
      })
    },
    // 比较组合数据
    rankCombinedItem() {
      // 判断rankCombinedVO是否为空
      if (this.rankCombinedVO.itemName === '' || this.rankCombinedVO.year === '' || this.rankCombinedVO.month === '' || this.rankCombinedVO.order === '') {
        this.$message({
          message: '请完整填写比较组合数据的条件',
          type: 'warning'
        })
        return
      }
      rankCombined(this.rankCombinedVO).then((res) => {
        const { data } = res
        this.handleRankData(data, 'combined', this.rankCombinedVO.month)
      })
    },
    // 切换tabs触发
    handleClick() {
    },
    // 初始化单个指标对比图表
    initRankSingleChart(itemName, year, month, rankValueList, hospitalNameList) {
      var that = this
      var myChart = echarts.init(this.$refs.compare_single)
      var option = {
        title: {
          text: year + '年' + that.monthToChinese(month) + itemName + '排行榜'
        },
        tooltip: {
          trigger: 'axis'
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
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          // type: 'category',
          // boundaryGap: false,
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: hospitalNameList
        },
        series: [
          {
            name: itemName,
            type: 'bar',
            barWidth: '20',
            stack: itemName,
            data: rankValueList,
            itemStyle: {
              normal: {
                // 浅青色
                color: '#2585a6'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    // 初始化组合指标对比图表
    initRankCombinedChart(itemName, year, month, rankValueList, hospitalNameList) {
      var that = this
      var myChart = echarts.init(this.$refs.compare_combined)
      var option = {
        title: {
          text: year + '年' + that.monthToChinese(month) + itemName + '排行榜'
        },
        tooltip: {
          trigger: 'axis',
          formatter: itemName + '<br />' + '{b}: {c}%'
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
        xAxis: {
          // type: 'category',
          // boundaryGap: false,
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: hospitalNameList
        },
        series: [
          {
            name: itemName,
            type: 'bar',
            barWidth: '20',
            stack: itemName,
            data: rankValueList,
            itemStyle: {
              normal: {
                // 浅青色
                color: '#2585a6'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    // 处理对比数据, data中包含n个value对象
    handleRankData(data, dataType, month) {
      // 处理指标值，以渲染图表
      var dataList = this.fetchDataFromValues(data, month)
      // 初始化单个指标对比图表
      // eslint-disable-next-line eqeqeq
      if (dataType == 'single') {
        this.initRankSingleChart(data[0].itemName, data[0].year, month, dataList.rankValueList, dataList.hospitalNameList)
      }
      // eslint-disable-next-line eqeqeq
      if (dataType == 'combined') {
        this.initRankCombinedChart(data[0].itemName, data[0].year, month, dataList.rankValueList, dataList.hospitalNameList)
      }
    },
    // 从Value对象中获取每个月的数据
    fetchDataFromValues(valueList, month) {
      var rankValueList = []
      var hospitalNameList = []
      for (var i = 0; i < valueList.length && rankValueList.length < 10; i++) {
        if (valueList[i][month] != null) {
          rankValueList.push(valueList[i][month])
          hospitalNameList.push(valueList[i].hospitalName)
        }
      }
      var dataList = {
        rankValueList: rankValueList,
        hospitalNameList: hospitalNameList
      }
      return dataList
    },
    // 将英文月份转换为中文
    monthToChinese(month) {
      var monthChinese = ''
      switch (month) {
        case 'january':
          monthChinese = '1月'
          break
        case 'february':
          monthChinese = '2月'
          break
        case 'march':
          monthChinese = '3月'
          break
        case 'april':
          monthChinese = '4月'
          break
        case 'may':
          monthChinese = '5月'
          break
        case 'june':
          monthChinese = '6月'
          break
        case 'july':
          monthChinese = '7月'
          break
        case 'august':
          monthChinese = '8月'
          break
        case 'september':
          monthChinese = '9月'
          break
        case 'october':
          monthChinese = '10月'
          break
        case 'november':
          monthChinese = '11月'
          break
        case 'december':
          monthChinese = '12月'
          break
        default:
          monthChinese = '未知'
          break
      }
      return monthChinese
    }
  }
}
</script>
