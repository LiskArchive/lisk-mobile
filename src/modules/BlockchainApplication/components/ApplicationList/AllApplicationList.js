import React from 'react';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import DataRenderer from 'components/shared/DataRenderer';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import { P } from 'components/shared/toolBox/typography';

import getBlockchainApplicationsListStyles from './styles';

export default function AllBlockchainApplicationsList({
  applications,
  Component,
  onItemPress,
  style,
  ...props
}) {
  const navigation = useNavigation;

  const { styles } = useTheme({
    styles: getBlockchainApplicationsListStyles(),
  });

  return (
    <DataRenderer
      data={applications.data}
      isLoading={applications.isLoading}
      error={applications.error}
      renderData={(data) => (
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
      )}
      renderLoading={() => (
        <P
          style={[
            styles.applicationNameLabel,
            styles.theme.applicationNameLabel,
            style?.applicationNameLabel,
          ]}
        >
          {i18next.t('application.explore.applicationList.loadingText')}
        </P>
      )}
    />
  );
}
