import React from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPass from './ForgotPass'
import EmailSent from './EmailSent'
import { useAuthState } from '../../../context/AuthContext'

const AuthPage = () => {
  const { path } = useRouteMatch()
  const firebaseAuth = useSelector(state => state.firebase.auth)
  const { authState } = useAuthState()
  if (!firebaseAuth.isEmpty && !!authState) return <Redirect to="/events" />
  return (
    <Switch>
      <Route path={`${path}/signin`} component={SignIn} />
      <Route path={`${path}/signup`} component={SignUp} />
      <Route path={`${path}/forgotpass`} component={ForgotPass} />
      <Route path={`${path}/emailsent`} component={EmailSent} />
      <Redirect to={`${path}/signin`} />
    </Switch>
  )
}

export default AuthPage
