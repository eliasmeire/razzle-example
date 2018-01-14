import serialize from 'serialize-javascript';
import { isProd } from './';

export const htmlDocument = ({
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
