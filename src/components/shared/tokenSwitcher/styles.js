import { deviceType } from 'utilities/device'

const type = deviceType()
let marginTop = type === 'iOSx' ? 5 : 7
if (type === 'android') {
  marginTop = 10
}
export default () => ({
  common: {
    title: {
      margin: 0,
    },
    button: {
      width: 30,
      height: 30,
      borderRadius: 25,
      marginRight: 15,
      marginTop,
      marginBottom: 3,
      paddingLeft: 0,
      overflow: 'visible',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iOSx: {
      marginTop: 53,
    },
    iOS: {
      marginTop: 30,
    },
    android: {
      marginTop: 4,
    },
  },
})
