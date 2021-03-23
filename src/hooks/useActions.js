import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../store/action/'

export function useAction() {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
