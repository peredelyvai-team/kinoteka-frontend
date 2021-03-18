import axios from 'axios'

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
  return new Promise((resolve, _) => {
    const rt = localStorage.getItem('REFRESH_TOKEN')
    // TODO: request refresh token
  })
}

function resendPendingRequests() {
  requestQueue.forEach(async deferredRequest => {
    const config = deferredRequest.config
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
    if (error.response && error.response.status === 401) {
      if (error.response.data.error === 'access_denied') {
        return
      }
      if (!isPending) {
        isPending = true
        refreshToken().then(() => {
          isPending = false
          resendPendingRequests()
        })
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
