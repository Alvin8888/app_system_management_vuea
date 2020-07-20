/* eslint-disable no-unused-vars */
<template>
  <div class="attributeList">
    <!-- 新增 -->
    <!-- 菜单 f82e8233-ced9-4a30-ac1c-6f638a359486-->

    <!-- 条件搜索 -->
    <el-form :inline="true" ref="form" :model="searchMap" style="margin-top:20px;margin-left:10px">
      <el-form-item prop="keywords">
        <el-input v-model.trim="searchMap.keywords" placeholder="请输入搜索内容"></el-input>
        <el-button type="primary" @click="onFetchData">查询</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
      <el-form-item label="状态:" prop="status_bar">
        <el-select v-model="searchMap.status_bar" placeholder="全部" style="width:100px">
          <el-option key="1" label="启用" value="1"></el-option>
          <el-option key="2" label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="属性类型:" prop="region">
        <el-select v-model="searchMap.region" placeholder="全部" style="width:100px">
          <el-option key="1" label="单选" value="1"></el-option>
          <el-option key="2" label="多选" value="2"></el-option>
          <el-option key="3" label="数字" value="3"></el-option>
          <el-option key="4" label="文字" value="5"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 列表  -->
    <el-table :data="attrData" style="width: 100%" border>
      <el-table-column label="属性" width="180">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.attribute_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="绑定品类" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.count_category }}</div>
        </template>
      </el-table-column>
      <el-table-column label="属性类型" width="680">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper" v-if="scope.row.attribute_type === '1'">单选</div>
          <div slot="reference" class="name-wrapper" v-else-if="scope.row.attribute_type === '2'">多选</div>
          <div slot="reference" class="name-wrapper" v-else-if="scope.row.attribute_type === '3'">数字</div>
          <div slot="reference" class="name-wrapper" v-else-if="scope.row.attribute_type === '5'">文字</div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            :disabled="scope.row.attribute_status === '0'"
          >{{scope.row.attribute_status === "0" ?'禁用':'启用'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row,scope.$index,scope.row.attribute_id,scope.row.attribute_status)"
            type="text"
            size="small"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <h3>编辑属性</h3>
      <el-form :inline="true" ref="form" class="formDrawer" :model="editData" style="margin-top:20px;margin-left:10px">
        <el-form-item prop="name" label="属性名称:">
          <el-input v-model="editData.attribute_name" placeholder="请输入搜索内容"></el-input>
        </el-form-item>
        <el-form-item label="属性类型:">
          <el-select v-model="editData.attribute_status" placeholder="全部" style="width:100px">
            <el-option key="1" label="单选" value="1"></el-option>
            <el-option key="2" label="多选" value="2"></el-option>
            <el-option key="3" label="数字" value="3"></el-option>
            <el-option key="4" label="文字" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="属性值:">
          <el-tag
            v-for="tag in editData.attribute_values"
            :key="tag.value_id"
            closable
            @close="handCloseOnes(tag)"
          >{{tag.attribute_value}}</el-tag>
        </el-form-item>
        <div>
          <el-button @click="dialogVisible = true">添加值</el-button>
        </div>
        <el-form-item label="绑定品类:">
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            closable
            :type="tag.type"
            @close="handClose(tag)"
          >{{tag.category_name}}</el-tag>
        </el-form-item>

        <!-- 添加绑定属性值 -->

        <div>
          <select-tree
            :options="options"
            :props="props"
            :value="+valueId"
            :clearable="isClearable"
            :accordion="isAccordion"
            @getValue="getValue($event)"
          />
          <el-button type="primary" icon="el-icon-plus" @click="handleCategory">绑定品类</el-button>
        </div>

        <el-form-item label="属性状态:">
          <el-switch v-model="editData.attribute_type" active-text="禁用" inactive-text="启用"></el-switch>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSubmit()"
          :loading="loading"
        >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </el-drawer>

    <!-- 添加属性值弹窗 -->
    <el-dialog
      title="添加值"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleCloseKs"
    >
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddEditForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1,6,10, 20, 50, 100, 200]"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      background
    ></el-pagination>
  </div>
</template>

