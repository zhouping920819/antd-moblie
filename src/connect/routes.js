/**
 * routes
 *
 * landenli
 */

import React from 'react'
import { Route, Switch } from 'react-router'
import { AsyncComponentTools } from 'utils'
import Home from '../pages/Home'
import NoMatch from '../pages/NoMatch'

const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      path="/counter"
      exact
      component={AsyncComponentTools.getAsyncComponent(() =>
        import('../pages/counter')
      )}
    />
    <Route
      path="/clockRecord"
      exact
      component={AsyncComponentTools.getAsyncComponent(() =>
        import( '../pages/clock/record')
      )}
    />
    <Route component={NoMatch} />
  </Switch>
)

export default routes
