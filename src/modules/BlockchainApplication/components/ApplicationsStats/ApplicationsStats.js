import React from 'react';
import { View, Dimensions } from 'react-native';
import PieChart from 'react-native-pie-chart';
import i18next from 'i18next';

import DataRenderer from 'components/shared/DataRenderer';
import { H2, P } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';
import { colors, themes } from 'constants/styleGuide';
import TotalSupplySvg from 'assets/svgs/TotalSupplySvg';
import StakedSvg from 'assets/svgs/StakedSvg';

import getStyles from './ApplicationsStat.styles';
import { useApplicationStatsQuery } from '../../api/useApplicationStatsQuery';
import ApplicationsStatsLegendItem from './components/ApplicationsStatsLegendItem';
import ApplicationsStatsSkeleton from './components/ApplicationsStatsSkeleton';

const { width } = Dimensions.get('window');

/**
 * @param {Object} props.style
 */
export default function ApplicationsStats(props) {
  const {
    data: statsData,
    isLoading: isLoadingStatsData,
    error: errorOnStatsData,
  } = useApplicationStatsQuery();

  const { theme, styles } = useTheme({ styles: getStyles() });

  const widthAndHeight = width / 2.5;
  const { ultramarineBlue, ufoGreen, zodiacBlue } = colors.light;
  const sliceColor = [ultramarineBlue, ufoGreen, zodiacBlue];

  return (
    <View style={[styles.container, props.styles.container]}>
      <H2 style={[styles.title, styles.theme.title]}>{i18next.t('application.stats.title')}</H2>

      <DataRenderer
        data={statsData?.data}
        isLoading={isLoadingStatsData}
        error={errorOnStatsData}
        renderData={(data) => {
          const series = [data.registered, data.active, data.terminated];

          const showPieChart = series.reduce((acc, seriesItem) => acc || !!seriesItem, false);

          return (
            <>
              <View style={styles.chartContainer}>
                {showPieChart && (
                  <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor}
                    doughnut
                    coverRadius={0.7}
                    coverFill={
                      theme === themes.light ? colors.light.white : colors.dark.textInputBg
                    }
                  />
                )}

                <View style={styles.legend}>
                  <ApplicationsStatsLegendItem label={'registered'} amount={data.registered} />
                  <ApplicationsStatsLegendItem label={'active'} amount={data.active} />
                  <ApplicationsStatsLegendItem label={'terminated'} amount={data.terminated} />
                </View>
              </View>
              <View style={[styles.card]}>
                <View style={[styles.flex]}>
                  <P style={[styles.cardTitle]}>{i18next.t('application.stats.totalSupply')}</P>

                  <P style={[styles.amount]}>{data.totalSupplyLSK.toLocaleString()} LSK</P>
                </View>

                <TotalSupplySvg />
              </View>

              <View style={[styles.card, styles.staked]}>
                <View style={[styles.flex]}>
                  <P style={[styles.cardTitle, styles.blackText]}>
                    {i18next.t('application.stats.staked')}
                  </P>

                  <P style={[styles.amount, styles.blackText]}>
                    {data.totalStakedLSK.toLocaleString()} LSK
                  </P>
                </View>

                <StakedSvg />
              </View>
            </>
          );
        }}
        renderLoading={() => <ApplicationsStatsSkeleton />}
      />
    </View>
  );
}
