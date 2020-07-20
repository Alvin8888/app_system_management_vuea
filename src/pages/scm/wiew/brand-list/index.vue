<template>
  <div class="brand">
    <el-button class="btn" type="primary" icon="el-icon-plus">添加</el-button>
    <el-table
      :data="brandData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="category_id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="category_name" label="品类名称" ></el-table-column>
      <el-table-column prop="category_description" label="分类描述" ></el-table-column>
      <el-table-column prop="create_user_email" label="创建人" ></el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="300"></el-table-column>
      <el-table-column prop="count_commodity" label="商品总数" ></el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope" width="80">
          <el-button @click="handleClick(scope.row)" type="text" size="medium">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->
    <!-- :before-close="handleClose" -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :modal-append-to-body="false"
      :wrapperClosable="true"
      title="编辑品类"
    >
      <div class="bradndWrap">
        <p>
          上级品类 :
          <span>{{form.attributes == null ? "没有品类":form.attributes }}</span>
        </p>
        <p>
          品类名称 :
          <span>{{form.category_name}}</span>
        </p>
        <div class="tag-group">
          <div>
            <span class="tag-group__title">属性 : </span>
            <el-tag
              v-for="item in items"
              :key="item.category_id"
              effect="plain"
            >{{ item.parent_category_id }}</el-tag>
          </div>

          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="品类描述 : ">
              <el-input type="textarea" disabled v-model="form.category_description"></el-input>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm" disabled>编辑</el-button>
            <el-button
              type="primary"
              @click="drawer=false"
              :loading="loading"
            >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getCategoryItem } from '@/api/supplier'
export default {
  data() {
    return {
      brandData: [],
      drawer: false,
      direction: 'rtl',
      loading: false,
      timer: null,
      items: [],
      form: {}
    }
  },
  created() {
    this.fetchData()
  },
  watch: {},
  methods: {
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.drawer = false
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
              this.drawer = false
            }, 400)
          }, 1000)
        })

        .catch(_ => {
          this.drawer = false
        })
    },

    cancelForm() {
      this.loading = false
      this.drawer = false
      clearTimeout(this.timer)
    },

    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },

    // 查看品类详情
    handleClick(row) {
      this.form = row
      getCategoryItem(row.category_id).then(res => {
        const data = res.data.data
        if (res.data.code === 200) {
          this.items = data
        }
      })
      this.drawer = true
    },

    // 品类列表数据
    fetchData() {
      this.$store.dispatch('scm/CategoryList').then(res => {
        if (res.code === 200) {
          this.brandData = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
.brand >>> .el-drawer__header{
  margin: 0;
}
.brand >>> .el-drawer__header > :first-child {
  font-size: 20px;
  color: black;
  font-weight: bold;
  outline: none;
}
.brand >>> .el-form-item__label{
  text-align:left;
  font-size: 13px;
  padding: 0;
}
.brand p:nth-child(1),.brand p:nth-child(2){
  padding: 5px 0 5px 0;
}

.bradndWrap {
  margin-left: 20px;
  padding: 10px 0 0 0;
}
.tag-group{
  padding: 0 0 5px 0;
}
.brand>>> .el-textarea{
  width: 85%;
}
.brand >>> .el-form-item__content{
  left: -18px;
}
.tag-group div:nth-child(1){
  padding: 5px 0 5px 0;
}
.tag-group div:nth-child(1) span:nth-child(1){
  margin: 0 0 0 25px;
}

.brand {
  margin-top: 10px;
  position: relative;
  z-index: 10;
  font-size: 13px;
}
.btn {
  margin-left: 5px;
  padding: 8px 8px;
}
</style>
