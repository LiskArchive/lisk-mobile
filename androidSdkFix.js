const find = require('findit'); // eslint-disable-line
const fs = require('fs');

const finder = find('./node_modules');

const sdkVersion = 'compileSdkVersion 27';
const buildToolsVersion = 'buildToolsVersion "27.0.3"';

finder.on('file', (file) => {
  if (file.match(/.build.gradle/)) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw err;
      if (data.match(/compileSdkVersion\s\d+/)) {
        const newData = data
          .replace(/compileSdkVersion\s\d*/, sdkVersion)
          .replace(/targetSdkVersion\s\d*/, sdkVersion)
          .replace(/buildToolsVersion.*('|")/, buildToolsVersion)
          .replace(/compile\s/g, 'implementation ');
        fs.writeFileSync(file, newData, { encoding: 'utf8', flag: 'w' });
      }
    });
  }
});
