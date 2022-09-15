import React, { useState } from 'react';
import { View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import Tabs from 'components/shared/Tabs';

import AllBlockchainApplicationsList from './AllApplicationList';
import ExternalBlockchainApplicationsList from './ExternalApplicationList';
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
      <Tabs value={activeTab} onClick={(tab) => setActiveTab(tab)}>
        <Tabs.Tab value="allApplications">All applications</Tabs.Tab>
        <Tabs.Tab value="externalApplications">External connections</Tabs.Tab>
      </Tabs>

      <Tabs.Panel index="allApplications" value={activeTab}>
        <AllBlockchainApplicationsList
          applications={applications}
          Component={Component}
          onItemPress={onItemPress}
          style={style}
          {...props}
        />
      </Tabs.Panel>

      <Tabs.Panel index="externalApplications" value={activeTab}>
        <ExternalBlockchainApplicationsList style={style} />
      </Tabs.Panel>
    </View>
  );
}
