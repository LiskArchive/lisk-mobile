import React from 'react';
import i18next from 'i18next';

import DataRenderer from 'components/shared/DataRenderer';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import ResultScreen from 'components/screens/ResultScreen';
import EmptyExternalApplicationsIllustrationSvg from 'assets/svgs/EmptyExternalApplicationsIllustrationSvg';
import { useSession } from '../../../../../libs/wcm/hooks/useSession';
import ExternalApplicationRow from '../ExternalApplicationRow';

import ApplicationListSkeleton from '../ApplicationList/components/ApplicationListSkeleton';

export default function ExternalApplicationList() {
  const { sessions, isLoading: isLoadingSessions, error: errorOnSessions } = useSession();

  return (
    <DataRenderer
      data={sessions}
      isLoading={isLoadingSessions}
      error={errorOnSessions}
      renderData={(data) => (
        <InfiniteScrollList
          data={data}
          keyExtractor={(item) => item.topic}
          renderItem={(item) => <ExternalApplicationRow application={item} />}
        />
      )}
      renderLoading={() => <ApplicationListSkeleton />}
      renderEmpty={() => (
        <ResultScreen
          illustration={<EmptyExternalApplicationsIllustrationSvg />}
          description={i18next.t('application.explore.externalApplicationList.emptyText')}
          fluid
        />
      )}
    />
  );
}
