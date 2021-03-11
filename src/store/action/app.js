import { SET_AUTH, SET_AUTH_ERROR } from '../types'
import { logIn, registration } from '../../api/app'
import { setTokens } from '../../utils/setTokens'
import { authResponseMapping } from '../../utils/authResponseMapping'

export function setAuth() {
  const token = localStorage.getItem('access_token')
  const isAuth = !!token

  return {
    type: SET_AUTH,
    payload: isAuth,
  }
}

export function setAuthError(message) {
  return {
    type: SET_AUTH_ERROR,
    payload: message,
  }
}

export function setLogin(data) {
  return async dispatch => {
    const res = await logIn(data)
    if (res.status === 200) {
      setTokens(res.data.accessToken, res.data.refreshToken)
      dispatch(setAuth())
    } else {
      dispatch(setAuthError(authResponseMapping(res.data)))
    }
  }
}

export function setRegistration(data) {
  return async dispatch => {
    const res = await registration(data)
    if (res.status === 200) {
      dispatch(setLogin(data))
    } else {
      dispatch(setAuthError(authResponseMapping(res.data)))
    }
  }
}
