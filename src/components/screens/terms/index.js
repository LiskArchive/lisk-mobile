import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import URLs from '../../../constants/URLs';

const Terms = () => (
  <View style={{ flex: 1, overflow: 'hidden' }}>
    <WebView
      source={{ uri: URLs.liskPrivacyPolicy }}
      style={{
        marginTop: -20,
      }}
      startInLoadingState={true}
    />
  </View>
);

export default Terms;
