import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import URLs from 'constants/URLs';

const Terms = () => (
  <View style={{ flex: 1, overflow: 'hidden' }}>
    <WebView
      source={{ uri: URLs.liskTermsAndConditions }}
      startInLoadingState={true}
    />
  </View>
);

export default Terms;
