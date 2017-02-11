const fs = require('fs');
const path = require('path');
const saveThemeScssFile = require('./saveThemeScssFile');
const themeBuilder = require('theme-builder');

/**
 * Generates the themes/theme.scss file, based on a given YAML file.
 *
 * @function generateThemeFile
 * @param {String} yamlFile File path to a YAML file with the styles' definitions.
 * @return {Promise}
 */
function generateThemeFile(yamlFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(yamlFile, { encoding: 'utf-8' }, (err, content) => {
      if (err) {
        reject(err);
        return;
      }

      const themeChunks = themeBuilder(content, 'scss', { prefix: 'tx' });
      resolve(themeChunks.join('\n'));
    });
  }).then(saveThemeScssFile);
}

/**
 * Triggers the generation of the theme file (theme.scss)
 * and handles the watch mode.
 *
 * @module getStylesAndSaveTheme
 * @param {String}  [themeFile]      Path to a custom YAML file with styles' definitions.
 * @param {Boolean} [isWatchEnabled] Flag that enables the 'watch mode' when true. Default: false.
 * @return {Promise}
 */
module.exports = (themeFile, isWatchEnabled) => new Promise((resolve, reject) => {
  const yamlFile = themeFile || path.join(__dirname, '..', 'themes', '_default.yaml');

  if (isWatchEnabled) {
    fs.watch(yamlFile, { persistent: true }, () => {
      generateThemeFile(yamlFile).catch(reject); /** TODO: Do proper error handling on watch mode */
    });
  }

  generateThemeFile(yamlFile).then(resolve).catch(reject);
  resolve();
});
