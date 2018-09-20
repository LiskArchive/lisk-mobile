import './shim';
import { AppRegistry, Text } from 'react-native'; // eslint-disable-line
import App from './src/App';

Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent('Lisk', () => App);
