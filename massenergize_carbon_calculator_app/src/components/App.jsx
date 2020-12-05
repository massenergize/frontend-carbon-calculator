// Functional imports
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../style/App.css'
import { Grid } from '@material-ui/core'
import { Routes } from '../routes'
import Context from '../context'
import Header from '../pages/Header'
import { AuthProvider } from '../context/AuthContext'
import Footer from './Footer'
import AuthIsLoaded from '../container/AuthIsLoadContainer'

const App = () => (
  <div className="container">
    <BrowserRouter>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item xs={12}>
          <AuthProvider>
            <AuthIsLoaded>
              <Header />
            </AuthIsLoaded>
          </AuthProvider>
        </Grid>
        <Context>
          <Routes />
        </Context>
        <Footer />
      </Grid>
    </BrowserRouter>
  </div>
)

export default App
