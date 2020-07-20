/* scm */
const Scm = () =>
  import ('@/pages/scm/module') // 供应商中心
// 供应商模块引入模块
const BrandList = () =>
  import ('@/pages/scm/wiew/brand-list')
const AttributeList = () =>
  import ('@/pages/scm/wiew/attribute-list')
const SkuList = () =>
  import ('@/pages/scm/wiew/sku-list')
const LibraryList = () =>
  import ('@/pages/scm/wiew/library-list')
const SkuDetails = () =>
  import ('@/pages/scm/wiew/sku-details')

export default [{
  path: '/scm',
  name: 'Scm',
  component: Scm,
  meta: {
    title: '供应商中心',
    keepAlive: true,
    routerGuid: '68a77457-425a-42d1-9240-ba3cb915ab74',
    apiGuidList: []
  },
  children: [{
    path: '/brand-list',
    name: 'BrandList',
    component: BrandList,
    meta: {
      title: '品类列表',
      routerGuid: 'ee1e5165-bd8a-483a-b26c-35df6ce585a5',
      apiGuidList: [
        'a2079501-16b4-4160-b5ba-8f6ec0001a33',
        '7a6cbfdb-8172-4115-b139-28f6684d156d'
      ],
      keepAlive: true
    }
  },
  {
    path: '/attribute-list',
    name: 'AttributeList',
    component: AttributeList,
    meta: {
      title: '属性列表',
      routerGuid: 'e81beef8-ce66-4a70-aebe-7332fea3df70',
      apiGuidList: [
        '16a7735f-2e23-410e-b699-1244b0d86557',
        'c932cd94-df6f-4858-b09b-d6163864ba6f',
        'f789ce87-82d9-443e-a6c9-493535d93c81',
        '9157550e-1ce9-45ad-8f47-92ec9fda48ad',
        '533820f7-b3c3-40e2-b675-64d721ed9b43',
        '0902d9f5-c5c9-4e4c-840f-028259aea9af',
        '59907942-0efe-43a8-9d13-0bc2b1cb7a59',
        '26b2c132-e351-4be6-9a2f-bdab4084f9b3'
      ],
      keepAlive: true
    }
  },
  {
    path: '/sku-list',
    name: 'SkuList',
    component: SkuList,
    meta: {
      title: '库存sku列表',
      routerGuid: '23c8a3e9-77f6-486f-bab3-499beadcafc3',
      apiGuidList: [
        '71f30b59-a8ce-45df-807c-ed7d8c32c6e7',
        '4ef1ca00-e554-4387-bcb3-98a81b98d39f',
        'a2de7922-5bff-4a65-9199-43bf82d5ea8d',
        '6fa82048-7eff-48b1-9c64-398ce72372c8',
        'cceec0a1-4c9d-400f-b2a0-945a786a1e2e',
        '84ca5d0b-b4bb-4670-a495-ae69db5acf3b',
        '84ca5d0b-b4bb-4670-a495-ae69db5acf3b',
        'a395293e-426b-4452-b1ab-7f7a5ab4669e',
        'a26b2c132-e351-4be6-9a2f-bdab4084f9b3',
        '086b27c1-64ba-4438-9539-9615c7e70a29',
        '30a356c2-47dd-41a7-b6e3-836d29ccf360'
      ],
      keepAlive: true
    }
  },
  {
    path: '/library-list',
    name: 'LibraryList',
    component: LibraryList,
    meta: {
      title: '仓库列表',
      routerGuid: 'c724a55b-4707-424e-b8b6-08d301a83ce3',
      apiGuidList: [
        'd1eeb242-40cc-43e7-8680-674ea73eb77f',
        'db27405a-a0dd-45ad-8c25-e85fbd6ab3c1'
      ],
      keepAlive: true
    }
  },
  {
    path: '/sku-details',
    name: 'SkuDetails',
    component: SkuDetails,
    meta: {
      title: '库存sku详情',
      routerGuid: 'd45b489e-1ea9-48e5-88ab-970627720618',
      apiGuidList: [],
      keepAlive: true
    }
  }
  ]
}]
