import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import App from '../../common/App';

const clientStats = require('../../../build/stats.json');

export const renderReactMiddleware = async (req, res, next) => {
  try {
    const { store } = res.locals;
    const routerContext = {};
    const appMarkup = renderToString(
      <Provider store={store}>
        <StaticRouter context={routerContext} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    );
    const chunkNames = flushChunkNames();
    const chunks = flushChunks(clientStats, { chunkNames });
    const helmet = Helmet.renderStatic();
    const appState = store.getState();
    res.locals = { appMarkup, appState, routerContext, helmet, chunks };
  } catch (err) {
    next(err);
  }

  next();
};
