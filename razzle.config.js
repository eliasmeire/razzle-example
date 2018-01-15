const { ReactLoadablePlugin } = require('react-loadable/webpack');
const workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  modify: (config, { target, dev }) => {
    const plugins = [];
    if (target === 'web') {
      plugins.push(
        new ReactLoadablePlugin({
          filename: './build/react-loadable.json'
        })
      );

      if (!dev) {
        plugins.push(
          new workboxPlugin({
            globDirectory: './build/public',
            globPatterns: ['**/*.{html,js,css,svg}'],
            swDest: './build/public/sw.js',
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
              {
                urlPattern: new RegExp('https://jsonplaceholder.typicode.com/'),
                handler: 'staleWhileRevalidate'
              },
              {
                urlPattern: new RegExp('http://localhost:3000/'),
                handler: 'staleWhileRevalidate'
              }
            ]
          })
        );
      }
    }

    return {
      ...config,
      plugins: [...config.plugins, ...plugins]
    };
  }
};
