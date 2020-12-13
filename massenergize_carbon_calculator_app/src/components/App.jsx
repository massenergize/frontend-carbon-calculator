// Functional imports
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../style/App.css'
import { Routes } from '../routes'
import Context from '../context'

const App = () => (
  <div className="container">
    <Context>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Context>
  </div>
)

export default App
