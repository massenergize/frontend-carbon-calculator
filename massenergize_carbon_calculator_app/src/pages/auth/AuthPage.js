import React from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import Signin from './SignInPage'
import SignUp from './SignUpPage'
import ForgotPass from './ForgotPass'

const AuthPage = () => {
  const { path } = useRouteMatch()
  return (
    <>
      <Switch>
        <Route path={`${path}/signin`} component={Signin} />
        <Route path={`${path}/signup`} component={SignUp} />
        <Route path={`${path}/resetpass`} component={ForgotPass} />
        <Redirect to={`${path}/signin`} />
      </Switch>
    </>
  )
}

export default AuthPage
