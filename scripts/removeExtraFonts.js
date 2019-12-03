const fs = require('fs-extra'); // eslint-disable-line

const dir = './node_modules/react-native-vector-icons/Fonts';
fs.remove(dir)
  .then(() => console.log('react-native-vector-icon extra fonts has been deleted'))
  .catch(err => console.error(err));
