import { StyleSheet } from 'react-native'
import { colors } from 'constants/styleGuide'

const styles = {
  wrapper: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    marginRight: 20,
    marginLeft: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 8,
    paddingBottom: 8,
  },
  subTitle: {
    color: colors.light.slateGray,
    textAlign: 'center',
    marginTop: 30,
  },
  imageContainer: {
    marginTop: 52,
    alignItems: 'center',
  },
  image: {
    width: 305,
    height: 340,
  },
  button: {
    marginBottom: 20,
  },
}

export default StyleSheet.create(styles)
