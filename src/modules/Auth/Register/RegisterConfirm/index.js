import React, { useCallback, useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import { H4, P } from 'components/shared/toolBox/typography';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { assembleWordOptions, chooseRandomWords } from 'modules/Auth/utils';

import getStyles from './styles';

// eslint-disable-next-line max-statements
export default function RegisterConfirm({ nextStep, sharedData: data, prevStep, customHeader }) {
  const navigation = useNavigation();

  const { passphrase } = data;

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
  const [visibleOptions, setVisibleOptions] = useState(-1);

  const { styles } = useTheme({
    styles: getStyles(),
  });

  const generateTest = useCallback(() => {
    const words = passphrase.match(/\w+/g);
    const _missing = chooseRandomWords(2, words);

    setMissing(_missing);

    setOptions(assembleWordOptions(passphrase.split(' '), _missing));

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
  }, [passphrase]);

  const toggleOptions = (index) => {
    const temp = [...answers];
    temp[index].value = undefined;
    temp[index].style = styles.selectedPlaceholder;
    setVisibleOptions(index);
    setAnswers(temp);
  };

  const checkAnswers = (_answers) => {
    const phrase = passphrase.split(' ');
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
    setVisibleOptions(false);
    checkAnswers(temp);
  };

  const generatePlaceholder = (index, optionIndex, value) => {
    const style = visibleOptions === optionIndex ? null : styles.deActivePlaceholder;
    return (
      <Button
        noPredefinedStyle
        testID={`passphrasePlaceholderFor-${value}`}
        key={index}
        title={answers[optionIndex].value}
        onClick={() => toggleOptions(optionIndex)}
        textStyle={[styles.label, answers[optionIndex].textStyle]}
        style={[styles.placeholder, style, answers[optionIndex].style]}
      />
    );
  };

  const renderPassphrase = () => {
    const phrase = passphrase.split(' ');
    return missing.length > 0
      ? phrase.map((val, index) => {
          const optionIndex = missing.indexOf(index);
          const element =
            optionIndex >= 0 ? (
              generatePlaceholder(index, optionIndex, val)
            ) : (
              <P key={index} style={[styles.word, styles.theme.word]}>
                {val}
              </P>
            );
          return element;
        })
      : null;
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton {...props} onPress={prevStep} title={i18next.t('auth.register.title')} />
      ),
      title: null,
    });

    generateTest();
  }, [navigation, generateTest, prevStep]);

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      {customHeader && (
        <HeaderBackButton
          title={'settings.backup_phrase.confirm_phrase'}
          onPress={navigation.goBack}
        />
      )}

      <View style={styles.body}>
        <H4 style={styles.title}>{i18next.t('auth.register.confirm.title')}</H4>

        <P style={[styles.passphraseTitle]}>{i18next.t('auth.register.confirm.description')}</P>

        <View style={styles.box}>
          <View style={[styles.passphraseContainer, styles.horizontalPadding]}>
            {renderPassphrase()}
          </View>

          <View
            testID="passphraseOptionsContainer"
            style={[styles.optionsContainer, styles.horizontalPadding]}
          >
            {options[visibleOptions] ? (
              options[visibleOptions].map((value, idx) => (
                <Button
                  noPredefinedStyle
                  testID={`passphraseOptionFor-${value}`}
                  style={styles.option}
                  textStyle={[styles.label, styles.labelOption]}
                  key={idx}
                  title={value}
                  onClick={() => fillOption(value)}
                />
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
          onClick={() => nextStep({ passphrase })}
        >
          {i18next.t('commons.buttons.confirm')}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
