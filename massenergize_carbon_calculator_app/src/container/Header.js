// Functional component imports
import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { fetchCCUser, signOut } from '../actions'
import { useAuthState } from '../context/AuthContext'
import HeaderComponent from '../components/Header'
import { firebaseAuth } from '../config/firebaseConfig'

// Header Component
function Header({ routes }) {
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const location = useLocation()

  const toggleDrawer = value => () => {
    setIsOpen(value)
  }

  const { setAuthState } = useAuthState()
  const firebase = useFirebase()
  const auth = useSelector(state => state.auth)
  const user = firebaseAuth.currentUser

  const getUser = useCallback(async () => {
    const apiUser = await fetchCCUser(user)
    setAuthState(apiUser)
    setLoading(false)
  }, [setAuthState, user])

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(() => {
      if (user && user.emailVerified) {
        getUser(user)
      } else {
        setAuthState()
        setLoading(false)
      }
    })
  }, [auth, firebase, getUser, loading, setAuthState, user])

  // Handling user sign out
  const onSignOut = () => {
    signOut()
    setAuthState(null)
    firebaseAuth.signOut()
  }

  return (
    <HeaderComponent
      loading={loading}
      title="Carbon Saver"
      logoLink=""
      onSignOut={onSignOut}
      routes={routes}
      isDrawerOpen={isOpen}
      toggleDrawer={toggleDrawer}
      showLogin={!location.pathname.includes('/auth')}
    />
  )
}
// Connect actions to component and export it
Header.propTypes = {
  routes: PropTypes.array,
}
export default Header
