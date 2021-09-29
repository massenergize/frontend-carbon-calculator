import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Form from '../../container/Form'

const useStyles = makeStyles({
  container: {
    margin: '10px auto',
    width: '400px',
    padding: '20px',
  },
})

const ForgotPass = props => {
  const classes = useStyles()
  return (
    <Paper className={classes.container}>
      <Form
        title="Please Enter Your Email To Continue"
        submitButtonText="Resend Email"
        otherAuthOption={{ link: '/auth/signin', text: 'Go back to sign in' }}
        {...props}
      />
    </Paper>
  )
}

export default ForgotPass
