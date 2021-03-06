import { useEffect, useState } from 'react'
import cn from 'classnames'
import { Route } from 'react-router-dom'
import { useAction } from './hooks'
import { Account, Auth, Main, MovieItem } from './modules'
import { Films, Top, Viewed, Favorite } from './modules/Films'
import { NavBar, AuthRoute, PrivateRoute } from './components'
import './bootstrap.min.css'

function App() {
  const [loading, setLoading] = useState(true)
  const { setAuth } = useAction()
  useEffect(() => {
    setAuth()
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Account />
      </PrivateRoute>
      <Route path={'/item/:id'} component={MovieItem} />
      <Route path={'/films'} component={Films} />
      <Route path={'/top'} component={Top} />
      <Route path={'/favorite'} component={Favorite} />
      <Route path={'/watch'} component={Viewed} />
    </div>
  )
}

export default App
