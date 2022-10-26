import React from 'react';
import { View, Dimensions } from 'react-native';
import PieChart from 'react-native-pie-chart';
import i18next from 'i18next';

import DataRenderer from 'components/shared/DataRenderer';
import { H2, P } from 'components/shared/toolBox/typography';
import { useTheme } from 'hooks/useTheme';
import { colors, themes } from 'constants/styleGuide';
import TotalSupplySvg from 'assets/svgs/TotalSupplySvg';
import StakedSvg from 'assets/svgs/StakedSvg';

import getStyles from './styles';
import { useBlockchainApplicationStats } from '../../hooks/useBlockchainApplicationStats';

const { width } = Dimensions.get('window');

/**
 * @param {Object} props.style
 */
export default function BlockchainApplicationsStats(props) {
  const {
    data: statsData,
    isLoading: isLoadingStatsData,
    error: errorOnStatsData,
  } = useBlockchainApplicationStats();

  const { theme, styles } = useTheme({ styles: getStyles() });

  const widthAndHeight = width / 2.5;
  const { ultramarineBlue, ufoGreen, zodiacBlue } = colors.light;
  const sliceColor = [ultramarineBlue, ufoGreen, zodiacBlue];

  return (
    <DataRenderer
      data={statsData?.data}
      isLoading={isLoadingStatsData}
      error={errorOnStatsData}
      renderData={(data) => {
        const series = [data.registered, data.active, data.terminated];

        const showPieChart = series.reduce((acc, seriesItem) => acc || !!seriesItem, false);

        return (
          <View style={[styles.container, props.styles.container]}>
            <H2 style={[styles.title, styles.theme.title]}>
              {i18next.t('application.stats.title')}
            </H2>

            <View style={styles.chartContainer}>
              {showPieChart && (
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  sliceColor={sliceColor}
                  doughnut
                  coverRadius={0.7}
                  coverFill={theme === themes.light ? colors.light.white : colors.dark.textInputBg}
                />
              )}

              <View style={styles.legend}>
                <LegendItem label={'registered'} amount={data.registered} />
                <LegendItem label={'active'} amount={data.active} />
                <LegendItem label={'terminated'} amount={data.terminated} />
              </View>
            </View>
            <View style={[styles.card]}>
              <View>
                <P style={[styles.cardTitle]}>{i18next.t('application.stats.totalSupply')}</P>
                <P style={[styles.amount]}>{data.totalSupplyLSK.toLocaleString()}</P>
              </View>
              <TotalSupplySvg />
            </View>
            <View style={[styles.card, styles.staked]}>
              <View>
                <P style={[styles.cardTitle, styles.blackText]}>
                  {i18next.t('application.stats.staked')}
                </P>
                <P style={[styles.amount, styles.blackText]}>{data.stakedLSK.toLocaleString()}</P>
              </View>
              <StakedSvg />
            </View>
          </View>
        );
      }}
    />
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
