import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress, Grid, Typography } from '@material-ui/core'

const LoadingSpinner = ({ message }) => (
  <Grid container alignItems="center" justify="center">
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
    {message && (
      <Grid item xs={12}>
        <Typography color="error">{message}</Typography>
      </Grid>
    )}
  </Grid>
)

LoadingSpinner.propTypes = {
  message: PropTypes.string,
}

export default LoadingSpinner
