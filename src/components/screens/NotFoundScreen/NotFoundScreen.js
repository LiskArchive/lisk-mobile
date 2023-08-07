import React from 'react';
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
    <ResultScreen
      onContinue={handleContinueClick}
      title={i18next.t('navigation.notFound.title')}
      description={i18next.t('navigation.notFound.description')}
      continueButtonTitle={i18next.t('navigation.notFound.continueButtonText')}
      illustration={<ErrorIllustrationSvg height={80} style={styles.illustration} />}
    />
  );
}
