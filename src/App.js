import React from 'react'
import { Route } from 'react-router-dom'
import cn from 'classnames'
import { Auth } from './modules/Auth'
import { SearchPanel } from './components/SearchPanel'
import './bootstrap.min.css'
import { Preloader } from './components'
function App() {
  return (
    <div className={cn('min-vh-100', 'container')}>
      <Preloader isShow={true} />
      <Route path='/login' component={Auth} />
    </div>
  )
}

export default App
