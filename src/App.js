import React from 'react'
import './bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom'
import cn from 'classnames'
import { Auth } from './Auth'
import { SearchPanel } from './SearchPanel'
function App() {
  return (
    <div className={cn('min-vh-100', 'container')}>
      <SearchPanel />
      <BrowserRouter>
        <Route path='/login' component={Auth} />
      </BrowserRouter>
    </div >
  );
}

export default App;
