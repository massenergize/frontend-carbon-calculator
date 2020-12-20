import React, { useEffect, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuthState } from '../../../context/AuthContext'
import { fetchCCUser } from '../../../actions'
import { firebaseAuth } from '../../../config/firebaseConfig'

const AuthWrapper = ({ children, location }) => {
  const { authState, setAuthState } = useAuthState()
  const user = firebaseAuth.currentUser

  const getUser = useCallback(async () => {
    if (user) {
      const CCUser = await fetchCCUser(user)
      setAuthState(CCUser)
    }
  }, [setAuthState, user])

  useEffect(() => {
    getUser()
  }, [getUser])

  if (!user || !authState)
    return (
      <Redirect
        to={{
          pathname: '/auth/signin',
          state: { from: location },
        }}
      />
    )
  return children
}

export default AuthWrapper
