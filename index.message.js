import "./shim"; // eslint-disable-line
import {
  AppRegistry,
} from "react-native"; // eslint-disable-line
import LiskMessageExtension from './src/components/imessage';

AppRegistry.registerComponent(
  'LiskMessageExtension',
  () => LiskMessageExtension,
);
