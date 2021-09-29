import React from 'react'
import Form from './AuthForm'
import ForgotPassButton from './ForgotPassButton'
import AuthContainer from './AuthContainer'

const SignIn = props => (
  <AuthContainer>
    <Form
      title="Please Enter Your Email and Password to Continue"
      submitButtonText="Sign In"
      otherAuthOption={{ link: '/auth/signup', text: 'Create a profile' }}
      ForgotPassButton={ForgotPassButton}
      {...props}
    />
  </AuthContainer>
)

export default SignIn
