/* scm */
const Fmc = () =>
  import ('@/pages/fmc/module') // 财务管理中心
const Accounting = () =>
  import ('@/pages/fmc/wiew/accounting') // 供应商中心

import children from './children' // 子页面

export default [{
  path: '/fmc',
  name: 'fmc',
  component: Fmc,
  meta: {
    title: '财务管理中心',
    keepAlive: true,
    routerGuid: '67f16815-6205-4feb-a7d2-8edcc2a1fdd2',
    apiGuidList: []

  },
  children: [{
    path: '/accounting',
    name: 'accounting',
    component: Accounting,
    meta: {
      title: '余额核对',
      keepAlive: true,
      routerGuid: '36d968e5-e473-4313-a329-1fe3edbf5702',
      apiGuidList: [
        '9335117a-1ce7-47aa-bfca-90b294453764',
        '881758f3-ca5b-4698-b129-65004390b37f',
        '8a33cbaa-94d7-4f21-93dc-1002a6223a79',
        'b25cd747-728f-47c7-adf0-19d661b2a0e0',
        '20abecd4-d408-4d51-9899-116829023b4a',
        '3501d811-da24-4ce2-bf52-6975b9c99e1e',
        '76937077-b981-4f32-91bb-6bebeab34e82',
        '702e8679-d2bc-4c00-a51e-705a3499f0a4',
        '8596b238-626c-4fa7-9fe5-48eab2b27f25',
        '1ca4c3b6-8082-4656-9fb6-d8e865cdf45a',
        'dae9e921-6686-4b39-a129-0fa407e2892d',
        'ae77d0b0-e293-4b5b-93d9-63197eefbea6',
        'be02ac5d-e1fd-45a7-9023-8dd770312c18',
        'be02ac5d-e1fd-45a7-9023-8dd770312c18',
        'dae9e921-6686-4b39-a129-0fa407e2892d'
      ]

    },
    children: [
      ...children // 子页面
    ]
  }]
}]
