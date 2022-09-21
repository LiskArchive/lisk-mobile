import React from 'react';
import { View, Dimensions } from 'react-native';
import PieChart from 'react-native-pie-chart';
import i18next from 'i18next';

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
export default function BlockchainApplicationsStats({ totalSupply, staked, stats, ...props }) {
  const { theme, styles } = useTheme({ styles: getStyles() });

  const widthAndHeight = width / 2.5;
  const { ultramarineBlue, ufoGreen, zodiacBlue } = colors.light;
  const sliceColor = [ultramarineBlue, ufoGreen, zodiacBlue];

  const series = [stats.registered, stats.active, stats.terminated];

  return (
    <View style={[styles.container, props.styles.container]}>
      <H2 style={[styles.title, styles.theme.title]}>{i18next.t('application.stats.title')}</H2>
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
          <LegendItem label={'registered'} amount={stats.registered} />
          <LegendItem label={'active'} amount={stats.active} />
          <LegendItem label={'terminated'} amount={stats.terminated} />
        </View>
      </View>
      <View style={[styles.card]}>
        <View>
          <P style={[styles.cardTitle]}>{i18next.t('application.stats.totalSupply')}</P>
          <P style={[styles.amount]}>{totalSupply.toLocaleString()}</P>
        </View>
        <TotalSupplySvg />
      </View>
      <View style={[styles.card, styles.staked]}>
        <View>
          <P style={[styles.cardTitle, styles.blackText]}>
            {i18next.t('application.stats.staked')}
          </P>
          <P style={[styles.amount, styles.blackText]}>{staked.toLocaleString()}</P>
        </View>
        <StakedSvg />
      </View>
    </View>
  );
}

function LegendItem({ label, amount }) {
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
