import './shim';
import { AppRegistry, Text } from 'react-native'; // eslint-disable-line
import 'react-native-gesture-handler'; // eslint-disable-line
import App from './src/App';
import { name as appName } from './app.json';

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
