import { StyleSheet } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const styles = {
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalWrapper: {
    height: 300,
    backgroundColor: '#fff',
    paddingTop: styleGuide.boxes.boxPadding,
    paddingBottom: styleGuide.boxes.boxPadding,
    borderRadius: styleGuide.boxes.boxBorderRadius,
  },
  actionBar: {
    width: '100%',
    height: styleGuide.boxes.buttonHeight,
    padding: styleGuide.boxes.boxPadding,
    flexDirection: 'row',
    alignContent: 'flex-start',
    flex: 1,
  },
  button: {
    paddingRight: 10,
    paddingLeft: 10,
    height: styleGuide.boxes.buttonHeight,
    lineHeight: styleGuide.boxes.buttonHeight,
  },
  cancelButton: {
    height: styleGuide.boxes.borderedButtonHeight,
    backgroundColor: '#fff',
    borderRadius: styleGuide.boxes.buttonBorderRadius,
    borderWidth: styleGuide.boxes.buttonBorderRadius,
    borderColor: styleGuide.colors.primary3,
    color: styleGuide.colors.primary5,
  },
  updateButton: {
    color: '#fff',
    backgroundColor: styleGuide.colors.primary3,
  },
  deleteButton: {
    backgroundColor: '#fff',
    color: styleGuide.colors.action1,
  },
};

export default StyleSheet.create(styles);
