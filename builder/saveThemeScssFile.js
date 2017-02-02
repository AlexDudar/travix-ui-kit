const fs = require('fs');
const path = require('path');

module.exports = themeScss => new Promise((resolve, reject) => {
  fs.writeFile(path.join(__dirname, '..', 'themes', 'theme.scss'), themeScss, (err) => {
    if (err) {
      reject(err);
      return;
    }

    resolve();
  });
});
