import { StyleSheet } from 'react-native';
import { boxes, colors } from '../../constants/styleGuide';

const styles = {
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalWrapper: {
    height: 300,
    backgroundColor: colors.white,
    paddingTop: boxes.boxPadding,
    paddingBottom: boxes.boxPadding,
    borderRadius: boxes.boxBorderRadius,
  },
  actionBar: {
    width: '100%',
    height: boxes.buttonHeight,
    padding: boxes.boxPadding,
    flexDirection: 'row',
    alignContent: 'flex-start',
    flex: 1,
  },
  button: {
    paddingRight: 10,
    paddingLeft: 10,
    height: boxes.buttonHeight,
    lineHeight: boxes.buttonHeight,
  },
  cancelButton: {
    height: boxes.borderedButtonHeight,
    backgroundColor: colors.white,
    borderRadius: boxes.buttonBorderRadius,
    borderWidth: boxes.buttonBorderRadius,
    borderColor: colors.primary3,
    color: colors.primary5,
  },
  updateButton: {
    color: colors.white,
    backgroundColor: colors.primary3,
  },
  deleteButton: {
    backgroundColor: colors.white,
    color: colors.action1,
  },
};

export default StyleSheet.create(styles);
