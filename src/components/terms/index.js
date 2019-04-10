import React from 'react';
import { View, WebView } from 'react-native';

const Terms = () => (
  <View style={{ flex: 1, overflow: 'hidden' }}>
    <WebView
      source={{ uri: 'https://lisk.io/terms-conditions' }}
      style={{
        marginTop: -100,
      }}
      startInLoadingState={true}
    />
  </View>
);

export default Terms;
