import request from '@/utlis/request'

const memBerList = () => {
  const list = request({
    method: 'get',
    url: '/member/list'
  })
  return list
}

const userListPage = (page, size, searchMap) => {
  const listPage = request({
    method: 'post',
    url: `/user/list/search/${page}/${size}`,
    data: searchMap
  })
  return listPage
}

// 新增成功
const memberSes = ber => {
  const ses = request({
    method: 'post',
    url: '/member',
    data: ber
  })
  return ses
}

// 会员查询id
const getById = id => {
  const baId = request({
    method: 'get',
    url: `/member/${id}`
  })
  return baId
}

// 会员跟新id
const update = opts => {
  const date = request({
    method: 'put',
    url: `/member/${opts.id}`,
    data: opts
  })
  return date
}

// 删除会员
const deleteById = id => {
  return request({
    method: 'delete',
    url: `/member/${id}`
  })
}

export { memBerList, userListPage, memberSes, getById, update, deleteById }
