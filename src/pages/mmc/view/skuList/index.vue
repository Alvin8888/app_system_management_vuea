<template>
  <div id="unDistribution">
    <div v-if="$route.path === '/mmc/skuList'">
      <div class="search-bar">
        <el-form :model="search" ref="search" class="search-bar" inline>
          <el-form-item prop="keyWords">
            <el-input
                class="key-words"
                placeholder="可按SKU、名称、销售人员查询"
                v-model="search.keyWords"
                clearable>
            </el-input>
          </el-form-item>
          <el-button type="primary" class="btn" @click="searchKey('search')">搜索</el-button>
          <el-button type="primary" plain class="btn" @click="cancelSunmit('search')">重置</el-button>
          <div class="sala">
            部门：
            <el-form-item prop="fatherDepartment">
              <el-select
                  v-model="search.fatherDepartment"
                  @change="selectDepartment"
                  clearable
                  placeholder="请选择"
                  class="select">
                <el-option
                    v-for="item in organizationList"
                    :key="item.organization_id"
                    :label="item.organization_name"
                    :value="item.organization_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="childDepartment">
              <el-select
                  v-model="search.childDepartment"
                  @change="searchKey"
                  v-if="showchildDepartment"
                  clearable
                  placeholder="请选择"
                  class="select">
                <el-option
                    v-for="item in childDepartmentList"
                    :key="item.organization_id"
                    :label="item.organization_name"
                    :value="item.organization_id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="sala">
            品类筛选：
            <el-form-item prop="fatherCategory_id">
              <el-select
                v-model="search.fatherCategory_id"
                @change="selectCategory"
                clearable
                placeholder="请选择"
                class="select">
                <el-option
                    v-for="item in typeList"
                    :key="item.category_id"
                    :label="item.category_name"
                    :value="item.category_id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="childCategory_id">
              <el-select
                v-model="search.childCategory_id"
                v-if="showChildOrganizationList"
                @change="searchKey"
                clearable
                placeholder="请选择"
                class="select">
                <el-option
                    v-for="item in childOrganizationList"
                    :key="item.category_id"
                    :label="item.category_name"
                    :value="item.category_id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="status">
            是否预售：
            <el-form-item prop="preSale">
              <el-select @change="searchKey" v-model="search.preSale" placeholder="请选择" class="select">
                <el-option
                    v-for="item in preSaleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="dataTabel">
        <template>
          <el-table
              ref="multipleTable"
              :data="tableData"
              border
              stripe
              style="width: 100%">
            <el-table-column
                align="center"
                prop="platform_sku"
                label="平台SKU">
            </el-table-column>
            <el-table-column
                align="center"
                prop="platform_display_name"
                label="名称display name">
            </el-table-column>
            <el-table-column
                align="center"
                prop="is_pre_sale"
                label="是否预售">
            </el-table-column>
            <el-table-column
                align="center"
                prop="organization_name"
                label="部门">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="销售人员">
            </el-table-column>
            <el-table-column
                width="100px"
                label="操作">
              <template slot-scope="scope">
                <el-button @click="goDateil(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <!-- 分页组件 -->
        <div style="text-align: center;margin: 20px 0;">
          <el-pagination
              @current-change="newGetPlatformList"
              :current-page="pageConfig.page"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="pageConfig.total"
              background
          ></el-pagination>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
import {
  getPlatformList,
  getOrganizations,
  getCategoryList
} from '@/api/mmc'

