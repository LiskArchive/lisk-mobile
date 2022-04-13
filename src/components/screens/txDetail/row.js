import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { colors } from 'constants/styleGuide';
import withTheme from '../../shared/withTheme';
import { P } from '../../shared/toolBox/typography';
import Icon from '../../shared/toolBox/icon';
import getStyles from './styles';

const Row = ({
  styles, theme, t, icon, title, children, style
}) => (
  <View style={[styles.detailRow, styles.theme.detailRow]}>
    {icon && (
      <View style={styles.rowIconWrapper}>
        <Icon name={icon} size={20} style={styles.rowIcon} color={colors[theme].blueGray} />
      </View>
    )}
    <View style={styles.rowContent}>
      <P style={[styles.label, styles.theme.label]}>{t(title)}</P>
      <View style={[styles.valueContainer, style]}>{children}</View>
    </View>
  </View>
);

export default withTheme(translate()(Row), getStyles());
