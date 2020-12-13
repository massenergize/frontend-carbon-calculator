import React, { useState } from 'react'
import { sendEmailVerification } from '../../../actions/firebaseAuth'
import Component from '../../../components/auth/EmailSent'

const EmailSent = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  return (
    <Component
      onClick={() => {
        sendEmailVerification({ setLoading, setError })
      }}
      status={error}
      loading={loading}
    />
  )
}

export default EmailSent
