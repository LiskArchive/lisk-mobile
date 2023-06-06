/* eslint-disable max-statements */
import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'contexts/ThemeContext';

import Stepper from 'components/shared/Stepper';
import useScreenshotPrevent from 'hooks/useScreenshotPrevent';
import RecoveryPhraseQuiz from '../RecoveryPhraseQuiz/RecoveryPhraseQuiz';
import RegisterSafeKeeping from './RegisterSafeKeeping';
import PasswordSetupForm from '../PasswordSetupForm';
import { generateRecoveryPhrase } from '../../utils';

import getRegisterStyles from './Register.styles';
import RecoveryPhraseTypeSelect from './RecoveryPhraseTypeSelect/RecoveryPhraseTypeSelect';
import { RECOVERY_PHRASE_STRENGTHS_PER_WORD } from '../../constants/recoveryPhrase.constants';

export default function Register() {
  const route = useRoute();

  const [recoveryPhrase, setRecoveryPhrase] = useState();

  const [recoveryPhraseType, setRecoveryPhraseType] = useState(
    RECOVERY_PHRASE_STRENGTHS_PER_WORD['12words']
  );

  const { styles } = useTheme({
    styles: getRegisterStyles(),
  });

  const handleBackButtonAndroidPress = useCallback(() => {
    const action = route.params?.action ?? false;

    if (action && typeof action === 'function') {
      action();
      return true;
    }

    return false;
  }, [route.params?.action]);

  const handleRecoveryPhraseTypeChange = (selectedType) => {
    if (selectedType !== recoveryPhraseType) {
      setRecoveryPhraseType(selectedType);

      const newRecoveryPhrase = generateRecoveryPhrase(selectedType);

      setRecoveryPhrase(newRecoveryPhrase);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonAndroidPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButtonAndroidPress);
  }, [handleBackButtonAndroidPress]);

  useEffect(() => {
    if (route.params?.recoveryPhrase) {
      setRecoveryPhrase(route.params?.recoveryPhrase);
    } else {
      const defaultRecoveryPhrase = generateRecoveryPhrase(
        RECOVERY_PHRASE_STRENGTHS_PER_WORD['12words']
      );

      setRecoveryPhrase(defaultRecoveryPhrase);
    }
  }, [route.params?.recoveryPhrase, setRecoveryPhrase]);

  useScreenshotPrevent();

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <Stepper
        showProgressBar={false}
        customProgressLength={4}
        styles={{ container: { flex: 1, marginTop: 16 } }}
      >
        <RecoveryPhraseTypeSelect
          value={recoveryPhraseType}
          handleChange={handleRecoveryPhraseTypeChange}
        />

        <RegisterSafeKeeping showHeader recoveryPhrase={recoveryPhrase} />

        <RecoveryPhraseQuiz showHeader />

        <PasswordSetupForm hideNav />
      </Stepper>
    </SafeAreaView>
  );
}
