/* asm */
const WorkBench = () =>
  import ('@/pages/workbench') // 工作台

export default [{
  path: '/workbench',
  name: 'WorkBench',
  component: WorkBench,
  // redirect: '/asm',
  meta: {
    title: '工作台',
    keepAlive: true,
    routerGuid: '8864a3d9-56d8-40be-9114-4225f8729ef7',
    apiGuidList: [

    ]
  }
  /*  children: [{
            path: '/WorkBench',
            name: 'Home',
            component: WorkBench,

            meta: {
                title: '账号信息',
                routerGuid: "2156829a-5ceb-433c-8c54-ebc6023d0d42",
                apiGuidList: [
                    "383c415a-2dc6-4b4b-aaef-3f43633d1e3d"
                ],
                keepAlive: true,
            }
        },
    ] */
}]
