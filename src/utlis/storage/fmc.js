const FMC_INDEXS = 'fmc_index' // 查看详情

// 我的文档数据
const getFmcIndex = () => {
  return JSON.parse(localStorage.getItem(FMC_INDEXS))
}

const setFmcIndex = data => {
  return localStorage.setItem(FMC_INDEXS, JSON.stringify(data))
}

export {
  getFmcIndex,
  setFmcIndex
}
