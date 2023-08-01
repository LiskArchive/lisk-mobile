import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import i18next from 'i18next';

import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import DataRenderer from 'components/shared/DataRenderer';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';
import EmptyApplicationsIllustrationSvg from 'assets/svgs/EmptyApplicationsIllustrationSvg';
import ResultScreen from 'components/screens/ResultScreen';

import ApplicationListSkeleton from './components/ApplicationListSkeleton';

export default function ApplicationList({
  applications,
  Component,
  onItemPress,
  renderError,
  renderEmpty,
  style,
  navigation,
  ...props
}) {
  const handleRenderEmpty =
    renderEmpty ||
    (() => (
      <ResultScreen
        illustration={<EmptyApplicationsIllustrationSvg />}
        description={i18next.t('application.explore.applicationList.emptyText')}
      />
    ));

  const handleRenderError =
    renderError ||
    (() => (
      <ResultScreen
        illustration={<ErrorIllustrationSvg />}
        description={i18next.t('application.explore.applicationList.errorText')}
      />
    ));

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
            fetchNextPage={applications.fetchNextPage}
            hasNextPage={applications.fetchNextPage}
            isFetchingNextPage={applications.isFetchingNextPage}
            ListFooterComponent={<View style={{ height: 120 }} />}
            Spinner={<ActivityIndicator style={{ marginTop: 20, marginBottom: 100 }} />}
          />
        </View>
      )}
      renderLoading={() => <ApplicationListSkeleton style={[style?.container]} />}
      renderEmpty={handleRenderEmpty}
      renderError={handleRenderError}
    />
  );
}
