<template>
  <div>
    <el-table
      :data="depData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="organization_id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="organization_name" label="部门名称" width="380"></el-table-column>
      <el-table-column prop="count_child" label="直属子部门数" width="280"></el-table-column>
      <el-table-column prop="count_user" label="直属成员数" width="280"></el-table-column>
      <el-table-column prop="all_count" label="成员总数" width="250"></el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope" width="80">
          <el-button type="text" @click="handleEdit(scope.row,scope.$index)" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      depData: []
    }
  },
  created() {
    this.fetchData()
  },
  computed: {

  },
  methods: {
    fetchData() {
      // 请求管理列表数据
      this.$store.dispatch('asm/Organizations').then(res => {
        this.depData = res.data
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style>
</style>
