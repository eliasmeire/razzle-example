import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import App from '../../../common/App';
import configureStore from '../../../common/store/configureStore';
import { fetchPost } from '../../../common/lib/api';

export const renderPostMiddleware = async (req, res, next) => {
  const { postId } = req.params;
  let post = {};
  try {
    post = await fetchPost(postId);
  } catch (err) {
    console.error(`Error while fetching from API`, err);
  }

  try {
    const preloadedState = {
      entities: {
        posts: {
          [postId]: post
        }
      },
      views: {
        detail: {
          postId
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
