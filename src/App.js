import React from 'react'
import { Route } from 'react-router-dom'
import cn from 'classnames'
import { Auth } from './modules/Auth'
import { SearchPanel } from './components/SearchPanel'
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
