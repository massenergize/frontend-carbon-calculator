import React, { useCallback, useEffect } from 'react'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import EventItem from './events/EventItem'
import { useAuthState } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { fetchUser } from '../actions'

const HomePage = () => {
  const firebaseAuth = useSelector(({ firebase: { auth } }) => auth)
  const { setAuthState } = useAuthState()

  const getUser = useCallback(async () => {
    if (!isEmpty(firebaseAuth)) {
      const CCUser = await fetchUser(firebaseAuth)
      setAuthState(CCUser)
    }
  }, [firebaseAuth, setAuthState])

  useEffect(() => {
    getUser()
  }, [getUser])

  if (!isLoaded(firebaseAuth)) return <LoadingSpinner />

  return (
    <Grid item xs={12}>
      {!isEmpty(firebaseAuth) ? (
        <EventItem />
      ) : (
        <Redirect
          to={{
            pathname: '/auth/signin',
          }}
        />
      )}
    </Grid>
  )
}
export default HomePage
