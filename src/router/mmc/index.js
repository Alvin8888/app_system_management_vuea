// mmc
import children from '@/router/mmc/children'
import skuDetails from '@/router/mmc/children/skuDetails'
import userDetails from '@/router/mmc/children/userDetails'

export default [{
  path: '/mmc',
  name: 'Mmc',
  component: () => import('@/pages/mmc/view/index'),
  meta: {
    title: '销售管理中心',
    keepAlive: true,
    routerGuid: 'bc46a6c4-bbd9-45fb-a5ea-12fdaa8181e5',
    apiGuidList: []
  },
  children: [
    {
      path: '/mmc/skuList',
      name: 'skuList',
      component: () => import('@/pages/mmc/view/skuList/index'),
      meta: {
        title: '平台SKU列表',
        routerGuid: '2b6f3ca8-e232-49ec-b3c9-af593a4f1236',
        apiGuidList: [
          '3bc0aff0-21bf-40de-a610-d73be9adb530',
          '55a51feb-8e9b-4807-b5a3-49e0e34329a0',
          'b037af93-9273-477f-8719-2d850c39ba04',
          '98dc2ba5-4dae-4c34-a715-81ba811bbd6a'
        ],
        keepAlive: true
      },
      children: [
        skuDetails
      ]
    },
    {
      path: '/mmc/myOrder',
      name: 'myOrder',
      component: () => import('@/pages/mmc/view/order/myOrder/index'),
      meta: {
        title: '我的打单',
        routerGuid: 'f3336de3-b39d-4ec9-b5f4-4834d230c9d3',
        apiGuidList: [
          '85fa0784-46a1-4354-a92f-3a30e4706de9',
          'b4bf481e-a359-4b61-86ea-d8581803743f',
          '050620d7-8c82-4274-b027-5b57795586dd',
          '4b13585c-6962-46a8-9d5c-803f1c5d6eba',
          '12800dc5-a0d2-4035-8394-ababc09ef9e4',
          'b44bd3fd-03f5-4596-b7ea-32810b2b948e',
          'cced8237-d7bb-40eb-b931-db8401f33939',
          '4074f835-09e9-41fd-9f17-818bbe59dce7',
          '72b589f5-051b-4d9a-b9e4-a7c3ce8a84f0',
          '45a9e31b-6e73-4e4a-b7e7-4d2e7a05364c',
          '9e8f535a-2b58-4d92-9121-745ce4f1ef9a',
          '600d1204-f1df-4634-a72c-2d2f285a7d68',
          'a011189a-a58f-4810-914a-eeb2b359b584',
          'ad137525-b736-47b9-b5f9-d33dbaa8db76'
        ],
        keepAlive: true
      },
      children: [
        ...children
      ]
    },
    {
      path: '/mmc/shopList',
      name: 'shopList',
      component: () => import('@/pages/mmc/view/shopList/index'),
      meta: {
        title: '店铺列表',
        routerGuid: '15f22cd8-3ade-44aa-8a87-9688cec5033c',
        apiGuidList: [
          '3dde03ab-53bb-453d-8e4a-935f8d472ce6',
          'fe1cc3d0-d55f-461c-9629-71abcca87b22'
        ],
        keepAlive: true
      },
      children: []
    },
    {
      path: '/mmc/userList',
      name: 'userList',
      component: () => import('@/pages/mmc/view/userList/index'),
      meta: {
        title: '顾客列表',
        routerGuid: '2ab929ed-f8c9-4593-8bf9-b1256709b815',
        apiGuidList: [
          'ea00e5de-9bcb-4432-b025-8711a7206f1c',
          '9c82c5e2-758f-4203-ae0a-8106602a071c',
          '7f057bc3-312a-419a-8264-b1343377e10a'
        ],
        keepAlive: true
      },
      children: [
        userDetails
      ]
    }

  ]
}]

/*
{
  path: '/mmc/orderList',
    name: 'orderList',
  component: () => import('@/pages/mmc/view/order/orderList/index'),
  meta: {
  title: '订单列表',
    routerGuid: 'd9a5bf10-7bae-4d27-8002-4d10550ede27',
    apiGuidList: [
    '2c9931e1-d6b8-4cae-8d14-cf2cf9dcadd6',
    'f4c8fe57-8f78-443c-b2ca-48df58405111',
    '7934c427-f94d-4b59-80d6-2434093a771b',
    'a7a12bc6-e4ce-4702-9ad7-1998a545ece4',
    '786ac0ce-af54-4302-bca6-5a524005e864'
  ],
    keepAlive: true
},
  children: []
},*/
