<template>
  <el-container>
    <el-header>
      <div>
        <el-select v-model="hospitalName" filterable clearable placeholder="请选择医院" style="width: 20%; margin-left: 50px; margin-top: 30px;" @focus="generateOtherHospitalData">
          <el-option
            v-for="item in hospitalTableData"
            :key="item.id"
            :label="item.hospitalName"
            :value="item.hospitalName"
          />
        </el-select>
        <el-button type="primary" style="margin-left: 20px;" @click="searchHospital()">搜索</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="hospitalTableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
        border
        style="width: 700px; margin-left: 50px;margin-top: 20px;"
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
            <el-button type="text" size="small" @click="seeOtherHospitalInfo(scope.row);generateValueTableData() ">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[5, 10, 15]"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="hospitalTableData.length"
        style="margin-left: 100px; margin-top: 50px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-main>
    <el-dialog
      title="其他医院信息"
      :visible.sync="dialogVisible"
      style="text-align: center"
      width="1300px"
      center
    >
      <el-tabs v-model="activeName" type="border-card" style="margin-top: 30px; width: 1250px;" @tab-click="handleClick">
        <el-tab-pane label="查看指标信息（表格）" name="first">
          <el-select v-model="SItemName" size="mini" filterable clearable placeholder="请选择指标" style="width: 10%;" @focus="generateBioFeatureItemName">
            <el-option
              v-for="item in bioFeatureItemNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="SYear" size="mini" filterable clearable placeholder="请选择年份" style="width: 10%; margin-left: 30px;" @focus="generateValueTableData">
            <el-option
              v-for="item in year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" size="mini" style="margin-left: 20px;" @click="searchValueTableObj()">搜索</el-button>
          <!-- slice(start, end) 方法以新的数组对象，返回数组中被选中的元素。 -->
          <el-table
            :data="valueTableData.slice((currentPage2 - 1) * pagesize2, currentPage2 * pagesize2)"
            border
            style="margin-top: 20px;"
            size="mini"
          >
            <el-table-column
              prop="year"
              label="年份"
              width="50px"
            />
            <el-table-column
              prop="itemName"
              label="指标名称"
            />
            <el-table-column
              prop="january"
              label="一月"
              width="70px"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.january" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              prop="february"
              label="二月"
              width="70px"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.february" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              prop="march"
              label="三月"
              width="70px"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.march" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              prop="april"
              label="四月"
              width="70px"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.april" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              prop="may"
              label="五月"
              width="70px"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.may" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              prop="june"
              label="六月"
              width="70px"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.june" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              prop="july"
              label="七月"
              width="70px"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.july" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              prop="august"
              label="八月"
              width="70px"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.august" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              prop="september"
              label="九月"
              width="70px"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.september" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              prop="october"
              label="十月"
              width="70px"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.october" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              prop="november"
              label="十一月"
              width="70px"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.november" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              prop="december"
              label="十二月"
              width="70px"
            >
              <template slot-scope="scope">
                <input v-model="scope.row.december" type="text" style="width: 100%; border: none; background-color: transparent;">
              </template>
            </el-table-column>
            <el-table-column
              prop="saveTime"
              label="保存时间"
              width="135px"
            />
            <el-table-column
              label="操作"
              width="110px"
            >
              <template slot-scope="scope">
                <div v-if="checkAuthority()">
                  <el-button type="text" size="small" @click="updateValueByYear(scope.row)">更改</el-button>
                  <el-button type="text" size="small" @click="deleteValue(scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-sizes="[5, 10, 15]"
            :current-page="currentPage2"
            :page-size="pagesize2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="valueTableData.length"
            style="text-align:center; margin-top: 50px;"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
          />
        </el-tab-pane>
        <el-tab-pane label="查看单个指标信息(图表)" name="second">
          <div style="margin-top: 10px;">
            <el-select v-model="singleItemForm.itemName" size="mini" filterable clearable placeholder="请选择指标" style="width: 10%;" @focus="generateBioFeatureItemName()">
              <el-option
                v-for="item in bioFeatureItemNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="singleItemForm.year" size="mini" filterable clearable placeholder="请选择年份" style="width: 10%; margin-left: 20px;">
              <el-option
                v-for="item in year"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="singleItemEchartShape" size="mini" filterable clearable placeholder="请选择图表类型" style="width: 10%; margin-left: 20px;">
              <el-option
                v-for="item in shapeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="singleItemColor" size="mini" filterable clearable placeholder="请选择图表颜色" style="width: 10%; margin-left: 20px;">
              <el-option
                v-for="item in colorList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button type="primary" size="mini" style="margin-left: 20px;" @click="searchSingleItemInfo()">搜索</el-button>
          </div>
          <div ref="single_item_chart" style="width: 1000px; height: 500px; margin-top: 20px;" />
        </el-tab-pane>
        <el-tab-pane label="查看组合指标信息（图表）" name="third">
          <div style="margin-top: 10px;">
            <el-select v-model="searchCombinedBioFeatureForm.combinedBioFeatureName" size="mini" filterable clearable placeholder="请选择指标" style="width: 10%;">
              <el-option
                v-for="item in combinedBioFeatureNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="searchCombinedBioFeatureForm.year" size="mini" filterable clearable placeholder="请选择年份" style="width: 10%; margin-left: 20px;">
              <el-option
                v-for="item in year"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="shape" size="mini" filterable clearable placeholder="请选择图表类型" style="width: 10%; margin-left: 20px;">
              <el-option
                v-for="item in shapeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="combinedItemColor" size="mini" filterable clearable placeholder="请选择图表颜色" style="width: 10%; margin-left: 20px;">
              <el-option
                v-for="item in colorList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button type="primary" size="mini" style="margin-left: 20px;" @click="searchCombinedBioFeature()">搜索</el-button>
          </div>
          <div ref="bio_feature_item_chart" style="width: 1000px; height: 500px; margin-top: 50px;margin-left: 150px;" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import echarts from 'echarts'
