<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" type="border-card" style="margin-left: 40px; margin-top: 30px; width: 1250px;" @tab-click="handleClick">
          <el-tab-pane label="查看指标信息（图表）" name="first">
            <div style="margin-top: 10px;">
              <el-select v-model="searchCombinedBioFeatureForm.combinedBioFeatureName" filterable clearable placeholder="请选择指标" style="width: 15%;">
                <el-option
                  v-for="item in combinedBioFeatureNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="searchCombinedBioFeatureForm.year" filterable clearable placeholder="请选择年份" style="width: 15%; margin-left: 30px;">
                <el-option
                  v-for="item in year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="shape" filterable clearable placeholder="请选择图表类型" style="width: 15%; margin-left: 30px;">
                <el-option
                  v-for="item in shapeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="combinedItemColor" filterable clearable placeholder="请选择图表颜色" style="width: 15%; margin-left: 30px;">
                <el-option
                  v-for="item in colorList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button type="primary" style="margin-left: 20px;" @click="searchCombinedBioFeature()">搜索</el-button>
            </div>
            <div ref="bio_feature_item_chart" style="width: 1000px; height: 500px; margin-top: 20px;" />
          </el-tab-pane>
          <el-tab-pane label="查看单个指标信息(图表)" name="third">
            <div style="margin-top: 10px;">
              <el-select v-model="singleItemForm.itemName" filterable clearable placeholder="请选择指标" style="width: 15%;" @focus="generateBioFeatureItemName()">
                <el-option
                  v-for="item in bioFeatureItemNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="singleItemForm.year" filterable clearable placeholder="请选择年份" style="width: 15%; margin-left: 30px;">
                <el-option
                  v-for="item in year"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="singleItemEchartShape" filterable clearable placeholder="请选择图表类型" style="width: 15%; margin-left: 30px;">
                <el-option
                  v-for="item in shapeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="singleItemColor" filterable clearable placeholder="请选择图表类型" style="width: 15%; margin-left: 30px;">
                <el-option
                  v-for="item in colorList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button type="primary" style="margin-left: 20px;" @click="searchSingleItemInfo()">搜索</el-button>
            </div>
            <div ref="single_item_chart" style="width: 1000px; height: 500px; margin-top: 20px;" />
          </el-tab-pane>
          <el-tab-pane label="查看指标信息（表格）" name="second">
            <el-select v-model="SItemName" filterable clearable placeholder="请选择指标" style="width: 20%;" @focus="generateBioFeatureItemName()">
              <el-option
                v-for="item in bioFeatureItemNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="SYear" filterable clearable placeholder="请选择年份" style="width: 20%; margin-left: 30px;" @focus="generateValueTableData()">
              <el-option
                v-for="item in year"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button type="primary" style="margin-left: 20px;" @click="searchValueTableObj()">搜索</el-button>
            <el-button type="primary" style="margin-left: 20px;" @click="newValueByMonthVisible = true; generateBioFeatureItemName()">按月输入指标项</el-button>
            <el-button type="primary" style="margin-left: 20px;" @click="newValueByYearVisible = true; generateBioFeatureItemName()">按年输入指标项</el-button>
            <el-button type="primary" style="margin-left: 20px;" @click="valueCacheTableVisible = true; generateValueCacheTableData()">查看输入缓存</el-button>
            <!-- slice(start, end) 方法以新的数组对象，返回数组中被选中的元素。 -->
            <el-table
              :data="valueTableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
              border
              style="margin-top: 20px;"
              size="mini"
            >
              <el-table-column
                prop="year"
                label="年份"
                width="55px"
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
                width="160px"
              />
              <!-- <el-table-column
                label="操作"
                width="150px"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="updateValueByYear(scope.row)">更改</el-button>
                  <el-button type="text" size="small" @click="deleteValue(scope.row)">删除</el-button>
                </template>
              </el-table-column> -->
            </el-table>
            <el-pagination
              :page-sizes="[5, 10, 15]"
              :current-page="currentPage"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="valueTableData.length"
              style="text-align:center; margin-top: 50px;"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
            <el-dialog title="按月输入指标项" :visible.sync="newValueByMonthVisible" style="text-align: center">
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
                <el-button @click="newValueByMonthVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveBioFeatureInfo()">保 存</el-button>
              </div>
            </el-dialog>
            <el-dialog title="按年输入指标项" :visible.sync="newValueByYearVisible" style="text-align: center">
              <el-form :model="newBioFeatureItemForm">
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
                <el-button type="primary" @click="saveValueCacheByYear()">保 存</el-button>
              </div>
            </el-dialog>
            <el-dialog title="查看输入缓存" :visible.sync="valueCacheTableVisible" width="1300px">
              <el-table
                :data="valueCacheTableData.slice((currentPage2 - 1) * pagesize2, currentPage2 * pagesize2)"
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
                  width="150px"
                >
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="updateValueCacheByYear(scope.row)">更改</el-button>
                    <el-button type="text" size="small" @click="deleteValueCache(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="commitValueCache(scope.row)">提交</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                :page-sizes="[5, 10, 15]"
                :current-page="currentPage2"
                :page-size="pagesize2"
                layout="total, sizes, prev, pager, next, jumper"
                :total="valueCacheTableData.length"
                style="text-align:center; margin-top: 50px;"
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
              />
              <div slot="footer" class="dialog-footer">
                <el-button @click="valueCacheTableVisible = false">关 闭</el-button>
              </div>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import echarts from 'echarts'
