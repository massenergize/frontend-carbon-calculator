import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LoadingSpinner from './LoadingSpinner'

const useStyles = makeStyles({
  error: {
    color: 'red',
  },
  submitBtn: {
    backgroundColor: '#8dc63f',
    color: 'white',
  },
})

const Form = ({
  title,
  submitButtonText,
  onSubmit,
  status,
  children,
  loading,
}) => {
  const classes = useStyles()
  return (
    <>
      <Typography variant="h5">{title}</Typography>
      <form onSubmit={onSubmit}>
        {status && <Typography className={classes.error}>{status}</Typography>}
        {children}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Button className={classes.submitBtn} type="submit">
            {submitButtonText}
          </Button>
        )}
      </form>
    </>
  )
}

Form.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  status: PropTypes.string,
  submitButtonText: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node,
}

export default Form
