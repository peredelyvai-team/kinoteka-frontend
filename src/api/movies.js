import request from '../utils/request'
import jwt_decode from "jwt-decode";

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


export const addViewed = async id => {
  const user_id = jwt_decode(localStorage.getItem('access_token'))
  const response = await request({
    url: `/users/${user_id}/films/viewed`,
    method: 'put',
    data: { 'added': [id], 'removed': [] }
  })
  console.log(response);
  return response
}