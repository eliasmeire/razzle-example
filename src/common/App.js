import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import universal from 'react-universal-component';
import './App.css';

const App = () => (
  <Fragment>
    <Helmet>
      <title>CN App</title>
      <meta name="description" content="Cool description about CN App" />
    </Helmet>
    <Switch>
      <Route
        exact
        path="/"
        component={universal(import('./containers/Home'))}
      />
      <Route
        exact
        path="/posts/:postId"
        component={universal(import('./containers/PostDetail'))}
      />
    </Switch>
  </Fragment>
);

export default App;
