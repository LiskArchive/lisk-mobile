import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import Tabs from 'components/shared/Tabs';

import getBlockchainApplicationsListStyles from './styles';

export default function ApplicationList({
  applications,
  Component,
  onItemPress,
  navigation,
  style,
  ...props
}) {
  const [activeTab, setActiveTab] = useState('allApplications');

  const { styles } = useTheme({
    styles: getBlockchainApplicationsListStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container, style?.container]}>
      <View style={[styles.body, style?.body]}>
        {applications.isLoading ? (
          <P
            style={[
              styles.applicationNameLabel,
              styles.theme.applicationNameLabel,
              style?.applicationNameLabel,
            ]}
          >
            {i18next.t('application.explore.applicationList.loadingText')}
          </P>
        ) : (
          <>
            <Tabs value={activeTab} onClick={(tab) => setActiveTab(tab)}>
              <Tabs.Tab value="allApplications">All applications</Tabs.Tab>
              <Tabs.Tab value="externalApplications">External connections</Tabs.Tab>
            </Tabs>

            <Tabs.Panel index="allApplications" value={activeTab}>
              <FlatList
                data={applications.data}
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
            </Tabs.Panel>

            <Tabs.Panel index="externalApplications" value={activeTab}>
              <Text style={{ flex: 1 }}>External connections</Text>
            </Tabs.Panel>
          </>
        )}
      </View>
    </View>
  );
}
