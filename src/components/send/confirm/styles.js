import { StyleSheet } from 'react-native';
import styleGuide from '../../../constants/styleGuide';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: styleGuide.boxes.boxPadding,
    marginLeft: styleGuide.boxes.boxPadding,
    paddingTop: 60,
    paddingBottom: 35,
  },
  verticalAligner: {
    padding: 20,
  },
  centerAlign: {
    textAlign: 'center',
  },
  leftAlign: {
    textAlign: 'left',
  },
  gray: {
    color: '#666',
  },
  black: {
    color: '#000',
  },
  heading: {
    fontSize: 24,
    paddingBottom: 80,
  },
  row: {
    marginBottom: 20,
  },
  title: {
    fontSize: 12,
    paddingBottom: 10,
  },
  amount: {
    paddingBottom: 15,
  },
  address: {
    fontSize: 24,
    paddingBottom: 15,
  },
  button: {
    borderRadius: 0,
    marginBottom: 0,
    marginTop: 20,
  },
  label: {
    color: '#86939e',
    marginTop: 15,
    fontSize: 14,
    marginBottom: 7,
  },
  subtitle: {
    marginTop: 20,
    color: styleGuide.colors.grayScale2,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    paddingBottom: 0,
    marginRight: 20,
  },
};

export default StyleSheet.create(styles);
