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

  return (
    <DataRenderer
      data={pairings.slice(1)}
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
