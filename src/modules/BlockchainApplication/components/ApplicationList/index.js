import React, { useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import DataRenderer from 'components/shared/DataRenderer';
import Tabs from 'components/shared/Tabs';

import { AllBlockchainApplicationsList, ExternalBlockchainApplicationsList } from './components';
import getBlockchainApplicationsListStyles from './styles';

export default function BlockchainApplicationList({
  applications,
  Component,
  onItemPress,
  style,
  ...props
}) {
  const [activeTab, setActiveTab] = useState('allApplications');

  const { styles } = useTheme({
    styles: getBlockchainApplicationsListStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container, style?.container]}>
      <DataRenderer
        data={applications.data}
        isLoading={applications.isLoading}
        error={applications.error}
        renderData={(data) => (
          <>
            <Tabs value={activeTab} onClick={(tab) => setActiveTab(tab)}>
              <Tabs.Tab value="allApplications">All applications</Tabs.Tab>
              <Tabs.Tab value="externalApplications">External connections</Tabs.Tab>
            </Tabs>

            <Tabs.Panel index="allApplications" value={activeTab}>
              <AllBlockchainApplicationsList
                applications={data}
                Component={Component}
                onItemPress={onItemPress}
                {...props}
              />
            </Tabs.Panel>

            <Tabs.Panel index="externalApplications" value={activeTab}>
              <ExternalBlockchainApplicationsList />
            </Tabs.Panel>
          </>
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
    </View>
  );
}
