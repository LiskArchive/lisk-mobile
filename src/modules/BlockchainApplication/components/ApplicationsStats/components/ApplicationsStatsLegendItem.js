import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { P } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';

import getStyles from '../ApplicationsStat.styles';

export default function ApplicationsStatsLegendItem({ label, amount }) {
  const { styles } = useTheme({ styles: getStyles() });

  return (
    <View style={styles.legend}>
      <View style={styles.legendItem}>
        <View style={[styles.legendIcon, styles[`${label}Icon`]]}></View>
        <P style={[styles[label], styles.legendLabel, styles.theme.legendLabel]}>
          <P style={[styles.legendAmount, styles.legendLabel, styles.theme.legendLabel]}>
            {amount}{' '}
          </P>
          {i18next.t(`application.stats.${label}`)}
        </P>
      </View>
    </View>
  );
}
