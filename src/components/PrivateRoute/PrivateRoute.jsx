import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

export function PrivateRoute({ children, ...rest }) {
  const { isAuth } = useSelector(state => state.app)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuth ? (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  )
}
