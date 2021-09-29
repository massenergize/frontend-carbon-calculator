import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import BasePage from '../components/BasePage'
import routes from './routes'

export const Routes = withRouter(() => (
  <Switch>
    {routes.map(({ path, isExact = false, Component }) => (
      <Route
        key={path}
        path={path}
        exact={isExact}
        render={props => (
          <BasePage routes={routes}>
            <Component {...props} />
          </BasePage>
        )}
      />
    ))}
    <Route path="*" render={() => <div>404</div>} />
  </Switch>
))
