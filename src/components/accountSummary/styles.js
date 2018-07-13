import { StyleSheet, Dimensions } from 'react-native';
import styleGuide from '../../constants/styleGuide';

const { width } = Dimensions.get('window');
const styles = {
  container: {
    backgroundColor: styleGuide.colors.white,
    width: width - (2 * styleGuide.boxes.boxPadding),
    marginTop: 50,
    marginBottom: 10,
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
    padding: styleGuide.boxes.boxPadding,
    borderRadius: styleGuide.boxes.boxBorderRadius,
    shadowColor: styleGuide.colors.primary5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 15,
    shadowRadius: 20,
  },
  avatar: {
    marginTop: -60,
  },
  balance: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  unit: {
    fontSize: 16,
    color: '#000',
  },
  value: {
    fontSize: 28,
    color: '#000',
  },
  address: {
    fontSize: 20,
    color: '#ff6236',
    textAlign: 'center',
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
};

export default StyleSheet.create(styles);
