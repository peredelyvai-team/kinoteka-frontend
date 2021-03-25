import request from '../utils/request'
import jwt_decode from 'jwt-decode'

export const getTop = async (page, type) => {
  const response = await request({
    url: `/films?page=${page}&type=${type}`,
    method: 'get',
  })
  return response
}

export const getItem = async (id, type) => {
  const response = await request({
    url: `/films/${id}`,
    method: 'get',
  })
  return response
}

export const addViewed = async id => {
  const { userId } = jwt_decode(localStorage.getItem('access_token'))
  const response = await request({
    url: `/users/${userId}/films/viewed`,
    method: 'put',
    data: { changes: { added: [id], removed: [] } },
  })
  return response
}

export const removeViewed = async id => {
  const { userId } = jwt_decode(localStorage.getItem('access_token'))
  const response = await request({
    url: `/users/${userId}/films/viewed`,
    method: 'put',
    data: { changes: { added: [], removed: [id] } },
  })
  return response
}

export const addFavorite = async id => {
  const { userId } = jwt_decode(localStorage.getItem('access_token'))
  const response = await request({
    url: `/users/${userId}/films/to_watch`,
    method: 'put',
    data: { changes: { added: [id], removed: [] } },
  })
  return response
}

export const removeFavorite = async id => {
  const { userId } = jwt_decode(localStorage.getItem('access_token'))
  const response = await request({
    url: `/users/${userId}/films/to_watch`,
    method: 'put',
    data: { changes: { added: [], removed: [id] } },
  })
  return response
}
