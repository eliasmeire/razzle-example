import { Router } from 'express';
import { renderHomeMiddleware } from './middlewares/render/renderHome';
import { renderPostMiddleware } from './middlewares/render/renderPost';
import { redirectMiddleware } from './middlewares/redirect';
import { htmlDocument } from './htmlDocument';

export const router = Router();
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const sendHtmlResponse = (req, res) => {
  const { appMarkup, appState, helmet } = res.locals;
  res.status(200).send(
    htmlDocument({
      appMarkup,
      appState,
      helmet,
      jsPath: assets.client.js,
      cssPath: assets.client.css
    })
  );
};

router.get('/', renderHomeMiddleware, redirectMiddleware, sendHtmlResponse);
router.get(
  '/posts/:postId',
  renderPostMiddleware,
  redirectMiddleware,
  sendHtmlResponse
);
