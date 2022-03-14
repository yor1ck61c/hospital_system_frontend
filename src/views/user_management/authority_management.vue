<template>
  <el-container>
    <el-header>
      <div>
        <el-select v-model="hospitalName" filterable clearable placeholder="请选择医院" style="width: 20%; margin-left: 50px; margin-top: 30px;">
          <el-option
            v-for="item in hospitalNameList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" style="margin-left: 20px;" @click="searchCombinedBioFeature()">搜索</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="hospitalTableData"
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
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

  </el-container>
</template>

<script>
export default {
  name: 'OtherHospitalInfo',
  data() {
    return {
      hospitalName: '',
      hospitalNameList: [],
      hospitalTableData: []
    }
  }
}
</script>
