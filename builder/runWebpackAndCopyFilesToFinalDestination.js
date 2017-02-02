const moveToFinalDestination = require('./copyToFinalDestination');
const path = require('path');
const webpack = require('webpack');

module.exports = ({ webpackConfig, webpackNodeEnv, cssDir, jsDir, watch }) => new Promise((resolve, reject) => {
  webpackConfig.plugins.push(new webpack.DefinePlugin(webpackNodeEnv));
  webpackConfig.context = __dirname;

  const runner = webpack(webpackConfig);
  const runnerFn = watch ? runner.watch.bind(runner, {}) : runner.run.bind(runner);

  runnerFn((err, stats) => {
    if (err) {
      reject(err);
      return;
    }

    moveToFinalDestination({
      finalPath: jsDir,
      originalPath: path.join(webpackConfig.output.path, 'ui-bundle.js'),
    }).then(() => moveToFinalDestination({
      finalPath: cssDir,
      originalPath: path.join(webpackConfig.output.path, 'ui-bundle.css'),
    })).then(() => {
      if (!watch) {
        resolve(stats);
      }
    }).catch(reject);
  });
});
