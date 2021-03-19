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

const refresh = async token => {
  const response = await request({
    url: '/token',
    method: 'post',
    data: {
      token,
    },
  })
  return response
}

export { logIn, registration, refresh }
