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
    borderColor: '#17499b',
    color: '#3c7fb4',
  },
  updateButton: {
    color: '#fff',
    backgroundColor: '#17499b',
  },
  deleteButton: {
    backgroundColor: '#fff',
    color: '#da1d00',
  },
};

export default StyleSheet.create(styles);
