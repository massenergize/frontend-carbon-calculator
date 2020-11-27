import React from 'react'
import { CircularProgress, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const CustomizedSpinner = withStyles({})(CircularProgress)

const LoadingSpinner = () => (
  <Grid container alignItems="center" justify="center">
    <Grid item xs={12}>
      <CustomizedSpinner />
    </Grid>
  </Grid>
)

export default LoadingSpinner
