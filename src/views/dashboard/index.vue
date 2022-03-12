<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" type="border-card" style="margin-left: 50px; margin-top: 30px; width: 1100px;" @tab-click="handleClick">
          <el-tab-pane label="生命体征类指标" name="first">
            <div style="margin-top: 10px;">
              <el-select v-model="searchCombinedBioFeatureForm.combinedBioFeatureName" filterable clearable placeholder="请选择生命体征类指标" style="width: 21%;">
                <el-option
                  v-for="item in combinedBioFeatureNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="searchCombinedBioFeatureForm.year" filterable clearable placeholder="请选择年份" style="width: 20%; margin-left: 30px;">
                <el-option
                  v-for="item in year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button type="primary" style="margin-left: 20px;" @click="searchCombinedBioFeature()">搜索</el-button>
              <el-button type="primary" style="margin-left: 20px;" @click="newBioFeatureItemVisible = true; generateBioFeatureItemName()">输入指标项</el-button>
            </div>
            <el-dialog title="输入指标项" :visible.sync="newBioFeatureItemVisible" style="text-align: center">
              <el-form :model="newBioFeatureItemForm">
                <el-form-item>
                  <span>选择指标项</span>
                  <el-select v-model="newBioFeatureItemForm.itemName" filterable clearable placeholder="请选择要输入的指标项" style="width: 30%; margin-left: 20px;">
                    <el-option
                      v-for="item in bioFeatureItemNameList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <span>选择年份</span>
                  <el-select v-model="newBioFeatureItemForm.year" filterable clearable placeholder="请选择年份" style="width: 30%; margin-left: 30px;">
                    <el-option
                      v-for="item in year"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <span>选择月份</span>
                  <el-select v-model="bioFeatureItemMonth" filterable clearable placeholder="请选择月份" style="width: 30%; margin-left: 30px;">
                    <el-option
                      v-for="item in month"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <span>输入指标值</span>
                  <el-input v-model="bioFeatureItemValue" placeholder="请输入指标值" style="width: 30%; margin-left: 20px;" />
                </el-form-item>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="newBioFeatureItemVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveBioFeatureInfo()">保 存</el-button>
              </div>
            </el-dialog>
            <div ref="bio_feature_item_chart" style="width: 1000px; height: 500px; margin-top: 20px;" />
          </el-tab-pane>
          <el-tab-pane label="麻醉科结构管理指标" name="second">麻醉科结构管理指标</el-tab-pane>
          <el-tab-pane label="麻醉科过程管理指标" name="third">麻醉科过程管理指标</el-tab-pane>
          <el-tab-pane label="麻醉科并发症相关指标" name="forth">麻醉科并发症相关指标</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import echarts from 'echarts'
import { getItemNameList, getCombinedBioFeatureItemNameList, saveBioFeatureInfo, getCombinedBioFeatureData } from '@/api/bio_feature'
import { Message } from 'element-ui'

export default {
  name: 'Homepage',
  data() {
    return {
      // 默认选中哪个卡片
      activeName: 'first',
      echartTitle: 'ECharts 入门示例',
      // 搜索指定生命特征类指标
      searchCombinedBioFeatureForm: {
        combinedBioFeatureName: '',
        hospitalName: '',
        year: ''
      },
      // 生命特征类指标列表
      combinedBioFeatureNameList: [],
      newBioFeatureItemVisible: false,
      newBioFeatureItemForm: {
        itemName: '',
        hospitalName: '',
        year: ''
      },
      bioFeatureItemMonth: '',
      bioFeatureItemValue: '',
      bioFeatureItemNameList: [],
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
      ]
    }
  },
  created() {
  },
  mounted() {
    this.generateCombinedBioFeatureItemNameList()
    // this.initBioFeatureItemChart()
  },
  methods: {
    // 保留方法，切换卡片时加载名称列表
    handleClick() {
      if (this.activeName === 'first') {
        console.log('1')
      }
      if (this.activeName === 'second') {
        console.log('2')
      }
      if (this.activeName === 'third') {
        console.log('3')
      }
      if (this.activeName === 'forth') {
        console.log('4')
      }
    },
    // 生成生命特征类指标名字列表
    generateCombinedBioFeatureItemNameList() {
      var that = this
      getCombinedBioFeatureItemNameList().then((res) => {
        const { data } = res
        this.generateItemNameList(that.combinedBioFeatureNameList, data)
      })
    },
    // 生成生命特征类指标字段名字列表
    generateBioFeatureItemName() {
      var that = this
      if (this.bioFeatureItemNameList.length === 0) {
        getItemNameList().then((res) => {
          const { data } = res
          this.generateItemNameList(that.bioFeatureItemNameList, data)
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
    // 通用方法, 按公式计算对应字段每个月的值。
    // numerator: 分子 denominator: 分母 返回一个list, 包含12个月的值
    getEchartsValueList(numerator, denominator) {
      var valueList = []
      var keys = Object.keys(numerator)

      for (var i = 0; i < 12; i++) {
        var key = keys[i]
        var nValue = numerator[key]
        var dValue = denominator[key]
        if (nValue == null) {
          nValue = 0
        }
        // 防止除0异常
        if (dValue == null) {
          dValue = 1
        }
        valueList.push((nValue / dValue) * 100)
      }
      return valueList
    },
    // 保存生命特征类指标字段的值
    saveBioFeatureInfo() {
      var that = this
      this.newBioFeatureItemForm.hospitalName = this.$store.getters.hospitalName
      this.newBioFeatureItemForm[this.bioFeatureItemMonth] = this.bioFeatureItemValue
      saveBioFeatureInfo(this.newBioFeatureItemForm).then((res) => {
        Message({
          message: res.msg || '保存成功',
          type: 'success'
        })
        that.newBioFeatureItemForm = {
          itemName: res.data.itemName,
          hospitalName: res.data.hospitalName,
          year: res.data.year
        }
      })
      this.newBioFeatureItemVisible = false
    },
    // 搜索指定生命特征类指标，并渲染echart
    searchCombinedBioFeature() {
      var that = this
      this.searchCombinedBioFeatureForm.hospitalName = this.$store.getters.hospitalName
      getCombinedBioFeatureData(this.searchCombinedBioFeatureForm).then((res) => {
        const { msg, data } = res
        Message({
          message: msg,
          type: 'success'
        })
        var valueList = that.getEchartsValueList(data.numerator, data.denominator)
        that.initBioFeatureItemChart(data.item_name, valueList)
      })
    },
    // 初始化生命特征类指标echart
    initBioFeatureItemChart(item_name, valueList) {
      var BFIC = echarts.init(this.$refs.bio_feature_item_chart)
      BFIC.setOption({
        title: {
          text: item_name
        },
        tooltip: {
          formatter: '{c}%'
        },
        legend: {
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {},
        series: [
          {
            name: item_name,
            type: 'line',
            itemStyle: {
              label: {
                formatter: '{b}/n{c}%'
              }
            },
            data: valueList
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
