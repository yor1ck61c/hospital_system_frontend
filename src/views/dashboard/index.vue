<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" type="border-card" style="margin-left: 50px; margin-top: 30px; width: 1100px;" @tab-click="handleClick">
          <el-tab-pane label="生命体征类指标" name="first">
            <div style="margin-top: 10px;">
              <el-select v-model="searchCombinedBioFeatureForm.combinedBioFeatureName" filterable placeholder="请选择生命体征类指标">
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
              <el-button type="primary" style="margin-left: 20px;">搜索</el-button>
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
import { getItemNameList, saveBioFeatureInfo } from '@/api/bio_feature'
import { Message } from 'element-ui'

export default {
  name: 'Homepage',
  data() {
    return {
      activeName: 'first',
      echartTitle: 'ECharts 入门示例',
      searchCombinedBioFeatureForm: {
        combinedBioFeatureName: '',
        year: ''
      },
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
    this.initBioFeatureItemChart()
  },
  methods: {
    handleClick() {
      // alert('click')
    },
    generateBioFeatureItemName() {
      if (this.bioFeatureItemNameList.length === 0) {
        getItemNameList().then((res) => {
          const { data } = res
          this.generateBioFeatureItemNameList(data)
        })
      } else {
        console.log('已完成加载')
      }
    },
    generateBioFeatureItemNameList(data) {
      for (var i = 0; i < data.length; i++) {
        var tempObj = {}
        tempObj.value = data[i].itemName
        tempObj.label = data[i].itemName
        this.bioFeatureItemNameList.push(tempObj)
      }
    },
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
    initBioFeatureItemChart() {
      var BFIC = echarts.init(this.$refs.bio_feature_item_chart)
      BFIC.setOption({
        title: {
          text: this.echartTitle// this.echartTitle
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
