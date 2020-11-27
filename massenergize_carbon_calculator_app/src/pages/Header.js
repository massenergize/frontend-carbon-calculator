// Functional component imports
import React, { useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'
import { fetchUser } from '../actions'
import { useAuthState } from '../context/AuthContext'
import HeaderComponent from '../components/Header'

// Header Component
function Header() {
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const { setAuthState } = useAuthState()
  const firebase = useFirebase()
  const auth = firebase.auth()

  const getUser = useCallback(
    async user => {
      const apiUser = await fetchUser(user)
      setAuthState(apiUser)
      setLoading(false)
    },
    [setAuthState]
  )

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        setAuthState(auth.currentUser)
        setLoading(false)
      } else {
        getUser(auth.currentUser)
      }
    })
  }, [auth, getUser, loading, setAuthState])

  // Handling user sign out
  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setAuthState()
      })
  }

  const signInNav = () => {
    history.push('/auth/signin')
  }

  return (
    <HeaderComponent
      loading={loading}
      title="Carbon Saver - Learn about the impact of actions you can take."
      logoLink=""
      onSignOut={onSignOut}
      signInNav={signInNav}
      drawerRoutes={['home', 'summary', 'scoreboard', 'about']}
      // showLogin={!location.pathname.includes('/auth')}
    />
  )
}
// Connect actions to component and export it
export default Header
