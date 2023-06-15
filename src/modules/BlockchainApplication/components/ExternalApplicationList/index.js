import React, { useEffect, useState } from 'react';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import DataRenderer from 'components/shared/DataRenderer';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import ResultScreen from 'components/screens/ResultScreen';
import EmptyExternalApplicationsIllustrationSvg from 'assets/svgs/EmptyExternalApplicationsIllustrationSvg';
import { P } from 'components/shared/toolBox/typography';
import useWalletConnectCPairings from '../../../../../libs/wcm/hooks/usePairings';
import ExternalApplicationRow from '../ExternalApplicationRow';

import getExternalApplicationListStyles from './styles';

export default function ExternalApplicationList() {
  const [isLoading, setIsLoading] = useState(true);

  const { pairings } = useWalletConnectCPairings();

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
        <ResultScreen
          illustration={<EmptyExternalApplicationsIllustrationSvg />}
          description={i18next.t('application.explore.externalApplicationList.emptyText')}
        />
      )}
    />
  );
}
