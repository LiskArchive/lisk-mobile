/* eslint-disable max-statements */
import React, { useCallback, useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import { H4, P } from 'components/shared/toolBox/typography';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { assembleWordOptions, chooseRandomWords } from 'modules/Auth/utils';

import getRecoveryPhraseQuizStyles from './RecoveryPhraseQuiz.styles';

export default function RecoveryPhraseQuiz({
  nextStep,
  sharedData: data,
  prevStep,
  customHeader,
  showHeader,
  currentIndex,
  length,
}) {
  const navigation = useNavigation();

  const { recoveryPhrase } = data;

  const [buttonStatus, setButtonStatus] = useState(true);
  const [missing, setMissing] = useState([]);
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([
    {
      value: undefined,
      style: {},
    },
    {
      value: undefined,
      style: {},
    },
  ]);

  const [visibleOptions, setVisibleOptions] = useState(null);

  const { styles } = useTheme({
    styles: getRecoveryPhraseQuizStyles(),
  });

  const generateTest = useCallback(() => {
    const words = recoveryPhrase.match(/\w+/g);
    const _missing = chooseRandomWords(2, words);

    setMissing(_missing);
    setVisibleOptions(0);

    setOptions(assembleWordOptions(recoveryPhrase.split(' '), _missing));

    setAnswers([
      {
        value: undefined,
        style: {},
        textStyle: {},
      },
      {
        value: undefined,
        style: {},
        textStyle: {},
      },
    ]);
  }, [recoveryPhrase]);

  const toggleOptions = (index) => {
    const temp = [...answers];
    temp[index].value = undefined;
    temp[index].style = styles.selectedPlaceholder;
    setVisibleOptions(index);
    setAnswers(temp);
  };

  const checkAnswers = (_answers) => {
    const phrase = recoveryPhrase.split(' ');
    const start = _answers.filter((item) => item.value).length;
    const result = _answers.filter((item) => phrase.includes(item.value)).length;
    const isCorrect = result === 2;
    if (start === 2) {
      if (!isCorrect) {
        setTimeout(() => {
          generateTest();
        }, 1000);
      }
      const finalAnswers = _answers.map((item) => ({
        value: item.value,
        style: styles.noBorderBottom,
        textStyle: isCorrect ? styles.labelCorrect : styles.labelIncorrect,
      }));
      setAnswers(finalAnswers);
      setButtonStatus(!isCorrect);
    }
  };

  const fillOption = (item) => {
    const temp = [...answers];
    temp[visibleOptions] = {
      value: item,
      style: styles.filledOutPlaceholder,
      textStyle: styles.labelUnchecked,
    };
    setAnswers(temp);
    if (visibleOptions === 0) {
      setVisibleOptions(1);
    } else {
      setVisibleOptions(null);
    }
    checkAnswers(temp);
  };

  const generatePlaceholder = (index, optionIndex, value) => {
    const style = visibleOptions === optionIndex ? null : styles.deActivePlaceholder;
    return (
      <Button
        noPredefinedStyle
        testID={`recoveryPhrasePlaceholderFor-${value}`}
        key={index}
        title={answers[optionIndex].value}
        onClick={() => toggleOptions(optionIndex)}
        textStyle={[styles.label, styles.theme.label, answers[optionIndex].textStyle]}
        style={[styles.placeholder, style, answers[optionIndex].style]}
      />
    );
  };

  const renderRecoveryPhrase = () => {
    const phrase = recoveryPhrase.split(' ');
    return missing.length > 0
      ? phrase.map((val, index) => {
          const optionIndex = missing.indexOf(index);
          const element =
            optionIndex >= 0 ? (
              generatePlaceholder(index, optionIndex, val)
            ) : (
              <P key={index} style={[styles.recoveryPhraseText, styles.theme.recoveryPhraseText]}>
                {val}
              </P>
            );
          return element;
        })
      : null;
  };

  useEffect(() => {
    generateTest();
  }, [generateTest]);

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      {customHeader && (
        <HeaderBackButton
          title={'settings.backupPhrase.confirmPhrase'}
          onPress={navigation.goBack}
        />
      )}
      {showHeader && (
        <HeaderBackButton
          onPress={prevStep}
          title={i18next.t('auth.register.title')}
          withProgressBar
          currentIndex={currentIndex}
          length={length}
        />
      )}

      <View style={[styles.body]}>
        {!customHeader && (
          <H4 style={[styles.title, styles.theme.title]}>
            {i18next.t('auth.register.confirm.title')}
          </H4>
        )}

        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('auth.register.confirm.description')}
        </P>

        <View style={styles.box}>
          <View style={[styles.recoveryPhraseContainer, styles.horizontalPadding]}>
            {renderRecoveryPhrase()}
          </View>

          <View
            testID="recoveryPhraseOptionsContainer"
            style={[styles.optionsContainer, styles.horizontalPadding]}
          >
            {options[visibleOptions] ? (
              options[visibleOptions].map((value, idx) => (
                <Button
                  key={idx}
                  onClick={() => fillOption(value)}
                  testID={`recoveryPhraseOptionFor-${value}`}
                  noPredefinedStyle
                  style={[styles.option]}
                  textStyle={[styles.label, styles.theme.label]}
                >
                  {value}
                </Button>
              ))
            ) : (
              <View style={styles.optionPlaceholder} />
            )}
          </View>
        </View>
      </View>

      <View style={[styles.footer]}>
        <PrimaryButton
          testID="registerConfirmButton"
          disabled={buttonStatus}
          noTheme={true}
          style={styles.button}
          onClick={() => nextStep({ recoveryPhrase })}
        >
          {i18next.t('auth.register.confirm.continueButtonText')}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
