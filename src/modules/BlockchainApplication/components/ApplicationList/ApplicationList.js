import React from 'react';
import { useNavigation } from '@react-navigation/native';

import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import DataRenderer from 'components/shared/DataRenderer';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';
import EmptyIllustrationSvg from 'assets/svgs/EmptyIllustrationSvg';
import ResultScreen from 'components/screens/ResultScreen';

import { View } from 'react-native';
import ApplicationListSkeleton from './components/ApplicationListSkeleton';

export default function ApplicationList({ applications, Component, onItemPress, style, ...props }) {
  const navigation = useNavigation();

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
              // TODO: Integrate pagination props.
              // (details on https://github.com/LiskHQ/lisk-mobile/issues/1611).
            )}
          />
        </View>
      )}
      renderLoading={() => <ApplicationListSkeleton style={[style?.container]} />}
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
