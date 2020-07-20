/* children */

const UploadFile = () =>
  import ('@/pages/fmc/wiew/accounting/upload-file') // 上传文件子页面
const HaveCheck = () =>
  import ('@/pages/fmc/wiew/accounting/have-check') // 已核对子页面
const NotCheck = () =>
  import ('@/pages/fmc/wiew/accounting/not-check') // 未核对子页面
const NoCheck = () =>
  import ('@/pages/fmc/wiew/accounting/no-check') // 查无此单子页面
const OrderWrong = () =>
  import ('@/pages/fmc/wiew/accounting/no-check') // 查无此单子页面

export default [{
  path: '/upload-file',
  component: UploadFile,
  meta: {
    title: '上传statement',
    keepAlive: true,
    routerGuid: '36995b083-a511-4a8e-a243-c918aa508d87',
    apiGuidList: []
  }
},
{
  path: '/have-check',
  component: HaveCheck,
  meta: {
    title: '已核对',
    keepAlive: true,
    routerGuid: 'a230771b-6ed9-47bc-9e9a-e739e6852154',
    apiGuidList: []
  }
},
{
  path: '/not-check',
  component: NotCheck,
  meta: {
    title: '未核对',
    keepAlive: true,
    routerGuid: 'c5dffc57-eaf8-41bf-ace7-14e11874aab1',
    apiGuidList: []
  }
},
{
  path: '/no-check',
  component: NoCheck,
  meta: {
    title: '查无此单',
    keepAlive: true,
    routerGuid: '739fa00e-7c5f-4ca6-bf62-8953c91ac049',
    apiGuidList: []
  }
},
{
  path: '/order-wrong',
  component: OrderWrong,
  meta: {
    title: '查无此单',
    keepAlive: true,
    routerGuid: '739fa00e-7c5f-4ca6-bf62-8953c91ac049',
    apiGuidList: []
  }
}

]
