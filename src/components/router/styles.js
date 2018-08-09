import { StyleSheet, Platform } from 'react-native';
import { Header } from 'react-navigation';
import styleGuide from '../../constants/styleGuide';

const styles = {
  iconButton: {
    width: 60,
    height: 30,
    paddingLeft: styleGuide.boxes.elementPadding,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: (Platform.OS === 'ios') ? 6 : Math.floor((Header.HEIGHT - 30) / 2),
  },
  iconButtonTitle: {
    color: styleGuide.colors.primary9,
    lineHeight: 18,
  },
};

export default StyleSheet.create(styles);
