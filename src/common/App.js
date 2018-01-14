import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import PostDetail from './containers/PostDetail';
import { Helmet } from 'react-helmet';

const App = () => (
  <Fragment>
    <Helmet>
      <title>CN App</title>
      <meta name="description" content="Cool description about CN App" />
    </Helmet>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/posts/:postId" component={PostDetail} />
    </Switch>
  </Fragment>
);

export default App;
