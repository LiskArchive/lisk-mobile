import { StyleSheet, Platform, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  centerActions: {
    left: -1000,
  },
  rightActionsVisible: {
    right: 0,
  },
  leftActionsVisible: {
    left: 0,
  },
  centerActionsVisible: {
    left: DEVICE_WIDTH / 2 - 30,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 0,
    zIndex: 0,
    top: 0,
    bottom: 0,
  },
  backdrop: {
    height: DEVICE_HEIGHT,
    backgroundColor: 'rgba(12, 21, 46, 0.4)',
  },
  buttonContainer: {
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    zIndex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    right: 30,
    bottom: 0,
  },
  button: {
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    left: DEVICE_WIDTH / 2 - 28,
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
