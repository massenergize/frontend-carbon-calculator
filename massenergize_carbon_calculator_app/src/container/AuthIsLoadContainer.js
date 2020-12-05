import React from 'react'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import LoadingSpinner from '../components/LoadingSpinner'

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <LoadingSpinner />
  return children
}
export default AuthIsLoaded
