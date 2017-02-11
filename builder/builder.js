const getStylesAndSaveTheme = require('./getStylesAndSaveTheme');
const runWebpackAndCopyFilesToFinalDestination = require('./runWebpackAndCopyFilesToFinalDestination');
const webpackConfig = require('./webpack.config');

const webpackNodeEnv = {
  'process.env.NODE_ENV': process.env.NODE_ENV || 'development',
};

module.exports = ({ cssDir, jsDir, themeFile, watch }) => {
  return getStylesAndSaveTheme(themeFile, watch)
    .then(runWebpackAndCopyFilesToFinalDestination({
      webpackConfig,
      webpackNodeEnv,
      cssDir,
      jsDir,
      watch,
    }));
};
