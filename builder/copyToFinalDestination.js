const fs = require('fs');
const path = require('path');

module.exports = ({ originalPath, finalPath }) => new Promise((resolve, reject) => {
  if (!finalPath) {
    resolve();
    return;
  }

  const copyTo = path.join(finalPath, path.basename(originalPath));
  fs.readFile(originalPath, (readErr, content) => {
    if (readErr) {
      reject(readErr);
      return;
    }

    fs.writeFile(copyTo, content, (writeErr) => {
      if (writeErr) {
        reject(writeErr);
        return;
      }

      resolve();
    });
  });
});
