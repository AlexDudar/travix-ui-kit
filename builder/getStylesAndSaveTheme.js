const fs = require('fs');
const path = require('path');
const saveThemeScssFile = require('./saveThemeScssFile');
const themeBuilder = require('theme-builder');

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
