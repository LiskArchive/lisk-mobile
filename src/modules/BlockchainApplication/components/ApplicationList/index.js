import React from 'react';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import DataRenderer from 'components/shared/DataRenderer';
import { P } from 'components/shared/toolBox/typography';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';
import EmptyIllustrationSvg from 'assets/svgs/EmptyIllustrationSvg';
import ResultScreen from 'components/screens/ResultScreen';

import { View } from 'react-native';
import getBlockchainApplicationsListStyles from './styles';

export default function BlockchainApplicationList({
  applications,
  Component,
  onItemPress,
  style,
  ...props
}) {
  const navigation = useNavigation();

  const { styles } = useTheme({
    styles: getBlockchainApplicationsListStyles(),
  });

  return (
    <DataRenderer
      data={applications.data}
      isLoading={applications.isLoading}
      error={applications.error}
      renderData={(data) => (
        <View style={[style?.container]}>
          <InfiniteScrollList
            data={data}
            keyExtractor={(item) => item.chainID}
            renderItem={(item) => (
              <Component
                application={item}
                navigation={navigation}
                key={item.chainID}
                image={item.logo.png}
                showPinned={true}
                onPress={() => onItemPress(item)}
                {...props}
              />
            )}
          />
        </View>
      )}
      renderLoading={() => (
        <P style={[styles.text, styles.theme.text, style?.text]}>
          {i18next.t('application.explore.applicationList.loadingText')}
        </P>
      )}
      renderEmpty={() => (
        <ResultScreen
          illustration={<EmptyIllustrationSvg />}
          description="No applications available for now. Please try again later."
        />
      )}
      renderError={() => (
        <ResultScreen
          illustration={<ErrorIllustrationSvg />}
          description="Error loading applications. Please try again later."
        />
      )}
    />
  );
}
