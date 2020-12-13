// Functional components import
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { object } from 'yup'
import { fetchCCUser } from '../../../actions'
import BasicInfo from './BasicInfo'
import AuthIsLoaded from '../../AuthIsLoadContainer'
import { useAuthState } from '../../../context/AuthContext'
import { normalSignIn } from '../../../actions/firebaseAuth'
import Component from '../../../components/auth/SignIn'
import { signinFields as fields } from '../../fields'

const LogInForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [isFinishSignUp, setIsFinishSignUp] = useState(false)

  const firebaseAuth = useSelector(({ firebase: { auth } }) => auth)
  const { setAuthState } = useAuthState()

  const onSignIn = async authRes => {
    try {
      const user = await fetchCCUser(authRes.user)
      if (!user) {
        setIsFinishSignUp(false)
      } else {
        setIsFinishSignUp(true)
        setAuthState(user)
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = values => {
    setLoading(true)
    normalSignIn(values, { onSignInSuccess: onSignIn, onError: setError })
  }

  const validator = object().shape(
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
      error={(error || {}).message}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validator}
      fields={fields}
    />
  )
}

// Connect with signIn and fetchCCUser action
export default LogInForm
