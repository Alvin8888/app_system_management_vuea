/* asm */
const Asm = () =>
  import ('@/pages/asm/module') // 工作台

// 工作台引入模块
const Home = () =>
  import ('@/pages/asm/wiew/home')
const Reset = () =>
  import ('@/pages/asm/wiew/reset')
const UserList = () =>
  import ('@/pages/asm/wiew/user-list')
const UserDetails = () =>
  import ('@/pages/asm/wiew/user-details')
const RoleList = () =>
  import ('@/pages/asm/wiew/role-list')
const DepartmentList = () =>
  import ('@/pages/asm/wiew/department-list')

export default [{
  path: '/asm',
  name: 'Asm',
  component: Asm,
  // redirect: '/asm',
  meta: {
    title: '系统管理',
    keepAlive: true,
    routerGuid: 'd02364fc-7b07-4100-ad43-20ab02b50907',
    apiGuidList: [

    ]
  },
  children: [{
    path: '/home',
    name: 'Home',
    component: Home,

    meta: {
      title: '账号信息',
      routerGuid: '2156829a-5ceb-433c-8c54-ebc6023d0d42',
      apiGuidList: [
        '383c415a-2dc6-4b4b-aaef-3f43633d1e3d'
      ]

    }
  },
  {
    path: '/reset',
    name: 'Reset',
    component: Reset,
    meta: {
      title: '修改密码',
      routerGuid: 'b77effb4-8ad6-41a6-828e-431ef14b12be',
      apiGuidList: [
        '9f63625b-a522-4def-b24d-0cd651e0eacf',
        'bcab99f5-97fe-4a13-b8dc-6b132e40421a'
      ]

    }
  },
  {
    path: '/user-details',
    name: 'UserDetails',
    component: UserDetails,
    meta: {
      title: '用户详情'
      // routerGuid: '68a77457-425a-42d1-9240-ba3cb915ab74',
      // apiGuidList: [
      //   '383c415a-2dc6-4b4b-aaef-3f43633d1e3d',
      //   'fcaee614-8318-4a55-a71d-4185349c8c82',
      //   '0f844eab-2612-4b64-a933-9ea59809a64a',
      //   '42f092a0-5d05-455d-8e3c-d7d72da77cd8'

      // ]

    }
  },
  {
    path: '/user-list',
    name: 'UserList',
    component: UserList,
    meta: {
      title: '用户列表',
      routerGuid: 'c3319b7c-de40-4ff5-99ac-8be2a787ca05',
      apiGuidList: [
        '52b8940c-7133-4f51-8e22-8baaf47f9fae',
        'ae3f9e57-4f7d-46a9-b37d-9dc41fda834c',
        '5bdfc579-4be1-4cc5-8bbf-695ffc052803',
        '383c415a-2dc6-4b4b-aaef-3f43633d1e3d',
        'fcaee614-8318-4a55-a71d-4185349c8c82',
        '0f844eab-2612-4b64-a933-9ea59809a64a',
        '42f092a0-5d05-455d-8e3c-d7d72da77cd8'
      ]

    }
  },
  {
    path: '/role-list',
    name: 'RoleList',
    component: RoleList,
    meta: {
      title: '角色列表',
      routerGuid: '72a541ef-10f0-43a2-b8f4-316624e69728',
      apiGuidList: [
        'ae3f9e57-4f7d-46a9-b37d-9dc41fda834c',

        '78139be6-55bd-4ce3-be11-6058fc1436a0',
        '1a898861-47a9-4f7e-a3e6-ea45d39aac10',
        '5c56e58e-cb4b-4e12-a7ad-9629c3acf742',
        '103637a6-8222-4a5e-8524-5f45d0626a1c',
        '88ddd69d-7bc5-4d22-bb7d-25e9a0e9c79c'

      ]

    }
  },
  {
    path: '/department-list',
    name: 'DepartmentList',
    component: DepartmentList,
    meta: {
      title: '部门列表',
      routerGuid: '0fabd898-e157-42f3-95b5-a94aab315216',
      apiGuidList: [
        '5bdfc579-4be1-4cc5-8bbf-695ffc052803'
      ]

    }
  }

  ]
}]
