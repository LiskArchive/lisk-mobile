import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import LiskMobileLogoSvg from 'assets/svgs/LiskMobileLogoSvg';
import LiskLogoAnimation from 'assets/animations/LiskLogoAnimation';
import { colors } from 'constants/styleGuide';

import { getLoadingFallbackScreenStyles } from './LoadingFallbackScreen.styles';

/**
 * Fallback screen component for application loading state.
 */
export default function LoadingFallbackScreen() {
  const { styles } = useTheme({ styles: getLoadingFallbackScreenStyles() });

  return (
    <SafeAreaView style={[styles.container]}>
      <LiskMobileLogoSvg color={colors.light.white} />

      <View style={[styles.animationContainer]}>
        <LiskLogoAnimation variant="white" style={[styles.animation]} />
      </View>
    </SafeAreaView>
  );
}
