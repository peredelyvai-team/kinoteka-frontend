import { useEffect } from 'react'
import cn from 'classnames'
import { useSelector } from 'react-redux'
<<<<<<< HEAD
import './bootstrap.min.css'
import { Card } from './components/Card'
=======
import { Route, Redirect } from 'react-router-dom'
import { useAction } from './hooks'
import { Auth, Main } from './modules'
import { NavBar } from './components'
import './bootstrap.min.css'

>>>>>>> f36ac31bb19c586dddfad460070cd71f8eac7ce7
function App() {
  const { isAuth } = useSelector(state => state.app)
  const { setAuth } = useAction()
  useEffect(() => {
    setAuth()
  }, [])

  return (
    <div className={cn('min-vh-100')}>
<<<<<<< HEAD
      <Card />
=======
      <NavBar />
      <Route exact path='/'>
        <Main />
      </Route>
>>>>>>> f36ac31bb19c586dddfad460070cd71f8eac7ce7
      {isAuth && <Redirect to='/' from='/auth' />}
      <Route path='/auth' component={Auth} />
    </div>
  )
}

export default App
