const getStyles = require('./getStyles');
const runWebpackAndCopyFilesToFinalDestination = require('./runWebpackAndCopyFilesToFinalDestination');
const saveThemeScssFile = require('./saveThemeScssFile');
const webpackConfig = require('./webpack.config');

const webpackNodeEnv = {
  'process.env.NODE_ENV': process.env.NODE_ENV || 'development',
};

module.exports = ({ cssDir, jsDir, themeFile, watch }) => {
  return getStyles(themeFile)
    .then(themeCss => saveThemeScssFile(themeCss))
    .then(() => runWebpackAndCopyFilesToFinalDestination({
      webpackConfig,
      webpackNodeEnv,
      cssDir,
      jsDir,
      watch,
    }));
};
