/* dcm */

const Dmc = () =>
  import ('@/pages/dmc/module') // 文件管理中心

// 文件管理中心引入模块
const Mydocuments = () =>
  import ('@/pages/dmc/wiew/my-documents')
const DocumentsDetails = () =>
  import ('@/pages/dmc/wiew/documents-details')
const NewDocuments = () =>
  import ('@/pages/dmc/wiew/new-documents')
const EditorDocuments = () =>
  import ('@/pages/dmc/wiew/editor-documents')
const DocumentsLibrary = () =>
  import ('@/pages/dmc/wiew/documents-library')

export default [{
  path: '/dmc',
  name: 'Dmc',
  component: Dmc,
  // redirect: '/my-documents',
  meta: {
    title: '文件管理中心',
    routerGuid: '2b880e7-aff1-4a46-80f7-e0021e28578f',
    apiGuidList: [],
    keepAlive: true

  },
  children: [{
    path: '/my-documents',
    name: 'Mydocuments',
    component: Mydocuments,
    meta: {
      title: '我的文档',
      routerGuid: '82bfc590-7705-4a51-9c44-6a1c1d811328',
      apiGuidList: [

        '77e293d6-4e9a-4ba7-beb8-b659212111a7',
        'b2c6f625-2a0f-4805-8bd0-b5719b64eaf5',
        '9fbf4be3-0fc7-4263-8651-8090c8395b8f',
        '5dbb097a-bf69-4a17-996c-60c3a3331c62',
        '3c1d03b5-860c-494a-98ac-71dea6077302',
        '58a033cf-5f62-4cbf-b6ba-2cbc347dd373',
        '9fbf4be3-0fc7-4263-8651-8090c8395b8f',
        '85316da7-5722-4a7a-87cd-b644549f7694',
        'f2e1e335-e052-4145-9417-9227f1255b6c',
        'df10443b-177c-4705-8d23-9bcb6c77010a'

      ],
      keepAlive: true
    }
  },
  {
    path: '/documents-details',
    name: 'DocumentsDetails',
    component: DocumentsDetails,
    meta: {
      title: '查看文档详情',
      routerGuid: '38ee941a-712b-4e4f-a728-5d0d54ea09c6',
      apiGuidList: [],
      keepAlive: true
    }
  },
  {
    path: '/new-documents',
    name: 'NewDocuments',
    component: NewDocuments,
    meta: {
      title: '新建文档',
      routerGuid: '60c18b0d-cc67-44d8-9ad0-396509e4577a',
      apiGuidList: [],
      keepAlive: true
    }
  },
  {
    path: '/editor-documents',
    name: 'EditorDocuments',
    component: EditorDocuments,
    meta: {
      title: '编辑文档',
      routerGuid: '2c6e854e-da78-4bc1-8e70-9465101ff324',
      apiGuidList: [],
      keepAlive: true
    }
  },
  {
    path: '/documents-library',
    name: 'DocumentsLibrary',
    component: DocumentsLibrary,
    meta: {
      title: '文档库',
      routerGuid: '76986055-c1d3-4757-8219-b4ef190c81e0',
      apiGuidList: [
        'b44594e9-270c-418f-a9d7-03f590007403',
        '77e293d6-4e9a-4ba7-beb8-b659212111a7'
      ],
      keepAlive: true
    }
  }
  ]
}]
