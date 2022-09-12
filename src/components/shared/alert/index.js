import React from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import { colors } from 'constants/styleGuide';
import DropDownHolder from 'utilities/alert';
import withTheme from '../withTheme';
import getStyles from './styles';

const Alert = ({ styles }) => (
  <DropdownAlert
    wrapperStyle={{
      padding: 0,
      paddingLeft: 10,
      backgroundColor: colors.light.burntSieanna,
    }}
    titleStyle={styles.titleStyle}
    messageStyle={styles.messageStyle}
    errorColor={colors.light.burntSieanna}
    ref={(ref) => DropDownHolder.initialize(ref)}
    closeInterval={2000}
  />
);

export default withTheme(Alert, getStyles());
