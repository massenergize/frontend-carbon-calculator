import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { ButtonWithLoading } from './CustomizedButton'

const useStyles = makeStyles({
  title: {
    color: '#6BB8E5',
    fontWeight: 600,
  },
  loading: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  error: {
    color: 'red',
  },
  submitBtn: {
    backgroundColor: '#8dc63f',
    color: 'white',
    '&:hover': {
      backgroundColor: '#C4F285',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    textTransform: 'none',
    color: '#6bb8e5',
  },
  link: {
    textDecoration: 'none',
  },
})

const Form = ({
  title,
  submitButtonText,
  onSubmit,
  status,
  children,
  loading,
  ButtonComponent,
  otherAuthOption,
}) => {
  const classes = useStyles()
  const SubmitButton = ButtonComponent || ButtonWithLoading
  console.log(status)
  return (
    <>
      <Typography className={classes.title} variant="h5">
        {title}
      </Typography>
      <form onSubmit={onSubmit}>
        {status && <Typography className={classes.error}>{status}</Typography>}
        {children}
        <div className={classes.buttonContainer}>
          {otherAuthOption && (
            <Link className={classes.link} to={otherAuthOption.link}>
              <Button type="button" className={classes.button}>
                {otherAuthOption.text}
              </Button>
            </Link>
          )}

          <SubmitButton
            className={classes.submitBtn}
            loading={loading}
            type="submit"
          >
            {submitButtonText}
          </SubmitButton>
        </div>
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
  ButtonComponent: PropTypes.any,
  otherAuthOption: PropTypes.shape({
    link: PropTypes.string,
    text: PropTypes.string,
  }),
}

export default Form
