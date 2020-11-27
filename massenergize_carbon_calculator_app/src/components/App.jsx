// Functional imports
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '../style/App.css'
import { Grid } from '@material-ui/core'
import { Routes } from '../routes'
import Context from '../context'
import Header from '../pages/Header'
import { AuthProvider } from '../context/AuthContext'
// TODO: May apply context for authentication redirecting for EventItem
const App = () => (
  <div>
    <BrowserRouter>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item xs={12}>
          <AuthProvider>
            <Header />
          </AuthProvider>
        </Grid>
        <Context>
          <Routes />
        </Context>
      </Grid>
    </BrowserRouter>
  </div>
)

export default App
