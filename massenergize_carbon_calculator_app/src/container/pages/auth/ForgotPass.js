// Functional Component import
import React from 'react'
import { Redirect } from 'react-router-dom'
import { object, string } from 'yup'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Component from '../../../components/auth/ForgotPass'

import { sendResetPasswordEmail } from '../../../actions/firebaseAuth'

const useStyles = makeStyles({
  textInput: {
    margin: '20px 0px',
  },
})

const ForgotPass = () => {
  const classes = useStyles()
  const [error, setError] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [isEmailSent, setIsEmailSent] = React.useState(false)

  const onEmailSentSuccess = () => {
    setLoading(false)
    setIsEmailSent(true)
  }
  // Upon AuthForm submit, send email to reset password
  const onSubmit = formValues => {
    sendResetPasswordEmail(formValues, {
      onEmailSentSuccess,
      onError: setError,
    })
  }

  const validator = object().shape({
    email: string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
  })

  const initialValues = {
    email: '',
  }

  if (isEmailSent) {
    return <Redirect to="/auth/emailsent" />
  }

  return (
    <Component
      title="Please Enter Your Email To Continue"
      loading={loading}
      error={(error || {}).message}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validator}
      FieldsComponent={({
        touched,
        errors,
        values,
        handleChange,
        handleBlur,
      }) => (
        <TextField
          fullWidth
          className={classes.textInput}
          placeholder="Email"
          variant="outlined"
          name="email"
          label="Email"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
      )}
    />
  )
}

export default ForgotPass
