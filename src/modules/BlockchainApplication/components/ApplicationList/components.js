import React from 'react';
import { Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function AllBlockchainApplicationsList({ applications, Component, onItemPress, ...props }) {
  const navigation = useNavigation;

  return (
    <FlatList
      data={applications}
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
  );
}

export function ExternalBlockchainApplicationsList() {
  return <Text style={{ flex: 1 }}>External connections</Text>;
}