import { getItemNameList, getCombinedBioFeatureItemNameList, saveBioFeatureInfo, getCombinedBioFeatureData } from '@/api/bio_feature'
import { saveValueCacheByYear, getValueTableData, deleteValueCache, getValueCacheTableData, commitValueCache } from '@/api/bio_feature'
import { getSingleItemData } from '@/api/bio_feature'
import { Message, MessageBox } from 'element-ui'

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
      singleItemForm: {
        itemName: '',
        hospitalName: '',
        year: ''
      },
      // 生命特征类指标列表
      combinedBioFeatureNameList: [],
      newValueByMonthVisible: false,
      newValueByYearVisible: false,
      valueCacheTableVisible: false,
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
      valueTableData: [],
      valueCacheTableData: [],
      SItemName: '',
      SYear: '',
      currentPage: 1,
      pagesize: 5,
      currentPage2: 1,
      pagesize2: 5,
      shape: 'bar',
      singleItemEchartShape: 'bar',
      shapeList: [
        {
          value: 'bar',
          label: '柱状图'
        }, {
          value: 'line',
          label: '折线图'
        }, {
          value: 'pie',
          label: '饼图'
        }
      ],
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
  created() {
  },
  mounted() {
    this.generateCombinedBioFeatureItemNameList()
    this.generateValueTableData()
    // this.initBioFeatureItemChart()
  },
  methods: {
    commitValueCache(valueCache) {
      MessageBox.confirm('确定提交该条记录?提交后不可随意修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        commitValueCache(valueCache).then((res) => {
          Message.success({
            message: res.msg || '提交失败！'
          })
          setTimeout(() => {
            this.generateValueCacheTableData()
            this.generateValueTableData()
          }, 500)
        }).catch(() => {
          Message.warning({
            message: '提交失败'
          })
        })
      }).catch(() => {
        Message.info({
          message: '已取消提交'
        })
      })
    },
    generateValueCacheTableData() {
      this.valueCacheTableData = []
      var that = this
      getValueCacheTableData(this.$store.getters.hospitalName).then((res) => {
        that.valueCacheTableData = res.data
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
    // 保留方法，切换卡片时加载名称列表
    handleClick() {
      if (this.activeName === 'first') {
        console.log('1')
      }
      if (this.activeName === 'second') {
        console.log('2')
      }
    },
    // 生成组合指标名字列表
    generateCombinedBioFeatureItemNameList() {
      var that = this
      getCombinedBioFeatureItemNameList().then((res) => {
        const { data } = res
        this.generateItemNameList(that.combinedBioFeatureNameList, data)
      })
    },
    // 生成单个指标字段名字列表
    generateBioFeatureItemName() {
      var that = this
      this.bioFeatureItemNameList = []
      getItemNameList().then((res) => {
        const { data } = res
        this.generateItemNameList(that.bioFeatureItemNameList, data)
      })
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
    getEchartsValueList(numerator, denominator, ratio) {
      var valueList = []
      var keys = Object.keys(numerator)

      for (var i = 0; i < 12; i++) {
        var key = keys[i]
        var nValue = numerator[key]
        var dValue = denominator[key]

        if (nValue == null || dValue == null) {
          continue
        }
        var value = (nValue / dValue) * ratio
        valueList.push(value.toFixed(2))
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
    getSingleItemEchartsValueList(values) {
      var valueList = []
      // 获取图中所有键名，返回一个键名数组
      var keys = Object.keys(values)

      for (var i = 0; i < 12; i++) {
        var key = keys[i]
        var value = values[key]
        if (value == null) {
          continue
        }
        valueList.push(value)
      }
      return valueList
    },
    getSingleItemPieValueList(values) {
      var valueList = []
      // 获取图中所有键名，返回一个键名数组
      var keys = Object.keys(values)

      for (var i = 0; i < 12; i++) {
        var key = keys[i]
        var value = values[key]
        if (value == null) {
          continue
        }
        valueList.push(
          {
            'value': value + '%',
            'name': (i + 1) + '月'
          })
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
      this.newValueByMonthVisible = false
    },
    // 搜索指定生命特征类指标，并渲染echart
    searchCombinedBioFeature() {
      var BFIC = echarts.init(this.$refs.bio_feature_item_chart)
      BFIC.clear()
      var that = this
      this.searchCombinedBioFeatureForm.hospitalName = this.$store.getters.hospitalName
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
    searchSingleItemInfo() {
      var SIC = echarts.init(this.$refs.single_item_chart)
      SIC.clear()
      var that = this
      this.singleItemForm.hospitalName = this.$store.getters.hospitalName
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
      var SIC = echarts.init(this.$refs.single_item_chart)
      SIC.setOption({
        title: {
          text: item_name,
          x: 'left'
        },
        legend: {
          data: [item_name]
        },
        tooltip: {},
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
        series: [
          {
            name: item_name,
            type: that.singleItemEchartShape,
            data: valueList
          }
        ]
      })
    },
    // 按年保存信息
    saveValueCacheByYear() {
      this.newValueByYearForm.hospitalName = this.$store.getters.hospitalName
      saveValueCacheByYear(this.newValueByYearForm).then((res) => {
        Message({
          message: res.msg,
          type: 'success'
        })
      })
      this.newValueByYearVisible = false
      setTimeout(() => {
        this.generateValueCacheTableData()
      }, 500)
    },
    updateValueCacheByYear(value) {
      this.newValueByYearVisible = true
      this.newValueByYearForm = value
    },
    deleteValueCache(value) {
      MessageBox.confirm('确定删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteValueCache(value).then((res) => {
          Message.success({
            message: res.msg || '删除失败！'
          })
          setTimeout(() => {
            this.generateValueTableData()
            this.generateValueCacheTableData()
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
    // 获取表格信息
    generateValueTableData() {
      var that = this
      that.valueTableData = []
      getValueTableData(this.$store.getters.hospitalName).then((res) => {
        const { data } = res
        that.valueTableData = data
      })
    },
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
