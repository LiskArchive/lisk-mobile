import React from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { H4, P, B } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';

import { RECOVERY_PHRASE_STRENGTHS_PER_WORD } from '../../../constants/recoveryPhrase.constants';
import getRecoveryPhraseTypeSelectStyles from './RecoveryPhraseTypeSelect.styles';

export default function RecoveryPhraseTypeSelect({
  value,
  handleChange,
  nextStep,
  currentIndex,
  length,
}) {
  const navigation = useNavigation();

  const { styles } = useTheme({
    styles: getRecoveryPhraseTypeSelectStyles(),
  });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton
        title={'auth.register.title'}
        onPress={navigation.goBack}
        withProgressBar
        currentIndex={currentIndex}
        length={length}
      />

      <View style={[styles.body]}>
        <H4 style={[styles.title, styles.theme.title]}>
          {i18next.t('auth.register.recoveryPhraseType.title')}
        </H4>

        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('auth.register.recoveryPhraseType.description')}
        </P>

        <TouchableOpacity
          onPress={() => handleChange(RECOVERY_PHRASE_STRENGTHS_PER_WORD['12words'])}
          style={[
            styles.optionButton,
            value === RECOVERY_PHRASE_STRENGTHS_PER_WORD['12words'] && styles.activeOptionButton,
          ]}
        >
          <View style={[styles.optionHeader]}>
            <B style={[styles.optionTitle, styles.theme.optionTitle]}>
              {i18next.t('auth.register.recoveryPhraseType.12wordsOptionTitle')}
            </B>

            <P style={[styles.optionDescription, styles.theme.optionDescription]}>
              {i18next.t('auth.register.recoveryPhraseType.12wordsOptionDescription')}
            </P>
          </View>

          <View
            style={[
              styles.optionCircle,
              value === RECOVERY_PHRASE_STRENGTHS_PER_WORD['12words'] && styles.activeOptionCircle,
            ]}
          >
            <View style={[styles.optionInnerCircle]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleChange(RECOVERY_PHRASE_STRENGTHS_PER_WORD['24words'])}
          style={[
            styles.optionButton,
            value === RECOVERY_PHRASE_STRENGTHS_PER_WORD['24words'] && styles.activeOptionButton,
          ]}
        >
          <View style={[styles.optionHeader]}>
            <B style={[styles.optionTitle, styles.theme.optionTitle]}>
              {i18next.t('auth.register.recoveryPhraseType.24wordsOptionTitle')}
            </B>

            <P style={[styles.optionDescription, styles.theme.optionDescription]}>
              {i18next.t('auth.register.recoveryPhraseType.24wordsOptionDescription')}
            </P>
          </View>

          <View
            style={[
              styles.optionCircle,
              value === RECOVERY_PHRASE_STRENGTHS_PER_WORD['24words'] && styles.activeOptionCircle,
            ]}
          >
            <View style={[styles.optionInnerCircle]} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={[styles.footer]}>
        <PrimaryButton onPress={nextStep} disabled={!value} style={styles.button}>
          {i18next.t('commons.buttons.continue')}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
