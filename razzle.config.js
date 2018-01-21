const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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

const cssChunksPluginModify = (config, { target, dev }) => {
  const newConfig = config;

  if (target === 'web') {
    const originalRuleIndex = config.module.rules.findIndex(
      rule => rule.test && new RegExp(rule.test).test('a.css')
    );

    const newRule = {
      test: /\.css$/,
      use: ExtractCssChunks.extract({
        use: [
          // {
          //   loader: 'style-loader'
          // },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              minify: !dev,
              localIdentName: dev
                ? '[name]__[local]--[hash:base64:5]'
                : '[hash:base64:5]'
            }
          }
        ]
      })
    };

    newConfig.module.rules[originalRuleIndex] = newRule;
    newConfig.plugins.unshift(
      new ExtractCssChunks({
        filename: 'static/css/[name].[contenthash:base64:5].css'
      })
    );
    newConfig.plugins.splice(
      newConfig.plugins.findIndex(
        plugin => plugin instanceof ExtractTextPlugin
      ),
      1
    );
  }

  return newConfig;
};

const statsWriterPluginModify = (config, { target }) => {
  const newConfig = config;

  if (target === 'web') {
    newConfig.plugins.push(
      new StatsWriterPlugin({
        filename: '../stats.json',
        fields: null
      })
    );
  }

  return newConfig;
};

const commonChunksModify = (config, { target, dev }, webpack) => {
  const newConfig = config;
  if (target === 'web') {
    newConfig.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        names: ['bootstrap'],
        filename: 'static/js/[name].[hash:8].js',
        minChunks: Infinity
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
    applyModifyFns(args, [
      cssChunksPluginModify,
      commonChunksModify,
      workboxModify,
      statsWriterPluginModify
    ])
};
