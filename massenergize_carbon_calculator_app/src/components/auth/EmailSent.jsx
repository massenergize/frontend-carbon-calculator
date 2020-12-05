import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import LoadingSpinner from '../LoadingSpinner'

const useStyles = makeStyles({
  container: {
    margin: '5vh auto',
    width: '50vh',
    padding: '2vh',
  },
  error: {
    color: 'red',
  },
  link: {
    textDecoration: 'none',
  },
})

const EmailSent = ({ status, loading, onClick }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.container}>
      {status && <Typography className={classes.error}>{status}</Typography>}
      <Typography>
        We Have Sent You An Email. Please Check Your Inbox
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Button className={classes.submitBtn} onClick={onClick}>
            Resend Email
          </Button>
          {loading && (
            <span>
              <LoadingSpinner />
            </span>
          )}
        </Grid>
        <Grid item xs={6}>
          <Link to="/auth" className={classes.link}>
            <Button>Go To Sign In</Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  )
}

EmailSent.propTypes = {
  status: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
}
export default EmailSent
