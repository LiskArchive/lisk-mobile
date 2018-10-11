import './shim';
import { AppRegistry, Text } from 'react-native'; // eslint-disable-line
import App from './src/App';

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent('Lisk', () => App);
