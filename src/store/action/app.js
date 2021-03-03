import { SET_AUTH } from '../types'

export function setAuth(isAuth) {
  return {
    type: SET_AUTH,
    payload: isAuth,
  }
}