export default {
  name: 'Index',
  components: {},
  data() {
    return {
      search: {
        keyWords: null,
        fatherDepartment: null,
        childDepartment: null,
        category_id: null,
        department: null,
        preSale: null,
        fatherCategory_id: null,
        childCategory_id: null
      },
      showChildOrganizationList: false,
      showchildDepartment: false,
      childOrganizationList: [],
      childDepartmentList: [],
      organizationList: [],
      typeList: [],
      preSaleList: [
        {
          label: '全部',
          value: null
        },
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 2
        }
      ],
      tableData: [{
        platform_sku: '',
        platform_display_name: '',
        is_pre_sale: '',
        organization_name: '',
        sale_user_name: ''
      }],
      pageConfig: {
        page: 1,
        limit: 10,
        total: null
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === '/mmc/skuList') {
      this.dataInit()
      next()
    } else {
      next()
    }
  },
  watch: {

  },
  created() {
    if (this.$route.path === '/mmc/skuList') this.dataInit()
  },
  activated() {

  },
  methods: {
    dataInit() {
      Promise.all([this.newGetPlatformList(), this.newGetOrganizations(), this.newGetCategoryList()]).then((res) => {
        this.tableData = res[0]
        this.organizationList = res[1]
        this.typeList = res[2]
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    newGetPlatformList(page) {
      const data = {
        keywords: this.search.keyWords,
        department: this.search.department,
        category_id: this.search.category_id,
        pre_sale: this.search.preSale,
        page: this.pageConfig.page,
        limit: this.pageConfig.limit
      }
      if (this.search.childCategory_id) {
        data.category_id = this.search.childCategory_id
      }
      if (this.search.fatherCategory_id && !this.search.childCategory_id) {
        data.category_id = this.search.fatherCategory_id
      }
      if (!this.search.fatherCategory_id && !this.search.childCategory_id) {
        data.category_id = null
      }
      if (this.search.childDepartment) {
        data.department = this.search.childDepartment
      }
      if (this.search.fatherDepartment && !this.search.childDepartment) {
        data.department = this.search.fatherDepartment
      }
      if (!this.search.fatherDepartment && !this.search.childDepartment) {
        data.department = null
      }

      if (page) {
        this.pageConfig.page = page
        data.page = page
        getPlatformList(data).then(res => {
          const data = res.data.data
          this.tableData = data
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
        return false
      }
      return new Promise((resolve, reject) => {
        getPlatformList(data).then(res => {
          const data = res.data.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    newGetOrganizations() {
      return new Promise((resolve, reject) => {
        getOrganizations().then(res => {
          const data = res.data.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    newGetCategoryList() {
      return new Promise((resolve, reject) => {
        getCategoryList().then(res => {
          const data = res.data.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    selectCategory(val) {
      this.search.category_id = val
      for (let i = 0; i < this.typeList.length; i++) {
        if (this.typeList[i].category_id == val) {
          if (this.typeList[i].children) {
            this.childOrganizationList = this.typeList[i].children
            this.showChildOrganizationList = true
          } else {
            this.showChildOrganizationList = false
            this.searchKey()
          }
          break
        }
      }
      if (this.search.category_id == null || this.search.category_id == '') {
        this.showChildOrganizationList = false
        this.searchKey()
      }
    },
    selectDepartment(val) {
      this.search.department = val
      for (let i = 0; i < this.organizationList.length; i++) {
        if (this.organizationList[i].organization_id == val) {
          if (this.organizationList[i].children) {
            this.childDepartmentList = this.organizationList[i].children
            this.showchildDepartment = true
          } else {
            this.showchildDepartment = false
            this.searchKey()
          }
          break
        }
      }
      if (this.search.department == null || this.search.department == '') {
        this.showchildDepartment = false
        this.searchKey()
      }
    },
    searchKey() {
      this.newGetPlatformList(1)
    },
    cancelSunmit(formName) {
      this.$refs[formName].resetFields()
      this.dataInit()
    },
    goDateil(rowData) {
      console.log(rowData)
      this.$router.push({
        path: '/mmc/skuDetails',
        query: {
          id: rowData.id
        }
      })
    },
    getDataInfo() {

    }
  }
}
</script>

<style scoped lang="less">
  #unDistribution {
    padding: 0 20px;
    padding-right: 0;
    color: #666;

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;

      p {
        font-weight: bold;
        font-size: 20px;
        margin-right: 50px;
      }
    }

    .search-bar {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .key-words {
        min-width: 260px;
      }
      .sala {

      }
      .sala, .status {
        margin-left: 15px;

        .select {
          min-width: 120px;
          margin-left: 10px;
        }
        /deep/ .el-form-item {
          max-width: 140px;
        }
      }

      /deep/ .key-words > .el-input__inner {
        border-radius: 4px 0 0 4px;
      }

      /deep/ .el-button--primary {
        border-radius: 0;
      }

      /deep/ .el-button--primary.is-plain {
        border-radius: 0 4px 4px 0;
        margin-left: 0;
      }

      /deep/ .el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover {
        background-color: #b3d8ff;
      }

      /deep/ .el-form-item {
        margin: 0;
        vertical-align: middle;
      }
    }

    .dataTabel {
      margin-top: 20px;

      .el-table /deep/ .checkAll .cell:before {
        content: "全选";
        position: absolute;
        right: 11px;
      }

      .fail {
        color: red;
      }

      .btnText {
        font-size: 12px;
      }
    }
  }

  /deep/ .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /deep/ .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
</style>
