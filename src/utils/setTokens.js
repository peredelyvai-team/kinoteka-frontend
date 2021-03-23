export const setTokens = (accesssToken, refreshToken) => {
  if (!!accesssToken && !!refreshToken) {
    window.localStorage.setItem('access_token', accesssToken)
    window.localStorage.setItem('refresh_token', refreshToken)
  }
}
