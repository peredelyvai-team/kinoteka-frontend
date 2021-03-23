import { useEffect, useState } from 'react'
import cn from 'classnames'
import { Route } from 'react-router-dom'
import { useAction } from './hooks'
import { Auth, Main, MovieItem } from './modules'
import { NavBar, AuthRoute, PrivateRoute } from './components'
import './bootstrap.min.css'

function App() {
  const [loading, setLoading] = useState(true)
  const { setAuth } = useAction()
  useEffect(() => {
    setAuth()
    setLoading(false)
  }, [])

  if (loading) {
    return null
  }

  return (
    <div className={cn('min-vh-100')}>
      <NavBar />
      <Route exact path='/'>
        <Main />
      </Route>
      <AuthRoute path='/auth'>
        <Auth />
      </AuthRoute>
      <PrivateRoute path='/account'>
        <>Account Component</>
      </PrivateRoute>
      <Route path={'/item/:id'} component={MovieItem} />
    </div>
  )
}

export default App
