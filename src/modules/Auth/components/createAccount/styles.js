import { StyleSheet } from 'react-native'
import { colors } from 'constants/styleGuide'

const styles = {
  container: {
    height: '100%',
  },
  linkWrapper: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  question: {
    color: colors.light.slateGray,
    textAlign: 'center',
    marginRight: 4,
    marginBottom: 5,
  },
  link: {
    color: colors.light.ultramarineBlue,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}

export default StyleSheet.create(styles)
