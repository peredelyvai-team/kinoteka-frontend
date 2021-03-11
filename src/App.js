import React, { useEffect } from 'react'
import cn from 'classnames'
import { Route, Redirect, NavLink } from 'react-router-dom'
import { Auth } from './modules/Auth'
import { useAction } from './hooks'
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
      <NavLink to='/auth'>Auth</NavLink>
      {isAuth && <Redirect to='/' from='/auth' />}
      <Route path='/auth' component={Auth} />
    </div>
  )
}

export default App
