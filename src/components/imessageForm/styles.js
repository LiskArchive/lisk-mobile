import {
  StyleSheet,
} from "react-native"; // eslint-disable-line
import { colors } from '../../constants/styleGuide';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickers: {
    height: 100,
    width: 60,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  addressContainer: {
    width: '100%',
  },
  addressInput: {
    height: 48,
    paddingBottom: 10,
    paddingLeft: 40,
  },
  addressInputContainer: {
    minHeight: 48,
  },
  avatar: {
    position: 'absolute',
    zIndex: 0,
    left: 20,
    top: 41,
  },
  iconButton: {
    position: 'absolute',
    zIndex: 0,
    right: 20,
    top: 41,
    width: 34,
    height: 34,
    backgroundColor: colors.light.actionBlue,
    borderRadius: 50,
    flexDirection: 'row',
    paddingLeft: 7,
  },
  address: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
