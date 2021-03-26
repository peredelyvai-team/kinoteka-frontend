import axios from 'axios'
import { refresh } from '../api/app'
import { setTokens } from '../utils/auth'

let requestQueue = []
let lastRequest = {}

const service = axios.create()

let isPending = false

const serviceDecorator = config => {
  const checking = false
  if (isPending && checking) {
    return new Promise(function (resolve, reject) {
      requestQueue.push({ config, resolve, reject })
    })
  }

  return new Promise(async function (resolve, reject) {
    if (checking) {
      config.url = `${process.env.REACT_APP_API_PATH}${config.url}`
      lastRequest = { config, resolve, reject }
    }
    try {
      const response = await service(config)
      resolve(response)
    } catch (error) {
      console.log(`Error in request: ${error}`)
      resolve(error.response)
    }
  })
}

service.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    }

    if (process.env.REACT_APP_DEPLOY_API_PATH) {
      config.url = process.env.REACT_APP_DEPLOY_API_PATH + config.url
    }

    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.log('error on request', error)
    return Promise.reject(error)
  }
)

async function refreshToken() {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem('refresh_token')
    try {
      const response = await refresh(token)
      console.log(response)
      setTokens(response.data.accessToken, response.data.refreshToken)
      resolve(response)
    } catch (error) {
      console.log(`Error in request: ${error}`)
      reject(error.response)
    }
  })
}

function resendPendingRequests() {
  requestQueue.forEach(async deferredRequest => {
    const config = deferredRequest.config
    console.log(config)
    const resolve = deferredRequest.resolve
    try {
      const response = await service(config)
      resolve(response)
    } catch (error) {
      console.log(`errResolve ${error}`)
    }
  })
  requestQueue = []
}

service.interceptors.response.use(
  response => {
    lastRequest = {}
    return response
  },
  async error => {
    if (error.response && error.response.status === 403) {
      if (error.response.data.error === 'Forbidden') {
        if (!isPending) {
          isPending = true
          refreshToken().then(() => {
            isPending = false
            resendPendingRequests()
          })
        }
      }
      return new Promise((resolve, reject) => {
        lastRequest.resolve = resolve
        lastRequest.reject = reject
        requestQueue.push({ resolve, reject, config: error.config })
      })
    } else {
      return new Promise((_, reject) => {
        reject(error)
      })
    }
  }
)

export default serviceDecorator
