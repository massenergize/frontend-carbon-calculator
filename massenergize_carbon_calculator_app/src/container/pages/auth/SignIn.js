// Functional components import
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { object } from 'yup'
import { fetchCCUser } from '../../../actions'
import BasicInfo from './BasicInfo'
import AuthIsLoaded from '../../AuthIsLoadContainer'
import { useAuthState } from '../../../context/AuthContext'
import { normalSignIn } from '../../../actions/firebaseAuth'
import Component from '../../../components/auth/SignIn'
import { signinFields as fields } from '../../fields'

// Styling classes
const useStyles = makeStyles({
  textInput: {
    width: '100%',
  },
  link: {
    textDecoration: 'none',
  },
  googleBtn: {
    color: 'white',
    backgroundColor: 'red',
  },
  fbBtn: {
    color: 'white',
    backgroundColor: '#3b5998',
  },
  error: {
    color: 'red',
  },
  fieldContainer: {
    marginTop: '20px',
  },
})

const LogInForm = () => {
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [isFinishSignUp, setIsFinishSignUp] = useState(false)

  const firebaseAuth = useSelector(({ firebase: { auth } }) => auth)
  const { setAuthState } = useAuthState()

  const onSignIn = async authRes => {
    const user = await fetchCCUser(authRes.user)
    if (!user) {
      setIsFinishSignUp(false)
    } else {
      setIsFinishSignUp(true)
      setAuthState(user)
    }
  }

  const onSubmit = values => {
    setLoading(true)
    normalSignIn(values, { onSignInSuccess: onSignIn, onError: setError })
  }

  const validator = object(
    fields.reduce(
      (allValidator, field) => ({
        ...allValidator,
        [field.name]: field.validator,
      }),
      {},
    ),
  )

  const initialValues = fields.reduce(
    (values, field) => ({
      ...values,
      [field.name]: field.initialValue,
    }),
    {},
  )

  if (!firebaseAuth.isEmpty && !firebaseAuth.emailVerified)
    return <Redirect to="/auth/emailsent" />
  if (isFinishSignUp) {
    return (
      <AuthIsLoaded>
        <BasicInfo />
      </AuthIsLoaded>
    )
  }
  // Render Auth Form for user sign in with other options print out
  return (
    <Component
      loading={loading}
      error={error}
      title="Please Enter Your Email and Password to Continue"
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateSchema={validator}
      submitButtonText="Sign In"
      Fields={({ formik }) => (
        <Grid className={classes.fieldContainer} container spacing={2}>
          {fields.map(
            ({ type, label, name, Component: FieldComponent, placeholder }) => (
              <Grid key={name} item xs={12}>
                <FieldComponent
                  className={classes.textInput}
                  variant="outlined"
                  name={name}
                  value={formik.values[name]}
                  placeholder={placeholder}
                  label={label}
                  type={type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched[name] && formik.errors[name]}
                />
              </Grid>
            ),
          )}
        </Grid>
      )}
    />
  )
}

// Connect with signIn and fetchCCUser action
export default LogInForm
