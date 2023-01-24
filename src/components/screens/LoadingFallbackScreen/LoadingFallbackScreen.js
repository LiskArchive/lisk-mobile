import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Lottie from 'lottie-react-native';

import { useTheme } from 'contexts/ThemeContext';
import Splash from 'modules/Auth/components/splash';
import { colors } from 'constants/styleGuide';

import { getLoadingFallbackScreenStyles } from './LoadingFallbackScreen.styles';

export default function LoadingFallbackScreen() {
  const { styles } = useTheme({ styles: getLoadingFallbackScreenStyles() });

  return (
    <SafeAreaView style={[styles.container]}>
      <Splash animate={false} showSimplifiedView style={{ icon: { color: colors.light.white } }} />

      <View style={[styles.animationContainer]}>
        <Lottie
          source={require('../../../assets/animations/animated-logo.json')}
          autoPlay
          loop
          style={[styles.animation]}
        />
      </View>
    </SafeAreaView>
  );
}
