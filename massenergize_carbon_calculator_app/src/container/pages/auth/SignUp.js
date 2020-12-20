// Functional components import
import React from 'react'
import { Redirect } from 'react-router-dom'
import { isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
// Styling components import
import { object } from 'yup'
import Component from '../../../components/auth/SignUp'
import BasicInfo from './BasicInfo'
import { useAuthState } from '../../../context/AuthContext'
import { firebaseSignUp } from '../../../actions/firebaseAuth'
import { signUpFields as fields } from '../../fields'
import { fetchCCUser } from '../../../actions'

const SignUpPage = () => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)
  const auth = useSelector(state => state.firebase.auth)
  const { authState, setAuthState } = useAuthState()

  // On Submit Handler
  const onSignUp = async authRes => {
    try {
      const user = await fetchCCUser(authRes.user)
      if (!user) {
        throw new Error('User Register Error')
      } else {
        setAuthState(user)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = values => {
    setLoading(true)
    firebaseSignUp(values, { onAuthSuccess: onSignUp, onError: setError })
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

  if (!authState && !isEmpty(auth) && !auth.emailVerified) {
    return <Redirect to="/auth/emailsent" />
  }
  if (!authState && !isEmpty(auth) && auth.emailVerified) {
    return <BasicInfo />
  }
  // Prompt user enter authentication info
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
// connect action and styling to current component
export default SignUpPage
