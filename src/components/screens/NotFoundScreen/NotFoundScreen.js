import React from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';

import ResultScreen from '../ResultScreen';
import getNotFoundStyles from './NotFoundScreen.styles';

export default function NotFoundScreen() {
  const navigation = useNavigation();

  const { styles } = useTheme({ styles: getNotFoundStyles() });

  const handleContinueClick = () => navigation.navigate('AccountsManagerScreen');

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <ResultScreen
        onContinue={handleContinueClick}
        title={i18next.t('navigation.notFound.title')}
        description={i18next.t('navigation.notFound.description')}
        continueButtonTitle={i18next.t('navigation.notFound.continueButtonText')}
        illustration={<ErrorIllustrationSvg height={80} style={styles.illustration} />}
        fluid
      />
    </SafeAreaView>
  );
}
