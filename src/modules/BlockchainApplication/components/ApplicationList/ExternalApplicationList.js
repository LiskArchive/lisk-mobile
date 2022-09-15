import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import DataRenderer from 'components/shared/DataRenderer';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import { P } from 'components/shared/toolBox/typography';
import EmptyState from 'components/shared/EmptyState';
import usePairings from '../../../../../libs/wcm/hooks/usePairings';

import getBlockchainApplicationsListStyles from './styles';

export default function ExternalBlockchainApplicationsList({ style }) {
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

  return (
    <DataRenderer
      data={pairings.slice(1)}
      isLoading={loading}
      renderData={(data) => (
        <InfiniteScrollList
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
      renderEmpty={() => <EmptyState message={'You do not have external connections yet.'} />}
    />
  );
}
