import request from '@/utlis/request'

const baseURL = 'http://120.24.111.130:8021'

// 获取品类列表接口
const getCategoryList = () => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Category/getCategoryList`
  })
}

// 获取品类详情接口
const getCategoryItem = (category_id) => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Category/getCategoryItem`,
    params: {
      category_id
    }

  })
}

// 获取属性品类
const getCategoryByAttribute = (attribute_id) => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Attribute/getCategoryByAttribute`,
    params: {
      attribute_id
    }
  })
}

// 获取属性列表
const getAttributeList = (keywords, attribute_status, attribute_type, page, limit) => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Attribute/getAttributeList`,
    params: {
      keywords,
      attribute_status,
      attribute_type,
      page,
      limit
    }
  })
}

// 修改属性列表
const editAttribute = params => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Attribute/editAttribute`,
    params
  })
}

// 添加属性值
const addAttributeValue = params => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Attribute/addAttributeValue`,
    params
  })
}

// 绑定品类值
const addCategoryAttribute = params => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Attribute/addCategoryAttribute`,
    params
  })
}

// 删除绑定品类值
const delAttributeCategory = (attribute_id, category_id) => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Attribute/delAttributeCategory`,
    params: {
      attribute_id,
      category_id
    }
  })
}

// 删除绑属性值
const delAttributeValue = value_id => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Attribute/delAttributeValue`,
    params: {
      value_id
    }
  })
}

// 获取商品列表
const getCommodityList = params => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Commodity/getCommodityList`,
    params
  })
}

// 获取商品列表
const getCommodityById = commodity_id => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Commodity/getCommodityById`,
    params: {
      commodity_id
    }
  })
}

// 获取商品供应商
const getSupplierByCommodity = commodity_id => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Commodity/getSupplierByCommodity`,
    params: {
      commodity_id
    }
  })
}

// 获取商品包装信息
const getPackageByCommodity = commodity_id => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Commodity/getPackageByCommodity`,
    params: {
      commodity_id
    }
  })
}

// 获取商品图片
const getPictureByCommodity = commodity_id => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Commodity/getPictureByCommodity`,
    params: {
      commodity_id
    }
  })
}

// 获取商品平台sku
const getPlatformByCommodity = commodity_id => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Commodity/getPlatformByCommodity`,
    params: {
      commodity_id
    }
  })
}

// 获取商品物流信息
const getLogisticsByCommodity = commodity_id => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Commodity/getLogisticsByCommodity`,
    params: {
      commodity_id
    }
  })
}

// 获取商品组装信息
const getRcombinationByCommodity = commodity_id => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Commodity/getRcombinationByCommodity`,
    params: {
      commodity_id
    }
  })
}

// 获取商品证书
const getCertificateByCommodity = commodity_id => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Commodity/getCertificateByCommodity`,
    params: {
      commodity_id
    }
  })
}

// 获取商品销售信息
const getPurchaseSaleByCommodity = commodity_id => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Commodity/getPurchaseSaleByCommodity`,
    params: {
      commodity_id
    }
  })
}

// 获取仓库列表
const getWarehouseList = params => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Warehouse/getWarehouseList`,
    params
  })
}

// 获取仓库地区
const getAreaList = () => {
  return request({
    method: 'get',
    url: baseURL + `/commodity/Warehouse/getAreaList`
  })
}

export {

  getCategoryList,
  getCategoryByAttribute,
  getAttributeList,
  editAttribute,
  getCategoryItem,
  addAttributeValue,
  addCategoryAttribute,
  delAttributeCategory,
  delAttributeValue,
  getCommodityList,
  getCommodityById,
  getSupplierByCommodity,
  getPackageByCommodity,
  getPictureByCommodity,
  getPlatformByCommodity,
  getLogisticsByCommodity,
  getRcombinationByCommodity,
  getCertificateByCommodity,
  getPurchaseSaleByCommodity,
  getWarehouseList,
  getAreaList

}
