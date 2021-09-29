import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import Header from '../container/Header'
import Footer from './Footer'

const BasePage = ({ children, routes }) => (
  <Grid container direction="row" justify="flex-start" alignItems="center">
    <Grid item xs={12}>
      <Header routes={routes} />
    </Grid>
    {children}
    <Footer />
  </Grid>
)

BasePage.propTypes = {
  children: PropTypes.node,
  routes: PropTypes.array,
}

export default BasePage
