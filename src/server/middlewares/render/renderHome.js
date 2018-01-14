import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import App from '../../../common/App';
import configureStore from '../../../common/store/configureStore';
import { fetchPosts } from '../../../common/lib/api';

export const renderHomeMiddleware = async (req, res, next) => {
  let posts = [];
  try {
    posts = await fetchPosts();
  } catch (err) {
    console.error(`Error while fetching from API`, err);
  }

  const postIds = posts.map(post => post.id);
  const postsMap = posts.reduce(
    (acc, post) => ({ ...acc, [post.id]: post }),
    {}
  );

  try {
    const preloadedState = {
      entities: {
        posts: postsMap
      },
      views: {
        overview: {
          postIds
        }
      }
    };
    const store = configureStore(preloadedState);
    const routerContext = {};
    const appMarkup = renderToString(
      <Provider store={store}>
        <StaticRouter context={routerContext} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    );
    const helmet = Helmet.renderStatic();
    const appState = store.getState();
    res.locals = { appMarkup, appState, routerContext, helmet };
  } catch (err) {
    next(err);
  }

  next();
};
