import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  forgotPassButton: {
    textTransform: 'none',
    color: '#6bb8e5',
  },
  forgotPassContainer: {
    width: '100%',
  },
  link: {
    textDecoration: 'none',
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

export default ForgotPassButton
