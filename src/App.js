import React from 'react'
import { Route } from 'react-router-dom'
import cn from 'classnames'
import { Auth } from './Auth'
import { SearchPanel } from './SearchPanel'
import './bootstrap.min.css'
function App() {
  return (
    <div className={cn('min-vh-100', 'container')}>
      <SearchPanel />
      <Route path='/login' component={Auth} />
    </div>
  )
}

export default App
