import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

export function AuthRoute({ children, ...rest }) {
  const { isAuth } = useSelector(state => state.app)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          <Redirect
            to={{
              pathname: '/',
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
