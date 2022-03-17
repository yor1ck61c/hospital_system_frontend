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
            <el-button type="text" size="small" @click="seeOtherHospitalInfo(scope.row)">查看</el-button>
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
    >
      <div style="margin-top: 10px;">
        <el-select v-model="searchCombinedBioFeatureForm.combinedBioFeatureName" filterable clearable placeholder="请选择指标" style="width: 20%;">
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
      </div>
      <div ref="bio_feature_item_chart" style="width: 800px; height: 400px; margin-top: 20px;" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>

<script>
import echarts from 'echarts'
import { generateOtherHospitalData, getCombinedBioFeatureItemNameList, getCombinedBioFeatureData } from '@/api/bio_feature'
import { Message } from 'element-ui'
export default {
  name: 'OtherHospitalInfo',
  data() {
    return {
      hospitalName: '',
      otherHospitalName: '',
      hospitalNameList: [],
      hospitalTableData: [],
      currentPage: 1,
      pagesize: 5,
      dialogVisible: false,
      // 搜索指定生命特征类指标
      searchCombinedBioFeatureForm: {
        combinedBioFeatureName: '',
        hospitalName: '',
        year: ''
      },
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
      // 生命特征类指标列表
      combinedBioFeatureNameList: []
    }
  },
  mounted() {
    this.generateOtherHospitalData()
    this.generateCombinedBioFeatureItemNameList()
  },
  methods: {
    seeOtherHospitalInfo(data) {
      this.otherHospitalName = data.hospitalName
      this.dialogVisible = true
    },
    generateCombinedBioFeatureItemNameList() {
      var that = this
      getCombinedBioFeatureItemNameList().then((res) => {
        const { data } = res
        this.generateItemNameList(that.combinedBioFeatureNameList, data)
      })
    },
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
            type: 'bar',
            itemStyle: {
              label: {
                formatter: '{b}/n{c}%'
              }
            },
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
    generateOtherHospitalData() {
      var that = this
      generateOtherHospitalData(this.$store.getters.userId).then((res) => {
        that.hospitalTableData = res.data
      })
    },
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
