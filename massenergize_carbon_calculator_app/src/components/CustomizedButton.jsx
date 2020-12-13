import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button, CircularProgress } from '@material-ui/core'

// Styled Button
const CustomizedButton = withStyles({
  root: {
    width: '100%',
    color: '#67b6e4',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
})(Button)

export const ButtonWithLoading = withStyles({
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})(
  ({
    children,
    classes,
    className,
    loadingClassName,
    onClick,
    loading,
    ...rest
  }) => (
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        className={className}
        disabled={loading}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          className={`${classes.buttonProgress} ${loadingClassName}`}
        />
      )}
    </div>
  ),
)

export default CustomizedButton
