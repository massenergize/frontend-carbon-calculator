// Functional component imports
import React, { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { isLoaded, useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { fetchUser } from '../actions'
import { useAuthState } from '../context/AuthContext'
import HeaderComponent from '../components/Header'

// Header Component
function Header() {
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const location = useLocation()

  const toggleDrawer = value => () => {
    setIsOpen(value)
  }

  const { setAuthState } = useAuthState()
  const firebase = useFirebase()
  const auth = useSelector(state => state.auth)

  const getUser = useCallback(
    async user => {
      const apiUser = await fetchUser(user)
      setAuthState(apiUser)
      setLoading(false)
    },
    [setAuthState]
  )

  useEffect(() => {
    if (isLoaded(auth) && auth) {
      getUser(auth)
    }
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        setAuthState(user)
        setLoading(false)
      } else {
        getUser(user)
      }
    })
  }, [auth, firebase, getUser, loading, setAuthState])

  // Handling user sign out
  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setAuthState()
      })
  }

  return (
    <HeaderComponent
      loading={loading}
      title="Carbon Saver"
      logoLink=""
      onSignOut={onSignOut}
      drawerRoutes={['home', 'summary', 'scoreboard', 'about']}
      isDrawerOpen={isOpen}
      toggleDrawer={toggleDrawer}
      showLogin={!location.pathname.includes('/auth')}
    />
  )
}
// Connect actions to component and export it
export default Header
