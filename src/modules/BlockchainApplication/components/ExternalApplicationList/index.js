import React, { useEffect, useState } from 'react';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import DataRenderer from 'components/shared/DataRenderer';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import { P } from 'components/shared/toolBox/typography';
import EmptyState from 'components/shared/EmptyState';

import usePairings from '../../../../../libs/wcm/hooks/usePairings';

import getExternalApplicationListStyles from './styles';
import ExternalApplicationRow from '../ExternalApplicationRow';

export default function ExternalBlockchainApplicationsList() {
  const { pairings } = usePairings();
  const [isLoading, setIsLoading] = useState(true);

  const { styles } = useTheme({
    styles: getExternalApplicationListStyles(),
  });

  useEffect(() => {
    if (Array.isArray(pairings)) {
      setIsLoading(false);
    }
  }, [pairings]);

  const _data = [
    {
      topic: 'ae30ea15f599766496c2e59fec6cb4970f4ae1e14d3e7386af478ae05617b35f',
      relay: {
        protocol: 'iridium',
      },
      expiry: 1665832072,
      active: true,
      peerMetadata: {
        description: 'WalletConnect wallet',
        url: 'http://localhost:3000',
        icons: ['http://localhost:3000/favicon.ico'],
        name: 'WalletConnect',
      },
    },
    {
      topic: 'be30ea15f599766496c2e59fec6cb4970f4ae1e14d3e7386af478ae05617b35f',
      relay: {
        protocol: 'iridium',
      },
      expiry: 1665832072,
      active: false,
      peerMetadata: {
        description: 'Metamask wallet',
        url: 'http://localhost:3001',
        icons: ['http://localhost:3001/favicon.ico'],
        name: 'Metamask',
      },
    },
  ];

  return (
    <DataRenderer
      // data={pairings.slice(1)}
      data={_data}
      isLoading={isLoading}
      renderData={(data) => (
        <InfiniteScrollList
          data={data}
          keyExtractor={(item) => item.topic}
          renderItem={(item) => <ExternalApplicationRow application={item} />}
        />
      )}
      renderLoading={() => (
        <P style={[styles.text, styles.theme.text]}>
          {i18next.t('application.explore.externalApplicationList.loadingText')}
        </P>
      )}
      renderEmpty={() => (
        <EmptyState message={i18next.t('application.explore.externalApplicationList.emptyText')} />
      )}
    />
  );
}
