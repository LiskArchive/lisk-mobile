import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import withTheme from '../withTheme';
import { P } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import getStyles from './styles';
import { colors } from '../../constants/styleGuide';

const Row = ({
  styles, theme, t, icon, title, children,
}) => (
  <View style={[styles.detailRow, styles.theme.detailRow]}>
    <View style={styles.rowIconWrapper}>
      <Icon
        name={icon}
        size={22}
        style={styles.rowIcon}
        color={colors[theme].gray2}
      />
    </View>
    <View style={styles.rowContent}>
      <P style={[styles.label, styles.theme.label]}>{t(title)}</P>
      <View style={styles.valueContainer}>
        {children}
      </View>
    </View>
  </View>
);

export default withTheme(translate()(Row), getStyles());
