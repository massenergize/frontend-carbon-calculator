import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress, Typography } from '@material-ui/core'

const LoadingSpinner = ({ message }) => (
  <>
    <CircularProgress />
    {message && (
      <div>
        <Typography color="error">{message}</Typography>
      </div>
    )}
  </>
)

LoadingSpinner.propTypes = {
  message: PropTypes.string,
}

export default LoadingSpinner
