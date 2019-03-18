import React from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import withTheme from '../withTheme';
import getStyles from './styles';
import { colors } from '../../constants/styleGuide';
import DropDownHolder from '../../utilities/alert';

const Alert = ({ styles }) =>
  <DropdownAlert
    wrapperStyle={{ padding: 0, paddingLeft: 10, backgroundColor: colors.light.actionRed }}
    titleStyle={styles.titleStyle}
    messageStyle={styles.messageStyle}
    errorColor={colors.light.actionRed}
    ref={ref => DropDownHolder.initialize(ref)}
    closeInterval={6000}/>;

export default withTheme(Alert, getStyles());

