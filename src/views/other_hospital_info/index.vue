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
    >
      <el-tabs v-model="activeName" type="border-card" style="margin-top: 30px; width: 1250px;" @tab-click="handleClick">
        <el-tab-pane label="查看指标信息（图表）" name="first">
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
            <el-select v-model="shape" filterable clearable placeholder="请选择图表类型" style="width: 20%; margin-left: 30px;">
              <el-option
                v-for="item in shapeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button type="primary" style="margin-left: 20px;" @click="searchCombinedBioFeature()">搜索</el-button>
          </div>
          <div ref="bio_feature_item_chart" style="width: 1000px; height: 500px; margin-top: 50px;margin-left: 150px;" />
        </el-tab-pane>
        <el-tab-pane label="查看指标信息（表格）" name="second">
          <el-select v-model="SItemName" filterable clearable placeholder="请选择指标" style="width: 20%;" @focus="generateBioFeatureItemName">
            <el-option
              v-for="item in bioFeatureItemNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="SYear" filterable clearable placeholder="请选择年份" style="width: 20%; margin-left: 30px;" @focus="generateValueTableData">
            <el-option
              v-for="item in year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" style="margin-left: 20px;" @click="searchValueTableObj()">搜索</el-button>
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
            />
            <el-table-column
              prop="february"
              label="二月"
              width="70px"
            />
            <el-table-column
              prop="march"
              label="三月"
              width="70px"
            />
            <el-table-column
              prop="april"
              label="四月"
              width="70px"
            />
            <el-table-column
              prop="may"
              label="五月"
              width="70px"
            />
            <el-table-column
              prop="june"
              label="六月"
              width="70px"
            />
            <el-table-column
              prop="july"
              label="七月"
              width="70px"
            />
            <el-table-column
              prop="august"
              label="八月"
              width="70px"
            />
            <el-table-column
              prop="september"
              label="九月"
              width="70px"
            />
            <el-table-column
              prop="october"
              label="十月"
              width="70px"
            />
            <el-table-column
              prop="november"
              label="十一月"
              width="70px"
            />
            <el-table-column
              prop="december"
              label="十二月"
              width="70px"
            />
            <el-table-column
              prop="saveTime"
              label="保存时间"
              width="135px"
            />
            <el-table-column
              label="操作"
              width="120px"
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
          <el-dialog title="按年输入指标项" :visible.sync="newValueByYearVisible" style="text-align: center">
            <el-form :model="newValueByYearForm">
              <el-form-item>
                <span>选择指标项</span>
                <el-select v-model="newValueByYearForm.itemName" filterable clearable placeholder="请选择要输入的指标项" style="width: 30%; margin-left: 20px;">
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
                <el-select v-model="newValueByYearForm.year" filterable clearable placeholder="请选择年份" style="width: 30%; margin-left: 30px;">
                  <el-option
                    v-for="item in year"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <span>一月</span>
                <el-input
                  v-model="newValueByYearForm.january"
                  autocomplete="off"
                  style="width: 30%; margin-left: 20px;"
                />
              </el-form-item>
              <el-form-item>
                <span>二月</span>
                <el-input
                  v-model="newValueByYearForm.february"
                  autocomplete="off"
                  style="width: 30%; margin-left: 20px;"
                />
              </el-form-item>
              <el-form-item>
                <span>三月</span>
                <el-input
                  v-model="newValueByYearForm.march"
                  autocomplete="off"
                  style="width: 30%; margin-left: 20px;"
                />
              </el-form-item>
              <el-form-item>
                <span>四月</span>
                <el-input
                  v-model="newValueByYearForm.april"
                  autocomplete="off"
                  style="width: 30%; margin-left: 20px;"
                />
              </el-form-item>
              <el-form-item>
                <span>五月</span>
                <el-input
                  v-model="newValueByYearForm.may"
                  autocomplete="off"
                  style="width: 30%; margin-left: 20px;"
                />
              </el-form-item>
              <el-form-item>
                <span>六月</span>
                <el-input
                  v-model="newValueByYearForm.june"
                  autocomplete="off"
                  style="width: 30%; margin-left: 20px;"
                />
              </el-form-item>
              <el-form-item>
                <span>七月</span>
                <el-input
                  v-model="newValueByYearForm.july"
                  autocomplete="off"
                  style="width: 30%; margin-left: 20px;"
                />
              </el-form-item>
              <el-form-item>
                <span>八月</span>
                <el-input
                  v-model="newValueByYearForm.august"
                  autocomplete="off"
                  style="width: 30%; margin-left: 20px;"
                />
              </el-form-item>
              <el-form-item>
                <span>九月</span>
                <el-input
                  v-model="newValueByYearForm.september"
                  autocomplete="off"
                  style="width: 30%; margin-left: 20px;"
                />
              </el-form-item>
              <el-form-item>
                <span>十月</span>
                <el-input
                  v-model="newValueByYearForm.october"
                  autocomplete="off"
                  style="width: 30%; margin-left: 20px;"
                />
              </el-form-item>
              <el-form-item>
                <span>十一月</span>
                <el-input
                  v-model="newValueByYearForm.november"
                  autocomplete="off"
                  style="width: 30%; margin-left: 20px;"
                />
              </el-form-item>
              <el-form-item>
                <span>十二月</span>
                <el-input
                  v-model="newValueByYearForm.december"
                  autocomplete="off"
                  style="width: 30%; margin-left: 20px;"
                />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="newValueByYearVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveValueByYear()">保 存</el-button>
            </div>
          </el-dialog>
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
import { getValueTableData, updateValueByYear, deleteValue } from '@/api/bio_feature'
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
      combinedBioFeatureNameList: [],
      shape: 'bar',
      shapeList: [
        {
          value: 'bar',
          label: '柱状图'
        }, {
          value: 'line',
          label: '折线图'
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
      newValueByYearVisible: false
    }
  },
  mounted() {
    this.generateOtherHospitalData()
    this.generateCombinedBioFeatureItemNameList()
  },
  methods: {
    updateValueByYear(value) {
      this.newValueByYearVisible = true
      this.newValueByYearForm = value
    },
    saveValueByYear() {
      updateValueByYear(this.newValueByYearForm).then((res) => {
        Message({
          message: res.msg,
          type: 'success'
        })
        this.generateValueTableData()
        this.newValueByYearVisible = false
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
      if (this.$store.getters.centerType == 2 || this.$store.getters.centerType == 1) {
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
    getEchartsValueList(numerator, denominator) {
      var valueList = []
      var keys = Object.keys(numerator)

      for (var i = 0; i < 12; i++) {
        var key = keys[i]
        var nValue = numerator[key]
        var dValue = denominator[key]
        if (nValue == null || dValue == null) {
          continue
        }
        valueList.push((nValue / dValue) * 100)
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
        var valueList = that.getEchartsValueList(data.numerator, data.denominator)
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
            type: that.shape,
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