<script>
import {
  getAttributeList,
  getCategoryByAttribute,
  editAttribute,
  addAttributeValue,
  addCategoryAttribute,
  delAttributeCategory,
  delAttributeValue
} from '@/api/supplier'

import SelectTree from '@/components/treeSelect'
import { getCategoryList } from '@/api/supplier'

export default {
  data() {
    return {
      total: null, // 总记录数
      currentPage: 1, // 当前第一页, 默认第一页
      pageSize: 6, // 每页显示条数 10条'
      limt: 20,
      searchMap: {
        keywords: '',
        region: '',
        status_bar: ''
      }, // 条件查询绑定条件值
      saopMap: {
        value1: ''
      },

      attrData: [],
      tags: [],
      editData: {},
      drawer: false,
      innerDrawer: false,
      timer: null,
      loading: false,
      direction: 'rtl',
      valueType: '',
      input: '',
      dialogVisible: false,
      dialogFormVisible: false,
      value: '',
      options: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      valueId: 1, // 初始ID（可选）
      props: {
        // 配置项（必选）
        value: 'category_id',
        label: 'category_name',
        children: 'children'
        // disabled:true
      },
      bindingData: {},
      oldValue: '' // 判断的值
    }
  },
  components: {
    SelectTree
  },
  created() {
    this.fetchData()
  },
  updated() {},
  computed: {
    /* 转树形数据 */
    optionsData() {
      const cloneData = JSON.parse(JSON.stringify(this.options)) // 对源数据深度克隆
      return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        const branchArr = cloneData.filter(
          child => father.id == child.parentId
        ) // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : '' // 给父级添加一个children属性，并赋值
        return father.parentId == 0 // 返回第一层
      })
    }
  },
  watch: {
    'editData.attribute_name': {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
        this.oldValue = oldValue
      },
      deep: true
    }
  },
  methods: {
    // 取值
    getValue(value) {
      this.valueId = value
    },

    // 添加属性值
    handleAddEditForm() {
      const that = this
      const params = {
        attribute_id: this.editData.attribute_id,
        attribute_value: this.input
      }
      addAttributeValue(params).then(res => {
        if (res.status === 200) {
          // 获取值 添加属性值
          const id = res.data.data
          const data = {
            attribute_value: this.input,
            value_id: id.value_id
          }
          that.editData.attribute_values.push(data)

          this.$notify({
            title: '添加属性值成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '添加属性值失败',
            message: '这是一条警告的提示消息',
            type: 'warning'
          })
        }

        this.input = ''
        this.dialogVisible = false
      })
    },

    // 删除属性值
    handCloseOnes(tag) {
      const that = this
      delAttributeValue(tag.value_id).then(res => {
        if (res.status === 200) {
          // 便利数组中所有的item 拿到id 进行对比
          const index = that.editData.attribute_values.findIndex(item => {
            if (item.value_id == tag.value_id) {
              return true
            }
          })
          // 删除数组中的值,原数组改变
          that.editData.attribute_values.splice(index, 1)

          this.$notify({
            title: '成功',
            message: '删除属性值成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '失败',
            message: '删除属性值失败',
            type: 'warning'
          })
        }
      })
    },

    // 删除绑定属性值
    handClose(tag) {
      const that = this
      delAttributeCategory(this.editData.attribute_id, this.valueId).then(
        res => {
          if (res.status === 200) {
            // 便利数组中所有的item 拿到id 进行对比
            const index = that.tags.findIndex(item => {
              if (item.id == tag.id) {
                return true
              }
            })
            // 删除数组中的值,原数组改变
            console.log('index', index)
            that.tags.splice(index, 1)

            this.$notify({
              title: '成功',
              message: '删除绑定品类成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '失败',
              message: '删除绑定品类失败',
              type: 'warning'
            })
          }
        }
      )
      console.log('tag', tag)
    },

    // 添加绑定品类
    handleCategory() {
      const params = {
        attribute_id: this.editData.attribute_id,
        category_id: this.valueId
      }
      addCategoryAttribute(params).then(res => {
        if (res.status === 200) {
          // 添加属性绑定
          const fetch = res.data.data
          console.log('fetch', fetch)
          fetch.map(item => {
            this.bindingData = item
          })

          this.tags.push(this.bindingData)

          this.$notify({
            title: '成功',
            message: '绑定品类成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '失败',
            message: '绑定品类失败',
            type: 'warning'
          })
        }
      })
    },

    handleSubmit() {
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.reqSbumit() // 提交表单
          this.loading = true
          this.timer = setTimeout(() => {
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

    handleClose(done) {
      if (this.oldValue == undefined) {
        this.drawer = false
        return
      }

      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.reqSbumit() // 提交表单
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
        })
        .catch(_ => {
          this.drawer = false
        })
    },

    handleCloseKs(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },

    // 提交表单
    reqSbumit(page) {
      const params = {
        attribute_id: this.editData.attribute_id, // 属性Id
        attribute_name: this.editData.attribute_name, // 属性名
        attribute_status: this.editData.attribute_status, // 属性值类型(1：单选 2：多选 3：数字 5：文字)
        attribute_type: this.valueType // 属性状态(0：禁用 1：启用;默认为1)
      }

      // 提交修改表单
      editAttribute(params).then(res => {
        if (res.status === 200) {
          this.$notify({
            title: '成功',
            message: '修改属性成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '修改属性失败',
            message: '这是一条警告的提示消息',
            type: 'warning'
          })
        }
      })
    },

    cancelForm() {
      this.loading = false
      this.drawer = false
      clearTimeout(this.timer)
    },

    // 编辑用户
    handleEdit(data, index, id, status) {
      // console.log(data,index, id,status);

      // 获取品类属性接口
      getCategoryByAttribute(id).then(res => {
        const fetch = res.data
        if (fetch.code === 200) {
          fetch.data.map(item => {
            // this.userId = item.attribute_id
            const data = item.categorys
            this.tags = data
          })
        }
        // this.status = status;
        this.valueType = status
        this.editData = data
        this.drawer = true
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    // 时时更新显示的页码条数
    handleSizeChange(val) {
      // console.log(val);
      this.pageSize = val
    },
    // 时时更新当前的页的数据
    handleCurrentChange(val) {
      // console.log(val);
      this.currentPage = val
      this.onFetchData()
    },

    // 获取数据列表接口
    fetchData() {
      // 属性列表
      this.onFetchData()

      // 获取品类数据
      getCategoryList().then(res => {
        if (res.status === 200) {
          this.options = res.data.data
        }
      })
    },

    // 点击查询接口
    onFetchData(page) {
      // 属性列表接口
      getAttributeList(
        this.searchMap.keywords,
        this.searchMap.status_bar,
        this.searchMap.region,
        this.currentPage,
        this.limt
      ).then(res => {
        const fetch = res.data

        if (fetch.code === 200) {
          this.attrData = fetch.data
        } else {
          this.attrData = fetch.data == null ? [] : fetch.data
        }
      })
    },
    // 重置按钮
    resetForm(fromName) {
      this.$refs[fromName].resetFields()
      // 属性列表
      this.onFetchData()
    }
  },
  filters: {}
}
</script>

<style  scoped>
.attributeList >>> .el-form > div:nth-child(1) .el-input {
  width: 250px;
}
.attributeList >>> .el-form > div:nth-child(1) .el-input__inner {
  border-radius: 6px 0 0 6px;
}
.attributeList >>> .el-form > div:nth-child(1) .el-button + .el-button {
  margin: 0;
  border-radius: 0 6px 6px 0;
}
.attributeList >>> .el-form > div:nth-child(1) .el-button {
  margin: 0;
  border-radius: 0;
}

/* 编辑弹窗 */
.formDrawer  >>> .el-drawer__header {
  display: block;
  margin: 0

}
.formDrawer  >>> .el-form-item {
  display: block;
  margin: 10px 0 10px 0;

}
.formDrawer  >>> div:nth-child(3) > .el-form-item__content > span{
   margin-right: 5px;
}
.formDrawer  >>> div:nth-child(3) > label{
  padding: 0 12px 0 14px;
}
/* .formDrawer  >>> div:nth-child(4){
  margin-right: 5px;
} */

.formDrawer  >>> div:nth-child(4) > .el-button{
  margin-left: 70px;
}

.formDrawer  >>> div:nth-child(6) > .el-button{
  margin-left: 5px;
}
</style>
