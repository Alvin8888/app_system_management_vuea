
const SCM_EDITS = 'scm_edits' // 文档数据查询 0
/* const SCM_GOODS_DETAILS = 'scm_goods_details' //商品详情
const SCM_INFOR_MATION = 'scm_infor_mation' //供应商信息
const SCM_WRAP = 'scm_wrap' //商品包装信息
const SCM_IMGS = 'scm_imgs' //商品图片
const SCM_SKU = 'scm_sku' //商品平台sku
const SCM_LOGISTIC = 'scm_logistic' //商品物流信息
const SCM_ASSEMBLY = 'scm_assembly' //商品组装信息
const SCM_CERTIFICATE = 'scm_certificate' //商品证书
const SCM_SALES = 'scm_sales' //商品销售信息 */

const SCM_VIEWROW = 'scm_viewrow' // sku用户列表传值保存

// 编辑
const getScmEdits = () => {
  return JSON.parse(sessionStorage.getItem(SCM_EDITS))
}
// 添加浏览器文档数据查询接口 0
const setScmEdits = row => {
  return sessionStorage.setItem(SCM_EDITS, JSON.stringify(row))
}

/* 关于详情的保存在浏览器存储与获取 */

// 获取浏览器商品详情数据储存
/* const getGoodsDetails = () => {
  return JSON.parse(sessionStorage.getItem(SCM_GOODS_DETAILS));
};

//设置保存商品详情数据储存在浏览器中
const setGoodsDetails = data => {
  return sessionStorage.setItem(SCM_GOODS_DETAILS, JSON.stringify(data));
};

//获取浏览器 供应商信息 数据储存
const getInformation = () => {
  return JSON.parse(sessionStorage.getItem(SCM_INFOR_MATION));
};

//设置保存 供应商信息 数据储存在浏览器中
const setInformation = data => {
  return sessionStorage.setItem(SCM_INFOR_MATION, JSON.stringify(data));
};

//获取浏览器 商品包装信息 数据储存
const getWrap = () => {
  return JSON.parse(sessionStorage.getItem(SCM_WRAP));
};

//设置保存 商品包装信息 数据储存在浏览器中
const setWrap= data => {
  return sessionStorage.setItem(SCM_WRAP, JSON.stringify(data));
};

//获取浏览器 商品图片 数据储存
const getImgs = () => {
  return JSON.parse(sessionStorage.getItem(SCM_IMGS));
};

//设置保存 商品图片 数据储存在浏览器中
const setImgs= data => {
  return sessionStorage.setItem(SCM_IMGS, JSON.stringify(data));
};

//获取浏览器 商品平台sku 数据储存
const getSku = () => {
  return JSON.parse(sessionStorage.getItem(SCM_SKU));
};

//设置保存 商品平台sku 数据储存在浏览器中
const setSku= data => {
  return sessionStorage.setItem(SCM_SKU, JSON.stringify(data));
};

//获取浏览器 商品物流信息 数据储存
const getLogistic= () => {
  return JSON.parse(sessionStorage.getItem(SCM_LOGISTIC));
};

//设置保存 商品物流信息 数据储存在浏览器中
const setLogistic= data => {
  return sessionStorage.setItem(SCM_LOGISTIC, JSON.stringify(data));
};

//获取浏览器 商品组装信息 数据储存
const getAssembly= () => {
  return JSON.parse(sessionStorage.getItem(SCM_ASSEMBLY));
};

//设置保存 商品组装信息 数据储存在浏览器中
const setAssembly= data => {
  return sessionStorage.setItem(SCM_ASSEMBLY, JSON.stringify(data));
};

//获取浏览器 商品证书 数据储存
const getCertificate= () => {
  return JSON.parse(sessionStorage.getItem(SCM_CERTIFICATE));
};

//设置保存 商品证书 数据储存在浏览器中
const setCertificate= data => {
  return sessionStorage.setItem(SCM_CERTIFICATE, JSON.stringify(data));
};

//获取浏览器 商品销售信息 数据储存
const getSales= () => {
  return JSON.parse(sessionStorage.getItem(SCM_SALES));
};

//设置保存 商品销售信息 数据储存在浏览器中
const setSales= data => {
  return sessionStorage.setItem(SCM_SALES, JSON.stringify(data));
};
 */

// 获取浏览器 sku列表 数据储存
const getViewRow = () => {
  return JSON.parse(sessionStorage.getItem(SCM_VIEWROW))
}

// 设置保存 sku列表 数据储存在浏览器中
const setViewRow = data => {
  return sessionStorage.setItem(SCM_VIEWROW, JSON.stringify(data))
}

export {
  getScmEdits,
  setScmEdits,

  /* 详情浏览器储存*/
  /*   getGoodsDetails,
  setGoodsDetails,
  getInformation,
  setInformation,
  getWrap,
  setWrap,
  getImgs,
  setImgs,
  getSku,
  setSku,
  getLogistic,
  setLogistic,
  getAssembly,
  setAssembly,
  getCertificate,
  setCertificate,
  getSales,
  setSales, */
  getViewRow,
  setViewRow

}
