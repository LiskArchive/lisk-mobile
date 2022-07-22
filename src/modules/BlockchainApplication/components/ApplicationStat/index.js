import React from 'react';
import { View, Dimensions } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { translate } from 'react-i18next';

import { H2, P } from 'components/shared/toolBox/typography';
import { useTheme } from 'hooks/useTheme';
import { colors } from 'constants/styleGuide';
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

const widthAndHeight = width / 2.5;
const { ultramarineBlue, ufoGreen, zodiacBlue } = colors.light;
const sliceColor = [ultramarineBlue, ufoGreen, zodiacBlue];

const LegendItem = ({
  styles, label, amount, t
}) => (
  <View style={styles.legend}>
    <View style={styles.legendItem}>
      <View style={[styles.legendIcon, styles[`${label}Icon`]]}></View>
      <P style={[styles[label]]}>
        <P style={[styles.legendAmount]}>{amount} </P>
        {t(`application.stats.${label}`)}
      </P>
    </View>
  </View>
);

const ApplicationStats = ({
  t, totalSupply, staked, stats, ...props
}) => {
  const { styles } = useTheme({ styles: getStyles() });

  const series = [stats.registered, stats.active, stats.terminated];

  return (
    <View style={[styles.container, styles.theme.container, props.styles.container]}>
      <H2>{t('application.stats.title')}</H2>
      <View style={styles.chartContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          doughnut={true}
          coverRadius={0.7}
          coverFill={'#FFF'}
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

export default translate()(ApplicationStats);
