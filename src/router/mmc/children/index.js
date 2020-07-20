export default [
  {
    path: '/mmc/myList',
    name: 'myList',
    component: () => import('@/pages/mmc/view/order/myList/index'),
    meta: {
      title: '打单列表',
      routerGuid: 'cadc9fde-b6e8-474a-b5c0-b902d273ee25',
      apiGuidList: [],
      keepAlive: true
    }
  },
  {
    path: '/mmc/upOrder',
    name: 'upOrder',
    component: () => import('@/pages/mmc/view/order/upOrder/index'),
    meta: {
      title: '未上传',
      routerGuid: 'f3336de3-b39d-4ec9-b5f4-4834d230c9d3',
      apiGuidList: [],
      keepAlive: true
    }
  },
  {
    path: '/mmc/unDistribution',
    name: 'unDistribution',
    component: () => import('@/pages/mmc/view/order/unDistribution/index'),
    meta: {
      title: '待分仓',
      routerGuid: '1555306d-2de0-4aa5-af50-e70ecea0cbc3',
      apiGuidList: [],
      keepAlive: true
    }
  },
  {
    path: '/mmc/orderDetails',
    name: 'orderDetails',
    component: () => import('@/pages/mmc/components/orderDetails/index'),
    meta: {
      title: '订单详情',
      routerGuid: 'a87ba2dd-4f0e-4d44-bc46-c0d7632f7c7c',
      apiGuidList: [],
      keepAlive: true
    }
  },
  {
    path: '/mmc/distribution',
    name: 'distribution',
    component: () => import('@/pages/mmc/view/order/distribution/index'),
    meta: {
      title: '已分仓',
      routerGuid: '658dce63-5cac-4c14-b079-59e333fa5a21',
      apiGuidList: [],
      keepAlive: true
    }
  },
  {
    path: '/mmc/complete',
    name: 'complete',
    component: () => import('@/pages/mmc/view/order/complete/index'),
    meta: {
      title: '已打单',
      routerGuid: 'd45b059f-56f9-415e-93e1-b2c53198c42a',
      apiGuidList: [],
      keepAlive: true
    }
  }
]
