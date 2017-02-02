const fs = require('fs');
const path = require('path');
const themeBuilder = require('theme-builder');

module.exports = themeFile => new Promise((resolve, reject) => {
  const yamlFile = themeFile || path.join(__dirname, '..', 'themes', '_default.yaml');
  fs.readFile(yamlFile, (err, content) => {
    if (err) {
      reject(err);
      return;
    }

    const themeChunks = themeBuilder(content, 'scss', { prefix: 'tx' });
    resolve(themeChunks.join('\n'));
  });
});
