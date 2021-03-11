import request from '../utils/request'

const logIn = async data => {
  const response = await request({
    url: '/login',
    method: 'post',
    data,
  })
  return { ...response }
}

const registration = async data => {
  const response = await request({
    url: '/register',
    method: 'post',
    data,
  })
  return { ...response }
}

export { logIn, registration }
