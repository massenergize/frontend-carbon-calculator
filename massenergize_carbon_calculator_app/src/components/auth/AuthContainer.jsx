import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import OAuthOptions from './OAuthOptions'

const useStyles = makeStyles({
  container: {
    margin: '10px auto',
    width: '400px',
    padding: '20px',
  },
  oAuthContainer: {
    marginTop: 10,
  },
})

const AuthContainer = ({ children }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.container}>
      {children}
      <Grid className={classes.oAuthContainer} direction="column" container>
        {['google', 'facebook'].map(provider => (
          <OAuthOptions key={provider} providerName={provider} />
        ))}
      </Grid>
    </Paper>
  )
}

AuthContainer.propTypes = {
  children: PropTypes.any,
}

export default AuthContainer
