import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Form from './AuthForm'
import OAuthOptions from './OAuthOptions'

const useStyles = makeStyles({
  container: {
    margin: '5vh auto',
    width: '50vh',
    padding: '2vh',
  },
  oAuthContainer: {
    marginTop: 10,
  },
  forgotPassButton: {
    textTransform: 'none',
    color: '#6bb8e5',
  },
  link: {
    textDecoration: 'none',
  },
  forgotPassContainer: {
    width: '100%',
  },
})

const ForgotPassButton = ({ className }) => {
  const classes = useStyles()
  return (
    <div className={`${className} ${classes.forgotPassContainer}`}>
      <Link className={classes.link} to="/auth/forgotpass">
        <Button className={classes.forgotPassButton} type="button">
          Forgot your password?
        </Button>
      </Link>
    </div>
  )
}

ForgotPassButton.propTypes = {
  className: PropTypes.any,
}

const SignIn = props => {
  const classes = useStyles()
  return (
    <Paper className={classes.container}>
      <Form
        title="Please Enter Your Email and Password to Continue"
        submitButtonText="Sign In"
        otherAuthOption={{ link: '/auth/signup', text: 'Create a profile' }}
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

export default SignIn
