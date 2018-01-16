const { ReactLoadablePlugin } = require('react-loadable/webpack');
const workboxPlugin = require('workbox-webpack-plugin');

const workboxModify = (config, { target, dev }) => {
  const newConfig = config;

  if (target === 'web' && !dev) {
    newConfig.plugins.push(
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

  return newConfig;
};

const reactLoadableModify = (config, { target }) => {
  const newConfig = config;

  if (target === 'web') {
    newConfig.plugins.push(
      new ReactLoadablePlugin({
        filename: './build/react-loadable.json'
      })
    );
  }

  return newConfig;
};

const commonChunksModify = (config, { target, dev }, webpack) => {
  const newConfig = config;

  if (target === 'web') {
    newConfig.output.filename = dev
      ? 'static/js/[name].js'
      : 'static/js/[name].[hash:8].js';

    newConfig.entry.vendor = [
      require.resolve('razzle/polyfills'),
      require.resolve('react'),
      require.resolve('react-dom'),
      require.resolve('react-router-dom'),
      require.resolve('redux'),
      require.resolve('axios')
      // ... add any other vendor packages with require.resolve('xxx')
    ];

    newConfig.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
        minChunks: Infinity
      })
    );

    // Extract common modules from all the chunks (requires no 'name' property)
    newConfig.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        async: true,
        children: true,
        minChunks: 2
      })
    );
  }

  return newConfig;
};

const applyModifyFns = (args, modifyFns) => {
  const argsExceptConfig = args.slice(1);
  return modifyFns.reduce((config, modifyFn) => {
    return modifyFn(config, ...argsExceptConfig);
  }, args[0]);
};

module.exports = {
  modify: (...args) =>
    applyModifyFns(args, [workboxModify, reactLoadableModify])
};
