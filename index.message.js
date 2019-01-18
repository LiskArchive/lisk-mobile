import "./shim"; // eslint-disable-line
import {
  AppRegistry,
} from "react-native"; // eslint-disable-line
import LiskMessageExtension from './src/components/imessageForm';

AppRegistry.registerComponent(
  'LiskMessageExtension',
  () => LiskMessageExtension,
);
