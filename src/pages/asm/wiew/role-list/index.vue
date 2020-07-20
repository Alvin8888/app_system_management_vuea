/* eslint-disable vue/return-in-computed-property */ /* eslint-disable
no-unused-vars */
<template>
  <div class="pagination">
    <div class="role-list">
      <el-form
        :inline="true"
        ref="form"
        :model="searchMap"
        style="margin-top:20px;margin-left:10px"
      >
        <el-form-item label="状态:">
          <el-select
            class="textarea"
            v-model="value"
            placeholder="全部"
            style="width:100px"
            @change="handleChange(value)"
          >
            <!-- <el-option key="1" label="全部" value="2"></el-option> -->
            <el-option key="1" label="禁用" :value="valueJ"></el-option>
            <el-option key="2" label="启用" :value="valueQ"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          @click="dialogFormVisible = true"
        >增加角色</el-button>
      </el-row>
    </div>
    <el-table
      :data="data"
      style="width: 100%"
      border
      :max-height="tableHeight"
      ref="table"
      class="tables"
    >
      <el-table-column prop="permission_group_name" label="名称"></el-table-column>
      <el-table-column prop="create_user_email" label="创建者"></el-table-column>
      <el-table-column prop="permission_group_description" label="说明备注"></el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
            :disabled="scope.row.disabled!=='0'"
          >{{ scope.row.disabled === '0' ? '启用' : '禁用' }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEditUserRolt(scope.row)">编辑</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleOnClickPermissions(scope.$index, scope.row)"
          >配置权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total,  prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 新增新用户弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible" class="forms" :modal-append-to-body="false">
      <h2>新增角色</h2>
      <el-form :model="form" :rules="rulesOne" ref="ruleForm">
        <el-form-item label="角色名称: " prop="name">
          <el-input
            v-model.trim="form.name"
            @blur="handleUserOnly"
            placeholder="请输入新增角色"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item label="说明备注: " prop="textarea">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model.trim="form.textarea"></el-input>
        </el-form-item>
        <el-form-item label="角色状态: ">
          <el-switch
            v-model="form.note"
            active-value="0"
            inactive-value="1"
            active-text="启用"
            inactive-text="禁用"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户弹窗 -->
    <el-dialog
      :visible.sync="dialogFormVisiblEdit"
      class="forms"
      :modal-append-to-body="false"
      @close="handleEditClose"
    >
      <h2>编辑角色</h2>
      <el-form :model="rows" :rules="rules" ref="editForm">
        <el-form-item label="角色名称: " prop="permission_group_name">
          <el-input v-model.trim="rows.permission_group_name" placeholder="请输入编辑角色"></el-input>
        </el-form-item>
        <el-form-item label="说明备注: " prop="permission_group_description">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model.trim="rows.permission_group_description"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色状态: ">
          <el-switch
            v-model="rows.disabled"
            active-value="0"
            inactive-value="1"
            active-text="启用"
            inactive-text="禁用"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleOut">取 消</el-button>
        <el-button type="primary" @click="handleEditUser('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 配置权限弹窗 -->
    <el-dialog
      @close="closeEvent"
      :visible.sync="dialogFormVisiblPermissions"
      class="permissions"
      :modal-append-to-body="false"
    >
      <h2>
        角色:
        <span>{{ rows.permission_group_name }}</span>
      </h2>
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline"
        :rules="rules"
      >
        <el-form-item prop="user">
          <el-input v-model.trim="formInline.user" placeholder="请输入搜索内容"></el-input>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button  @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 应用 -->
      <div class="roleWrapAll" v-if="showCheckd">
        <div v-for="(appItem, i) in apps" class="info-content" :key="i">
          <div class="detail-left">
            <el-checkbox-group v-model="checkedO">
              <el-checkbox
                :indeterminate="!!appItem.isIndeterminate"
                :label="appItem"
                @change="
                  appCheck({
                    app: appItem,
                    check: 'app'
                  })
                "
              >{{ appItem.app_name }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- 菜单 -->
          <div class="detail-right">
            <div
              class="detail-content-box"
              v-for="(item, ind) in menus[appItem.app_guid]"
              :key="ind"
            >
              <div class="detail-content">
                <el-checkbox-group v-model="checkAll">
                  <el-checkbox
                    class="line-box"
                    :indeterminate="item.isIndeterminate"
                    :label="item.menu_guid"
                    @change="
                      menuCheck({
                        menu_guid: item.menu_guid,
                        app: appItem,
                        check: 'menu'
                      })
                    "
                  >{{ item.menu_name }}</el-checkbox>
                </el-checkbox-group>
              </div>
              <!-- api接口 -->
              <div class="detail-content-item">
                <div v-for="(itemApi, im) in apis[item.menu_guid]" :key="im" class="item-text">
                  <el-checkbox-group v-model="checkedT">
                    <el-checkbox
                      @change="
                        apiCheck({
                          api_guid: itemApi.api_guid,
                          menu_guid: item.menu_guid,
                          app: appItem,
                          check: 'api'
                        })
                      "
                      :label="itemApi.api_guid"
                    >{{ itemApi.api_description }}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEvent">取 消</el-button>
        <el-button type="primary" @click="handlePermissions('formInline')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars

import { mapMutations, mapState } from 'vuex'
import {
  getPermissionRe,
  permissionGroupSetting,
  checkPermissionGroupName,
  addPermissionGroup,
  editPermissionGroup
} from '@/api/workbench/user-list'

export default {
  inject: ['reload'],
  data() {
    return {
      arrHeight: [],
      total: null, // 总记录数
      currentPage: 1, // 当前第一页, 默认第一页
      pageSize: 16, // 每页显示条数 10条
      limit: 16,
      value: '2', // 状态
      checkedO: [], // 应用状态
      checkAll: [], // 菜单状态
      checkedT: [], // api状态
      isIndeterminate: true,
      data: [],
      appParams: [], // app 参数
      menusParams: [], // menus 参数
      apisParams: [], // api参数
      form: {
        // 增加用户参数
        name: '',
        note: '0',
        textarea: ''
      },
      editForm: {
        // 编辑用户参数
        editName: '',
        editNote: '',
        editTextarea: ''
      },
      formInline: {
        user: '',
        region: ''
      },
      rulesOne: {
        name: [
          { required: true, message: '请输入新增用户名称', trigger: 'blur' },
          { max: 15, message: '名称长度在15字符', trigger: 'blur' }
          /*  { validator: valiOlddatePass, trigger: "blur" } */
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入新增用户名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          /*  { validator: valiOlddatePass, trigger: "blur" } */
        ],
        textarea: [
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur'
          }
        ],
        editName: [
          { required: true, message: '请输入编辑用户名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          /*  { validator: valiOlddatePass, trigger: "blur" } */
        ],
        editTextarea: [
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur'
          }
        ]
      },
      searchMap: {}, // 条件查询绑定条件值
      multipleSelection: [],
      apps: [], // 应用
      menus: [], // 菜单
      apis: [], // 权限列表控制
      rows: {}, // 权限列表的用户信息
      rowsSame: {}, // 不变的数据
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisiblEdit: false,
      dialogFormVisilPermissions: false,
      dialogFormVisiblPermissions: false,
      tableHeight: 140, // 列表的高度
      showCheckd: false,
      num: 0,
      datass: [],
      valueJ: '1',
      valueQ: '2',
      menuNub: 0
    }
  },
  watch: {},
  computed: {
    ...mapState({
      roleData: state => state.asm.roleData
    })
    // eslint-disable-next-line vue/return-in-computed-property
  },
  filters: {},
  created() {
    this.fetchData()
  },

  mounted() {
    // 列表自适应浏览器的bug
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 140

      // 监听窗口大小变化
      const self = this
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 140
      }
    })
    // this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },
  destroyed() {
    window.onresize = ''
  },
  methods: {
    ...mapMutations('asm', ['ROLE_FROM']),
    closeEvent() {
      this.apps = [] // 应用
      this.menus = [] // 菜单
      this.apis = [] // 权限列表控制
      this.checkAll = []
      this.checkedT = []
      this.checkedO = []
      this.appParams = [] // app传参清空
      this.menusParams = [] // 菜单清空
      this.apisParams = [] // apis清空
      this.dialogFormVisiblPermissions = false
    },
    // 应用点击
    appCheck(obj) {
      this.dataHandler(obj)
      this.dataRender()
    },
    // 模块菜单点击
    menuCheck(obj) {
      this.dataHandler(obj)
      this.dataRender()
    },
    // 权限控制点击
    apiCheck(obj) {
      this.dataHandler(obj)
      this.dataRender()
    },
    // 处理数据
    dataHandler(data) {
      if (data.api_guid && data.check === 'api') {
        for (const key in this.apis) {
          this.apis[key].map(item => {
            if (item.api_guid === data.api_guid && item.is_checked === '0') {
              item.is_checked = '1'
            } else if (
              item.api_guid === data.api_guid &&
              item.is_checked === '1'
            ) {
              item.is_checked = '0'
            }
          })
        }
        this.menuHandler(data.menu_guid)
        this.appHandler(data.app)
      }
      if (data.menu_guid && data.check === 'menu') {
        this.apiHandler(data.menu_guid)
        this.menuHandler(data.menu_guid)
        this.appHandler(data.app)
      }
      if (data.app && data.check === 'app') {
        this.allDataHandler(data.app)
      }
    },
    // 全选或反选
    allDataHandler(app) {
      let num = 0
      for (const key in this.apis) {
        this.apis[key].map(item => {
          if (item.app_guid === app.app_guid && item.is_checked === '1') {
            num++
          }
        })
      }
      if (num === 0) {
        for (const key in this.apis) {
          this.apis[key].map(item => {
            if (item.app_guid === app.app_guid) {
              item.is_checked = '1'
            }
          })
        }
      } else {
        for (const key in this.apis) {
          this.apis[key].map(item => {
            if (item.app_guid === app.app_guid) {
              item.is_checked = '0'
            }
          })
        }
      }
      this.menus[app.app_guid].map(item => {
        this.menuHandler(item.menu_guid)
      })
      this.appHandler(app)
    },
    // 处理API数据
    apiHandler(menu_guid) {
      let num = 0
      this.apis[menu_guid].map(item => {
        if (item.is_checked === '1') {
          num++
        }
      })
      if (num === this.apis[menu_guid].length) {
        this.apis[menu_guid].map(item => {
          item.is_checked = '0'
        })
      } else {
        this.apis[menu_guid].map(item => {
          item.is_checked = '1'
        })
      }
    },
    // 处理menu数据
    menuHandler(menu_guid) {
      let num = 0
      this.apis[menu_guid].map(item => {
        if (item.is_checked === '1') {
          num++
        }
      })
      if (num === this.apis[menu_guid].length) {
        for (const key in this.menus) {
          this.menus[key].map(item => {
            if (item.menu_guid === menu_guid) {
              item.is_checked = '1'
            }
          })
        }
      } else {
        for (const key in this.menus) {
          this.menus[key].map(item => {
            if (item.menu_guid === menu_guid) {
              item.is_checked = '0'
              if (num === 0) {
                item.isIndeterminate = false
              }
            }
          })
        }
      }
      if (num > 0 && num < this.apis[menu_guid].length) {
        for (const key in this.menus) {
          this.menus[key].map(item => {
            if (item.menu_guid === menu_guid) {
              item.isIndeterminate = true
            }
          })
        }
      }
    },
    // 处理APP数据
    appHandler(app) {
      let num = 0
      this.menuNub = 0
      this.menus[app.app_guid].map(item => {
        if (item.is_checked === '1') {
          num++
        }
      })
      for (const key in this.apis) {
        this.apis[key].map(item => {
          if (app.app_guid === item.app_guid && item.is_checked === '1') {
            this.menuNub++
          }
        })
      }
      if (num === this.menus[app.app_guid].length) {
        this.apps.map(item => {
          if (item.app_guid == app.app_guid) {
            item.is_checked = '1'
          }
        })
      } else {
        this.apps.map(item => {
          if (item.app_guid == app.app_guid) {
            item.is_checked = '0'
            if (num === 0) {
              item.isIndeterminate = false
            }
          }
        })
      }
      if (
        (num > 0 && num < this.menus[app.app_guid].length) ||
        this.menuNub > 0
      ) {
        this.apps.map(item => {
          if (item.app_guid === app.app_guid) {
            item.isIndeterminate = true
          }
        })
      }
    },
    // 数据渲染
    dataRender(info) {
      const app = this.apps
      const menu = this.menus
      const api = this.apis
      this.checkedO = []
      this.checkAll = []
      this.checkedT = []
      app.map(item => {
        if (item.is_checked === '1') {
          if (!info) item.isIndeterminate = false
          if (info) {
            let arr = []
            for (const key in api) {
              const flag = api[key].every(item2 => {
                return (
                  item2.is_checked === '1' && item2.app_guid === item.app_guid
                )
              })
              if (flag) {
                arr.push(item)
              }
            }
            item.isIndeterminate = arr.length !== menu[item.app_guid].length
          }
          this.checkedO.push(item)
        }
      })
      for (const key in menu) {
        menu[key].map(item => {
          if (item.is_checked === '1') {
            if (!info) item.isIndeterminate = false
            if (info) {
              const flag = api[item.menu_guid].every(item => {
                return item.is_checked === '1'
              })
              item.isIndeterminate = !flag
            }
            this.checkAll.push(item.menu_guid)
          }
        })
      }
      for (const key in api) {
        api[key].map(item => {
          if (item.is_checked === '1') {
            this.checkedT.push(item.api_guid)
          }
        })
      }
    },
    // 配置权限
    handleOnClickPermissions(index, row) {
      // console.log("index", index, "row", row);
      this.rows = row
      this.apps = []
      this.menus = []
      this.apis = []
      this.checkAll = []
      this.checkedT = []
      this.checkedO = []
      this.appParams = [] // app传参清空
      this.menusParams = [] // 菜单清空
      this.apisParams = [] // apis清空

      // 权限列表获取
      this.getPermissionReAllData(
        this.formInline.user,
        row.permission_group_id
      )
      this.dialogFormVisiblPermissions = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    /* 提交搜索条件 */
    onSubmit() {
      // 权限列表搜索获取
      this.getPermissionReAllData(
        this.formInline.user,
        this.rows.permission_group_id
      )
    },
    getPermissionReAllData(search, id) {
      // 权限列表获取
      getPermissionRe(search, id).then(res => {
        if (res.data.code === 200) {
          this.apps = res.data.data.apps // 应用
          this.menus = res.data.data.menus // 菜单
          this.apis = res.data.data.apis // 权限列表控制
          this.showCheckd = true
          const apis = res.data.data.apis

          const arr = Object.keys(apis)
          arr.map((item, index) => {
            for (let i = 0; i < apis[arr[index]].length; i++) {
              try {
                for (let o = 0; o < apis[arr[index + 1]].length; o++) {
                  if (
                    apis[arr[index]][i].api_guid ==
                    apis[arr[index + 1]][o].api_guid
                  ) {
                    apis[arr[index + 1]][o].api_guid =
                      apis[arr[index + 1]][o].api_guid +
                      '+' +
                      Date.parse(new Date())
                  }
                }
              } catch (err) {
                console.log(err)
              }
            }
          })
          this.dataRender('info')
        }
      })
    },

    // 提交权限配置
    handlePermissions(formInline) {
      for (const appItem of this.apps) {
        for (const menusItem of this.menus[appItem.app_guid]) {
          for (const apisItem of this.apis[menusItem.menu_guid]) {
            if (apisItem.is_checked === '1') {
              if (this.appParams.indexOf(appItem.app_guid) === -1) { this.appParams.push(appItem.app_guid) }
              const menusAll = appItem.app_guid + '/' + menusItem.menu_guid
              // 获取回来的值往提交的 menusItems数组 中添加
              if (this.menusParams.indexOf(menusAll) === -1) { this.menusParams.push(menusAll) }
              const apisItemAll =
                appItem.app_guid +
                '/' +
                menusItem.menu_guid +
                '/' +
                apisItem.api_guid
              // 获取回来的值往提交的 apisItem 中添加
              this.apisParams.push(apisItemAll)
            }
          }
        }
      }

      const apisParamsArr = []
      this.apisParams.map(items => {
        const arr = items.split('+')
        apisParamsArr.push(arr[0])
      })
      const data = {
        permission_group_id: this.rows.permission_group_id, // 角色ID
        app_guids: this.appParams, // app_guid列表([app-1,....])
        menus_guids: this.menusParams, // menu_guid列表([app-1/menu-1,....])
        api_guids: apisParamsArr // api_guid列表([app-1/menu-1/api-1,....])
      }
      this.$refs[formInline].validate(valid => {
        if (valid) {
          permissionGroupSetting(data).then(res => {
            const fetch = res.data
            if (fetch.code === 200) {
              this.$notify({
                title: '成功',
                message: '权限提交成功',
                type: 'success'
              })

              // 刷新一下页面
              this.reload()
            }

            this.dialogFormVisiblPermissions = false
          })
          console.log('提交权限成功', valid)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增用户失去焦点读取用户名唯一性
    handleUserOnly() {
      const params = {
        permission_group_id: '', // 角色ID
        permission_group_name: this.form.name // 角色名
      }

      checkPermissionGroupName(params).then(res => {
        console.log('resppp', res)
      })
    },
    // 提交新增用户
    handleAddUser(form) {
      const data = {
        permission_group_description: this.form.textarea, // 说明备注
        permission_group_name: this.form.name, // 角色名
        is_disable: this.form.note //
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          addPermissionGroup(data).then(res => {
            const fetch = res.data
            if (fetch.code === 200) {
              this.$notify({
                title: '成功',
                message: '添加权限组成功',
                type: 'success'
              })

              // 刷新操作
              this.reload()
              // 请求一次接口
              this.fetchData()
            } else {
              this.$notify({
                title: '警告',
                message: `${fetch.message}`,
                type: 'warning'
              })
            }
          })

          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 提交编辑用户
    handleEditUser(editForm) {
      const data = {
        permission_group_description: this.rows.permission_group_description, // 说明备注
        permission_group_name: this.rows.permission_group_name, // 角色名
        permission_group_id: this.rows.permission_group_id, // 角色ID
        is_disable: this.rows.disabled // 0启用1.禁用
      }
      this.$refs[editForm].validate(valid => {
        if (valid) {
          editPermissionGroup(data)
            .then(res => {
              const fetch = res.data
              if (fetch.code === 200) {
                this.$notify({
                  title: '成功',
                  message: '修改权限组成功',
                  type: 'success'
                })

                this.value = '2' // 刷新操作
                this.fetchData()
                this.reload()
                debugger
                this.dialogFormVisiblEdit = false
              } else {
                this.$notify({
                  title: '警告',
                  message: `${fetch.message}`,
                  type: 'warning'
                })
              }
            })
            .catch(err => {
              // this.rows = this.rowsSame
              if (err) {
                if (this.rows.disabled !== '0') {
                  this.rows.disabled = '0'
                  this.rows.permission_group_description = ''
                  this.rows.permission_group_name = ''
                } else {
                  this.rows.disabled = '1'
                  this.permission_group_description = ''
                  this.permission_group_name = ''
                }
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑用户显示框
    handleEditUserRolt(row) {
      // 拿去角色列表的个人角色信息
      if (row) {
        this.rows = row
      }
      // 弹框的显示
      this.dialogFormVisiblEdit = true
    },
    //
    handleEditClose() {
      this.$router.go(0)
      this.dialogFormVisiblEdit = false
    },
    handleOut() {
      this.$router.go(0)
      this.dialogFormVisiblEdit = false
    },
    handleEdit(index, row) {
      console.log(index, row)
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
      if (this.value === '2') {
        this.fetchData(val, this.value)
      } else {
        this.fetchData(val, this.value)
      }
    },
    // 切换状态时
    handleChange(value) {
      console.log('value', value)
      if (value) {
        this.$store
          .dispatch('asm/RoleList', {
            is_disabled: value
            /*   page: this.currentPage,
              limit: this.total */
          })
          .then(res => {
            console.log('res', res)
            if (res.code === 200) {
              this.data = res.data
            } else {
              this.data = res.data == null ? [] : res.data
              this.total = res.data == null ? 0 : res.data.length
            }
          })
      }
    },
    // 请求接口
    fetchData(val, is_disabled) {
      // 数据渲染

      this.$store
        .dispatch('asm/RoleList', {
          is_disabled: is_disabled || this.value,
          page: val,
          limit: this.limit
        })
        .then(res => {
          if (res.code === 200) {
            this.data = res.data
            // 总长度
          }
        })
    },
    // 重置按钮
    resetForm(formInline) {
      // 重置获取数据
      this.getPermissionReAllData('', this.rows.permission_group_id)
      this.$refs[formInline].resetFields()
    }
  },
  updated() {
    const from = {
      value: this.value,
      currentPage: this.currentPage,
      pageSize: this.pageSize
    }

    this.ROLE_FROM(from)
  }
}
</script>

<style scoped>
.info-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.roleWrapAll {
  overflow: auto;
  height: 350px;
}

.detail-left {
  width: 30%;
}

.detail-right {
  width: 70%;
}

.detail-content-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-left: 10px;
}

.detail-content {
  width: 30%;
}

.detail-content-item {
  width: 70%;
  border-left: 1px solid #eee;
}

.item-text {
  display: inline-block;
  margin: 0 10px;
}

.info-content {
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  padding-left: 10px;
}

.info-content:last-child {
  border-bottom: 1px solid #eee;
}

.detail-right {
  border-left: 1px solid #eee;
}

.detail-right .detail-content-box:last-child {
  border: 0;
}

.permissions >>> .el-checkbox__label {
  padding: 10px 0 10px 10px;
}

.permissions >>> .el-dialog {
  width: 80%;
  border-radius: 10px;
}

.permissions >>> .el-dialog__header {
  padding: 0;
}

.permissions >>> .el-dialog__body {
  padding: 5px 20px;
}

.permissions >>> .el-dialog__footer {
  text-align: center;
}

.permissions >>> .el-input {
  width: 250px;
}
.permissions >>> .el-input__inner{
  border-radius: 6px 0 0 6px;
}
.permissions >>> .el-button+.el-button{
  margin: 0;
  border-radius: 0 6px 6px 0;
}
.permissions >>> .el-button{
  margin: 0;
  border-radius: 0;
}

.permissions >>> .cell.el-tooltip {
  white-space: normal;
  /* word-break: normal; */
}

.permissions >>> .el-table td,
.el-table th {
  padding: 0;
}

.permissions .tables >>> tr .el-table .cell {
  background: red;
  white-space: nowrap;
  text-overflow: initial;
  overflow-y: hidden;
}

/* 提交弹窗 */
.forms >>> .el-dialog__header {
  padding: 0;
}

.forms >>> .el-dialog__body {
  padding: 10px 20px;
}

.forms >>> .el-dialog {
  width: 30%;
  border-radius: 10px;
}

.forms >>> .el-input {
  width: 40%;
}

.forms >>> .el-input__inner {
  height: 30px;
}

.forms >>> .el-textarea {
  width: 80%;
}

.forms >>> .el-textarea__inner {
  height: 100px;
  padding: 5px 5px;
}

.forms >>> .el-switch {
  line-height: 18px;
  bottom: 1px;
}

.forms >>> .el-dialog__footer {
  text-align: center;
}

.forms >>> .el-form-item__error {
  top: 10px;
  left: 300px;
}

.textarea >>> .el-input__inner {
  height: 30px !important;
}

.role-list {
  display: flex;
}

.el-row {
  margin-top: 24px;
  margin-left: 20px;
}

.el-row >>> .el-button {
  padding: 8px 28px;
}

.pagination >>> .el-pagination {
  text-align: center;
}
</style>
