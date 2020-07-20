export default {
  path: '/mmc/userDetails',
  name: 'userDetails',
  component: () => import('@/pages/mmc/view/userList/userDetails'),
  meta: {
    title: '顾客详情',
    routerGuid: 'ae83e230-233b-4bd3-b0df-69bdefdc7eb7',
    apiGuidList: [],
    keepAlive: true
  }
}
