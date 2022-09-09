import { colors } from 'constants/styleGuide'
import { Dimensions } from 'react-native'

export function getNavigationTabBarStyles() {
  const deviceWidth = Dimensions.get('window').width
  const width = deviceWidth - 44
  const left = deviceWidth / 2 - width / 2

  return {
    position: 'absolute',
    width,
    left,
    backgroundColor: colors.light.ultramarineBlue,
    bottom: 24,
    borderRadius: 64,
    height: 64,
    paddingTop: 28,
  }
}
