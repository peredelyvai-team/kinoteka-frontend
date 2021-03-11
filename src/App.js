import React, { useEffect } from 'react'
import cn from 'classnames'
import { Route, Redirect } from 'react-router-dom'
import { Auth } from './modules/Auth'
import { useAction } from './hooks'
import { Preloader } from './components'
import { useSelector } from 'react-redux'
import './bootstrap.min.css'
function App() {
  const { isAuth } = useSelector(state => state.app)
  const { setAuth } = useAction()
  useEffect(() => {
    setAuth()
  }, [])

  return (
    <div className={cn('min-vh-100', 'container')}>
      <Preloader isShow={false} />
      {isAuth && <Redirect to='/' from='/auth' />}
      <Route path='/auth' component={Auth} />
    </div>
  )
}

export default App
