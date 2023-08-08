import './shim';
import './services/msw/init';
import { AppRegistry, Text } from 'react-native';
import '@walletconnect/react-native-compat';
import { name as appName } from './app.json';
import App from './src/App';

if (Text.defaultProps == null) Text.defaultProps = {};

Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
