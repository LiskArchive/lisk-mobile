import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 2,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    padding: 6,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  },
})
