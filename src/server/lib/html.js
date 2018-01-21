import serialize from 'serialize-javascript';
import { preloadedStateWindowKey } from '../../common/constants';

export const sendHtmlResponse = (req, res) => {
  const { appMarkup, appState, helmet, chunks } = res.locals;
  const { js, styles, cssHash } = chunks;
  console.log(js);

  res.status(200).send(
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
        ${styles}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${appMarkup}</div>
        <script>
          window.${preloadedStateWindowKey} = ${serialize(appState)}
        </script>
        ${cssHash}
        ${js}
      </body>
    </html>
  `
  );
};
