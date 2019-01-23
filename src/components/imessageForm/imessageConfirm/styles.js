import {
  StyleSheet,
} from "react-native"; // eslint-disable-line
import { boxes, colors, fonts } from '../../../constants/styleGuide';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.light.white,
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    margin: boxes.boxPadding,
  },
  row: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: colors.light.gray5,
  },
  icon: {
    marginTop: 25,
  },
  rowContent: {
    paddingLeft: 13,
  },
  title: {
    fontSize: 12,
    paddingBottom: 10,
  },
  amount: {
    paddingBottom: 15,
  },
  address: {
    paddingTop: 5,
    paddingRight: 0,
    paddingBottom: 0,
  },
  button: {
    borderRadius: 2,
    marginBottom: 0,
    marginTop: 20,
  },
  label: {
    marginTop: 14,
    marginBottom: 2,
    fontFamily: fonts.family.contextLight,
    fontSize: fonts.size.input,
    fontWeight: '400',
    color: colors.light.gray1,
  },
  text: {
    flexWrap: 'wrap',
    flex: 1,
    paddingRight: 30,
    color: colors.light.black,
  },
  subtitle: {
    marginTop: 7,
  },
  addressContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: boxes.boxPadding,
    paddingBottom: boxes.boxPadding,
  },
  avatar: {
    paddingBottom: 10,
  },
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    paddingRight: 20,
    opacity: 0,
  },
  error: {
    fontFamily: fonts.family.context,
    fontSize: fonts.size.input,
    color: colors.light.gray1,
  },
  errorIcon: {
    marginRight: 5,
    color: colors.light.red,
  },
  visible: {
    opacity: 1,
  },
  description: {
    color: colors.light.gray2,
    fontFamily: fonts.family.contextSemiBold,
    marginTop: 15,
  },
  rejectButton: {
    marginHorizontal: 8,
    minWidth: 45,
    height: 45,
    borderWidth: 1,
    borderColor: colors.light.gray2,
    color: colors.light.gray2,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    paddingLeft: 0,
    borderRadius: 2,
    marginTop: 20,
    marginLeft: 0,
    marginRight: 0,
    fontSize: fonts.size.base,
    fontFamily: fonts.family.context,
    paddingTop: 10,
  },
});
