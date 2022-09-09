import { Dimensions } from 'react-native'

export default function getAccountsManagerModalStyles() {
  return {
    common: {
      container: {
        height: Dimensions.get('window').height / 1.8,
      },
      footer: {
        marginBottom: 16,
      },
    },
  }
}
