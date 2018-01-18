import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';
import './App.css';

const LoadableHome = Loadable({
  loader: () => import('./containers/Home'),
  loading: () => null
});

const LoadablePostDetail = Loadable({
  loader: () => import('./containers/PostDetail'),
  loading: () => null
});

const App = () => (
  <Fragment>
    <Helmet>
      <title>CN App</title>
      <meta name="description" content="Cool description about CN App" />
    </Helmet>
    <Switch>
      <Route exact path="/" component={LoadableHome} />
      <Route exact path="/posts/:postId" component={LoadablePostDetail} />
    </Switch>
  </Fragment>
);

export default App;
