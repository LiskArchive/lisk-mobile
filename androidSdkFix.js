const find = require('findit'); // eslint-disable-line
const fs = require('fs');

const finder = find('./node_modules');

const sdkVersion = 'compileSdkVersion 26';
const buildToolsVersion = 'buildToolsVersion "26.0.1"';

finder.on('file', (file) => {
  if (file.match(/.build.gradle/)) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw err;
      if (data.match(/compileSdkVersion\s\d+/)) {
        const newData = data.replace(/compileSdkVersion\s\d*/, sdkVersion)
          .replace(/buildToolsVersion.*"/, buildToolsVersion);
        fs.writeFileSync(file, newData, { encoding: 'utf8', flag: 'w' });
      }
    });
  }
});
