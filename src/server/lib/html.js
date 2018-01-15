import serialize from 'serialize-javascript';
import { isProd } from '../';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export const sendHtmlResponse = (req, res) => {
  const { appMarkup, appState, helmet } = res.locals;
  console.log(appState);
  res.status(200).send(
    generateHtmlDocument({
      appMarkup,
      appState,
      helmet,
      jsPath: assets.client.js,
      cssPath: assets.client.css
    })
  );
};

const generateHtmlDocument = ({
  cssPath,
  jsPath,
  appMarkup,
  appState,
  helmet
}) =>
  html`
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charSet='utf-8' />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${cssPath ? `<link rel="stylesheet" href="${cssPath}">` : ''}
        <script src="${jsPath}" defer${isProd ? '' : ' crossorigin'}></script>
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${appMarkup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(appState)}
        </script>
      </body>
    </html>
  `;
