import { SET_AUTH, SET_AUTH_ERROR } from '../types'

const initialState = {
  isAuth: false,
  authError: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH: {
      return {
        ...state,
        isAuth: action.payload,
      }
    }
    case SET_AUTH_ERROR: {
      return {
        ...state,
        authError: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