import { generateOtherHospitalData, getCombinedBioFeatureItemNameList, getCombinedBioFeatureData, getItemNameList } from '@/api/bio_feature'
import { getValueTableData, updateValueByYear, deleteValue, getSingleItemData } from '@/api/bio_feature'
import { Message, MessageBox } from 'element-ui'
export default {
  name: 'OtherHospitalInfo',
  data() {
    return {
      activeName: 'first',
      hospitalName: '',
      otherHospitalName: '',
      hospitalNameList: [],
      hospitalTableData: [],
      currentPage: 1,
      pagesize: 5,
      currentPage2: 1,
      pagesize2: 5,
      dialogVisible: false,
      // 搜索指定生命特征类指标
      searchCombinedBioFeatureForm: {
        combinedBioFeatureName: '',
        hospitalName: '',
        year: ''
      },
      singleItemForm: {
        itemName: '',
        hospitalName: '',
        year: ''
      },
      singleItemEchartShape: 'bar',
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
      // 生命特征类指标列表
      combinedBioFeatureNameList: [],
      shape: 'bar',
      shapeList: [
        {
          value: 'bar',
          label: '柱状图'
        }, {
          value: 'line',
          label: '折线图'
        }, {
          value: 'pie',
          label: '饼状图'
        }
      ],
      SItemName: '',
      SYear: '',
      bioFeatureItemNameList: [],
      valueTableData: [],
      newValueByYearForm: {
        itemName: '',
        hospitalName: '',
        year: '',
        january: '',
        february: '',
        march: '',
        april: '',
        may: '',
        june: '',
        july: '',
        autust: '',
        september: '',
        october: '',
        november: '',
        december: ''
      },
      singleItemColor: '#FF0000',
      combinedItemColor: '#FF0000',
      colorList: [
        {
          value: '#FF0000',
          label: '红色'
        }, {
          value: '#800080',
          label: '紫色'
        },
        {
          value: '#7B68EE',
          label: '间暗蓝色'
        }, {
          value: '#FF7F50',
          label: '珊瑚色'
        },
        {
          value: '#D2B48C',
          label: '茶色'
        }, {
          value: '#FF69B4',
          label: '粉红色'
        },
        {
          value: '#00BFFF',
          label: '浅蓝色'
        }, {
          value: '#32CD32',
          label: '绿色'
        }
      ]
    }
  },
  mounted() {
    this.generateOtherHospitalData()
    this.generateCombinedBioFeatureItemNameList()
  },
  methods: {
    updateValueByYear(value) {
      this.newValueByYearForm = value
      updateValueByYear(this.newValueByYearForm).then((res) => {
        Message({
          message: res.msg,
          type: 'success'
        })
        this.generateValueTableData()
      })
    },
    deleteValue(value) {
      MessageBox.confirm('确定删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteValue(value).then((res) => {
          Message.success({
            message: res.msg || '删除失败！'
          })
          setTimeout(() => {
            this.generateValueTableData()
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
    checkAuthority() {
      // eslint-disable-next-line eqeqeq
      if (this.$store.getters.centerType == 2) {
        return true
      }
      return false
    },
    handleClick() {
      if (this.activeName === 'first') {
        console.log('1')
      }
      if (this.activeName === 'second') {
        this.generateValueTableData()
      }
    },
    // 获取表格信息
    generateValueTableData() {
      var that = this
      that.valueTableData = []
      getValueTableData(this.otherHospitalName).then((res) => {
        const { data } = res
        that.valueTableData = data
      })
    },
    // 寻找指标值数据表中的某一项
    searchValueTableObj() {
      // eslint-disable-next-line no-empty
      if (this.SItemName === '' || this.SYear === '') {
        Message({
          message: '请先选择指标或年份！',
          type: 'error'
        })
        this.generateValueTableData()
        return
      }
      for (var i = 0; i < this.valueTableData.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (this.valueTableData[i].itemName === this.SItemName && this.valueTableData[i].year == this.SYear) {
          var obj = this.valueTableData[i]
          this.valueTableData = []
          this.valueTableData.push(obj)
          break
        }
      }
      this.SItemName = ''
      this.SYear = ''
    },
    // 生成单项指标项名称list
    generateBioFeatureItemName() {
      var that = this
      this.bioFeatureItemNameList = []
      getItemNameList().then((res) => {
        const { data } = res
        this.generateItemNameList(that.bioFeatureItemNameList, data)
      })
    },
    seeOtherHospitalInfo(data) {
      this.otherHospitalName = data.hospitalName
      this.dialogVisible = true
    },
    // 获取组合指标项名称list
    generateCombinedBioFeatureItemNameList() {
      var that = this
      getCombinedBioFeatureItemNameList().then((res) => {
        const { data } = res
        this.generateItemNameList(that.combinedBioFeatureNameList, data)
      })
    },
    // 获取echarts展示的数据
    getEchartsValueList(numerator, denominator, ratio) {
      var valueList = []
      var keys = Object.keys(numerator)

      for (var i = 0; i < 12; i++) {
        var key = keys[i]
        var nValue = numerator[key]
        var dValue = denominator[key]
        if (nValue == null || dValue == null) {
          valueList.push(0)
          continue
        }
        valueList.push((nValue / dValue) * ratio)
      }
      return valueList
    },
    getSingleItemEchartsValueList(values) {
      var valueList = []
      // 获取图中所有键名，返回一个键名数组
      var keys = Object.keys(values)

      for (var i = 0; i < 12; i++) {
        var key = keys[i]
        var value = values[key]
        if (value == null) {
          valueList.push(0)
          continue
        }
        valueList.push(value)
      }
      return valueList
    },
    searchSingleItemInfo() {
      var BFIC = echarts.init(this.$refs.single_item_chart)
      BFIC.clear()
      var that = this
      this.singleItemForm.hospitalName = this.otherHospitalName
      if (this.singleItemForm.itemName === '') {
        Message({
          message: '请先选择要展示的指标项名称',
          type: 'error'
        })
        return
      }
      if (this.singleItemForm.year === '') {
        Message({
          message: '请先选择年份',
          type: 'error'
        })
        return
      }
      getSingleItemData(this.singleItemForm).then((res) => {
        const { msg, data } = res
        Message({
          message: msg,
          type: 'success',
          duration: 2 * 1000
        })
        var valueList = []
        // eslint-disable-next-line eqeqeq
        if (that.singleItemEchartShape == 'pie') {
          valueList = that.getSingleItemPieValueList(data.values)
          that.initSingleItemPieChart(data.item_name, valueList)
          return
        }
        valueList = that.getSingleItemEchartsValueList(data.values)
        that.initSingleItemChart(data.item_name, valueList)
      })
    },
    getSingleItemPieValueList(values) {
      var valueList = []
      // 获取图中所有键名，返回一个键名数组
      var keys = Object.keys(values)

      for (var i = 0; i < 12; i++) {
        var key = keys[i]
        var value = values[key]
        if (value == null) {
          valueList.push(
            {
              'value': 0,
              'name': (i + 1) + '月'
            })
        }
        valueList.push(
          {
            'value': value,
            'name': (i + 1) + '月'
          })
        continue
      }
      return valueList
    },
    getPieEchartsValueList(numerator, denominator, ratio) {
      var valueList = []
      var keys = Object.keys(numerator)

      for (var i = 0; i < 12; i++) {
        var key = keys[i]
        var nValue = numerator[key]
        var dValue = denominator[key]

        if (nValue == null || dValue == null) {
          valueList.push(
            {
              'value': 0,
              'name': (i + 1) + '月'
            })
          continue
        }
        var value = (nValue / dValue) * ratio
        valueList.push(
          {
            'value': value.toFixed(2),
            'name': (i + 1) + '月'
          })
      }
      return valueList
    },
    // 通用方法，将后端返回来的名称数组变成符合el-option展示的格式
    generateItemNameList(list, data) {
      for (var i = 0; i < data.length; i++) {
        var tempObj = {}
        tempObj.value = data[i].itemName
        tempObj.label = data[i].itemName
        list.push(tempObj)
      }
    },
    // 搜索指定生命特征类指标，并渲染echart
    searchCombinedBioFeature() {
      var BFIC = echarts.init(this.$refs.bio_feature_item_chart)
      BFIC.clear()
      var that = this
      this.searchCombinedBioFeatureForm.hospitalName = this.otherHospitalName
      if (this.searchCombinedBioFeatureForm.combinedBioFeatureName === '') {
        Message({
          message: '请先选择要展示的指标项名称',
          type: 'error'
        })
        return
      }
      if (this.searchCombinedBioFeatureForm.year === '') {
        Message({
          message: '请先选择年份',
          type: 'error'
        })
        return
      }
      getCombinedBioFeatureData(this.searchCombinedBioFeatureForm).then((res) => {
        const { msg, data } = res
        Message({
          message: msg,
          type: 'success',
          duration: 2 * 1000
        })
        var valueList = []
        // eslint-disable-next-line eqeqeq
        if (that.shape == 'pie') {
          valueList = that.getPieEchartsValueList(data.numerator, data.denominator, data.ratio)
          that.initCombinedItemPieChart(data.item_name, valueList)
          return
        }
        valueList = that.getEchartsValueList(data.numerator, data.denominator, data.ratio)
        that.initBioFeatureItemChart(data.item_name, valueList)
      })
    },
    // 初始化生命特征类指标echart
    initBioFeatureItemChart(item_name, valueList) {
      var that = this
      var BFIC = echarts.init(this.$refs.bio_feature_item_chart)
      BFIC.setOption({
        title: {
          text: item_name
        },
        tooltip: {
          formatter: item_name + '<br />' + '{b}: {c}%'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
          },
          show: true
        },
        series: [
          {
            name: item_name,
            type: that.shape,
            itemStyle: { // ---图形形状
              color: that.combinedItemColor,
              barBorderRadius: [5, 5, 0, 0]
            },
            data: valueList
          }
        ]
      })
    },
    initCombinedItemPieChart(item_name, valueList) {
      var CIPC = echarts.init(this.$refs.bio_feature_item_chart)
      CIPC.setOption({
        title: {
          text: item_name,
          x: 'left'
        },
        legend: {
          data: [item_name]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        tooltip: {
          formatter: item_name + '<br />' + '{b}: {c}%'
        },
        series: [
          {
            name: item_name,
            type: 'pie',
            data: valueList
          }
        ]
      })
    },
    initSingleItemChart(item_name, valueList) {
      var that = this
      var BFIC = echarts.init(this.$refs.single_item_chart)
      BFIC.setOption({
        title: {
          text: item_name,
          x: 'left'
        },
        legend: {
          data: [item_name]
        },
        tooltip: {},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {},
        series: [
          {
            name: item_name,
            type: that.singleItemEchartShape,
            itemStyle: { // ---图形形状
              color: that.singleItemColor,
              barBorderRadius: [5, 5, 0, 0]
            },
            data: valueList
          }
        ]
      })
    },
    initSingleItemPieChart(item_name, valueList) {
      var that = this
      var SIPC = echarts.init(this.$refs.single_item_chart)
      SIPC.setOption({
        title: {
          text: item_name,
          x: 'left'
        },
        legend: {
          data: [item_name]
        },
        tooltip: {},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: item_name,
            type: that.singleItemEchartShape,
            data: valueList
          }
        ]
      })
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
    // 根据当前登录用户的id生成可访问医院表格数据
    generateOtherHospitalData() {
      var that = this
      generateOtherHospitalData(this.$store.getters.userId).then((res) => {
        that.hospitalTableData = res.data
      })
    },
    // 搜索指定医院
    searchHospital() {
      if (this.hospitalName === '') {
        this.generateOtherHospitalData()
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
    }
  }
}
</script>
