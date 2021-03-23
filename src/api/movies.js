import request from '../utils/request'

export const getTop = async (page, type) => {
  const response = await request({
    url: `/films?page=${page}&type=${type}`,
    method: 'get',
  })
  return response
}

export const getItem = async (id, type) => {
  const response = await request({
    url: `/${type}/${id}`,
    method: 'get',
  })
  return response
}
