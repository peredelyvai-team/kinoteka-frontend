import request from '../utils/request'

export const getPopular = async page => {
  const response = await request({
    url: `/films/popular?page=${page}`,
    method: 'get',
  })
  return response
}
