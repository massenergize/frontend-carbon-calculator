import React from 'react'
import Form from './AuthForm'
import ForgotPassButton from './ForgotPassButton'
import AuthContainer from './AuthContainer'

const SignUp = props => (
  <AuthContainer>
    <Form
      title="Create Profile"
      submitButtonText="Sign Up"
      otherAuthOption={{
        link: '/auth/signin',
        text: 'Already have a profile',
      }}
      ForgotPassButton={ForgotPassButton}
      {...props}
    />
  </AuthContainer>
)

export default SignUp
