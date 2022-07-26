import React from 'react';
import { View, Dimensions } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { translate } from 'react-i18next';

import { H2, P } from 'components/shared/toolBox/typography';
import { useTheme } from 'hooks/useTheme';
import { colors, themes } from 'constants/styleGuide';
import TotalSupplySvg from 'assets/svgs/TotalSupplySvg';
import StakedSvg from 'assets/svgs/StakedSvg';

import getStyles from './styles';

const { width } = Dimensions.get('window');

/**
 * @param {Object} props
 * @param {Number} props.totalSupply
 * @param {Number} props.staked
 * @param {Object[]} props.stats
 * @param {String} props.stats.label
 * @param {Number} props.stats.amount
 */

const LegendItem = ({
  styles, label, amount, t
}) => (
  <View style={styles.legend}>
    <View style={styles.legendItem}>
      <View style={[styles.legendIcon, styles[`${label}Icon`]]}></View>
      <P style={[styles[label], styles.legendLabel, styles.theme.legendLabel]}>
        <P style={[styles.legendAmount, styles.legendLabel, styles.theme.legendLabel]}>{amount} </P>
        {t(`application.stats.${label}`)}
      </P>
    </View>
  </View>
);

const BlockchainApplicationsStats = ({
  t, totalSupply, staked, stats, ...props
}) => {
  const { theme, styles } = useTheme({ styles: getStyles() });

  const widthAndHeight = width / 2.5;
  const { ultramarineBlue, ufoGreen, zodiacBlue } = colors.light;
  const sliceColor = [ultramarineBlue, ufoGreen, zodiacBlue];

  const series = [stats.registered, stats.active, stats.terminated];

  return (
    <View style={[styles.container, styles.theme.container, props.styles.container]}>
      <H2 style={[styles.title, styles.theme.title]}>{t('application.stats.title')}</H2>
      <View style={styles.chartContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          doughnut={true}
          coverRadius={0.7}
          coverFill={theme === themes.light ? colors.light.white : colors.dark.textInputBg}
        />
        <View style={styles.legend}>
          <LegendItem styles={styles} label={'registered'} amount={stats.registered} t={t} />
          <LegendItem styles={styles} label={'active'} amount={stats.active} t={t} />
          <LegendItem styles={styles} label={'terminated'} amount={stats.terminated} t={t} />
        </View>
      </View>
      <View style={[styles.card]}>
        <View>
          <P style={[styles.cardTitle]}>{t('application.stats.totalSupply')}</P>
          <P style={[styles.amount]}>{totalSupply.toLocaleString()}</P>
        </View>
        <TotalSupplySvg />
      </View>
      <View style={[styles.card, styles.staked]}>
        <View>
          <P style={[styles.cardTitle, styles.blackText]}>{t('application.stats.staked')}</P>
          <P style={[styles.amount, styles.blackText]}>{staked.toLocaleString()}</P>
        </View>
        <StakedSvg />
      </View>
    </View>
  );
};

export default translate()(BlockchainApplicationsStats);
