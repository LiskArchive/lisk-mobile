import React, { useEffect, useState } from 'react';
import { Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import DataRenderer from 'components/shared/DataRenderer';
import { P } from 'components/shared/toolBox/typography';
import usePairings from '../../../../../libs/wcm/hooks/usePairings';

import getBlockchainApplicationsListStyles from './styles';

export function AllBlockchainApplicationsList({
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
        <FlatList
          data={data}
          keyExtractor={(item) => item.chainID}
          renderItem={({ item }) => (
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

export function ExternalBlockchainApplicationsList({ style }) {
  const { pairings } = usePairings();
  const [loading, setLoading] = useState(true);

  const { styles } = useTheme({
    styles: getBlockchainApplicationsListStyles(),
  });

  useEffect(() => {
    if (Array.isArray(pairings)) {
      setLoading(false);
    }
  }, [pairings]);

  console.log({ data: pairings.slice(1), loading });

  return (
    <DataRenderer
      data={pairings.slice(1)}
      isLoading={loading}
      renderData={(data) => (
        <FlatList
          data={data}
          keyExtractor={(item) => item.topic}
          renderItem={({ item }) => <Text>name: {item.peerMetadata.name}</Text>}
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
