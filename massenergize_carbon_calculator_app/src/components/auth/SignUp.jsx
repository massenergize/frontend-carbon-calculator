import React from 'react'
import { Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Form from './AuthForm'
import ForgotPassButton from './ForgotPassButton'
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

const SignUp = props => {
  const classes = useStyles()
  return (
    <Paper className={classes.container}>
      <Form
        title="Create Profile"
        submitButtonText="Sign Up"
        otherAuthOption={{
          link: '/auth/signin',
          text: 'Already have a profile',
        }}
        ForgotPassButton={ForgotPassButton}
        {...props}
      />
      <Grid className={classes.oAuthContainer} direction="column" container>
        {['google', 'facebook'].map(provider => (
          <OAuthOptions key={provider} providerName={provider} />
        ))}
      </Grid>
    </Paper>
  )
}

export default SignUp
