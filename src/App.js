import { useEffect, useState } from 'react'
import cn from 'classnames'
import { Route } from 'react-router-dom'
import { useAction } from './hooks'
import { Account, Auth, Main, MovieItem } from './modules'
import { NavBar, AuthRoute, PrivateRoute } from './components'
import './bootstrap.min.css'
import { FilmContainer } from './components/FilmContainer'

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
      <Route path={['/films', '/top', '/favorite', '/watch']} component={FilmContainer} />
    </div>
  )
}

export default App
