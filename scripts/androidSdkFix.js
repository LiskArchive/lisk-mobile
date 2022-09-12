const find = require('findit'); // eslint-disable-line
const fs = require('fs');

const finder = find('./node_modules');

const sdkVersion = 'compileSdkVersion 30';
const buildToolsVersion = 'buildToolsVersion "29.0.2"';

finder.on('file', (file) => {
  if (file.match(/.build.gradle/)) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw err;
      let newData = '';
      newData = data.replace(/compile\s/g, 'implementation ');
      if (data.match(/compileSdkVersion\s\d+/) && !data.match(/safeExtGet*/)) {
        newData = newData
          .replace(/compileSdkVersion\s\d*/, sdkVersion)
          .replace(/targetSdkVersion\s\d*/, sdkVersion)
          .replace(/buildToolsVersion.*('|")/, buildToolsVersion);
        console.log(`overwriting SdkVersion or ToolsVersion in ${file} `);
      }
      fs.writeFileSync(file, newData, { encoding: 'utf8', flag: 'w' });
    });
  }
});
