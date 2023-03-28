import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import URLs from 'constants/URLs';

export default function PrivacyPolicy() {
  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      <WebView
        testID="privacy-screen"
        source={{ uri: URLs.liskPrivacyPolicy }}
        startInLoadingState={true}
      />
    </View>
  );
}
