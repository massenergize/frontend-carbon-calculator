import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Form from '../../container/Form'

const useStyles = makeStyles({
  container: {
    margin: '5vh auto',
    width: '50vh',
    padding: '2vh',
  },
})

const SignIn = props => {
  const classes = useStyles()
  return (
    <Paper className={classes.container}>
      <Form {...props} />
    </Paper>
  )
}

export default SignIn
