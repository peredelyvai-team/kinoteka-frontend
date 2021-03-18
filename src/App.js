import { useEffect } from 'react'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { useAction } from './hooks'
import { Auth, Main } from './modules'
import { NavBar } from './components'
import './bootstrap.min.css'

function App() {
  const { isAuth } = useSelector(state => state.app)
  const { setAuth } = useAction()
  useEffect(() => {
    setAuth()
  }, [])

  return (
    <div className={cn('min-vh-100')}>
      <NavBar />
      <Route exact path='/'>
        <Main />
      </Route>
      {isAuth && <Redirect to='/' from='/auth' />}
      <Route path='/auth' component={Auth} />
    </div>
  )
}

export default App
