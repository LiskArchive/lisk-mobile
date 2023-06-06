import React from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { H4, P, B } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';

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
        <H4 style={[styles.title, styles.theme.title]}>Select phrase type</H4>

        <P style={[styles.description, styles.theme.description]}>Pending explanation.</P>

        <TouchableOpacity
          onPress={() => handleChange(12)}
          style={[styles.optionButton, value === 12 && styles.activeOptionButton]}
        >
          <View style={[styles.optionHeader]}>
            <B style={[styles.optionTitle, styles.theme.optionTitle]}>12 word recovery phrase</B>

            <P style={[styles.optionDescription, styles.theme.optionDescription]}>
              A phrase with 12 words will be generated.
            </P>
          </View>

          <View style={[styles.optionCircle, value === 12 && styles.activeOptionCircle]}>
            <View style={[styles.optionInnerCircle]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleChange(24)}
          style={[styles.optionButton, value === 24 && styles.activeOptionButton]}
        >
          <View style={[styles.optionHeader]}>
            <B style={[styles.optionTitle, styles.theme.optionTitle]}>24 word recovery phrase</B>

            <P style={[styles.optionDescription, styles.theme.optionDescription]}>
              A phrase with 24 words will be generated.
            </P>
          </View>

          <View style={[styles.optionCircle, value === 24 && styles.activeOptionCircle]}>
            <View style={[styles.optionInnerCircle]} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={[styles.footer]}>
        <PrimaryButton onPress={nextStep} disabled={!value} style={styles.button}>
          Continue
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
