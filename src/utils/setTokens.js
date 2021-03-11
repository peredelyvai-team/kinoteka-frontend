export const setTokens = (accesssToken, refreshToken) => {
  window.localStorage.setItem('access_token', JSON.stringify(accesssToken))
  window.localStorage.setItem('refresh_token', JSON.stringify(refreshToken))
}
