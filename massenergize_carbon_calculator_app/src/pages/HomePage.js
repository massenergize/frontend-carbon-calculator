import React, { useCallback, useEffect } from 'react'
import { isEmpty } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import EventItem from './events/EventItem'
import { useAuthState } from '../context/AuthContext'
import { fetchUser } from '../actions'
import AuthIsLoaded from '../container/AuthIsLoadContainer'

const HomePage = () => {
  const firebaseAuth = useSelector(({ firebase: { auth } }) => auth)
  const { authState, setAuthState } = useAuthState()

  const getUser = useCallback(async () => {
    if (!isEmpty(firebaseAuth)) {
      const CCUser = await fetchUser(firebaseAuth)
      setAuthState(CCUser)
    }
  }, [firebaseAuth, setAuthState])

  useEffect(() => {
    getUser()
  }, [getUser])
  return (
    <AuthIsLoaded>
      <Grid item xs={12}>
        {!firebaseAuth.isEmpty && authState ? (
          <EventItem />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/signin',
            }}
          />
        )}
      </Grid>
    </AuthIsLoaded>
  )
}
export default HomePage
