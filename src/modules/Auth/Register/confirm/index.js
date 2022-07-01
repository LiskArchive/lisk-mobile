/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { P } from 'components/shared/toolBox/typography';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { SCREEN_HEIGHTS, deviceHeight } from 'utilities/device';
import { assembleWordOptions } from 'modules/Auth/utils';
import styles from './styles';

/**
 * Returns a random index which doesn't exist in list
 *
 * @param {Array} list - The list of existing random Indexes
 * @returns {Number} random index between 0 and length of words
 */
const randomIndex = (list, words) => {
  let index;
  do {
    index = Math.floor(Math.random() * words.length);
  } while (list.includes(index));
  return index;
};

/**
 * Returns a number of random indexes within 0 and the length of words
 * @param {Number} qty - the number of random indexes required
 * @returns {Array} the list of random indexes
 */
const chooseRandomWords = (qty, words) => {
  const missing = [];

  for (let i = 0; i < qty; i++) {
    missing.push(randomIndex(missing, words));
  }

  return missing;
};

// eslint-disable-next-line max-statements
const Confirm = ({
  t,
  nextStep,
  sharedData: { passphrase }, prevStep,
  customHeader
}) => {
  const navigation = useNavigation();
  const [buttonStatus, setButtonStatus] = useState(true);
  const [missing, setMissing] = useState([]);
  const [options, setOptions] = useState([]);
  const [answers, setAnswers] = useState([{
    value: undefined,
    style: {},
  },
  {
    value: undefined,
    style: {},
  }]);
  const [visibleOptions, setVisibleOptions] = useState(-1);

  const generateTest = () => {
    const words = passphrase.match(/\w+/g);
    const missing = chooseRandomWords(2, words);
    setMissing(missing);
    setOptions(assembleWordOptions(passphrase.split(' '), missing));
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
  };

  const toggleOptions = (index) => {
    const temp = [...answers];
    temp[index].value = undefined;
    temp[index].style = styles.selectedPlaceholder;
    setVisibleOptions(index);
    setAnswers(temp);
  };

  const checkAnswers = answers => {
    const phrase = passphrase.split(' ');
    const start = answers.filter(item => item.value).length;
    const result = answers.filter(item => phrase.includes(item.value))
      .length;
    const isCorrect = result === 2;
    if (start === 2) {
      if (!isCorrect) {
        setTimeout(() => {
          generateTest();
        }, 1000);
      }
      const finalAnswers = answers.map(item => ({
        value: item.value,
        style: styles.noBorderBottom,
        textStyle: isCorrect ? styles.labelCorrect : styles.labelIncorrect,
      }));
      setAnswers(finalAnswers);
      setButtonStatus(!isCorrect);
    }
  };

  const fillOption = item => {
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
    const style = visibleOptions === optionIndex
      ? null
      : styles.deActivePlaceholder;
    return (
      <Button
        noPredefinedStyle
        testID={`passphrasePlaceholderFor-${value}`}
        key={index}
        title={answers[optionIndex].value}
        onClick={() => toggleOptions(optionIndex)}
        textStyle={[styles.label, answers[optionIndex].textStyle]}
        style={[
          styles.placeholder,
          style,
          answers[optionIndex].style,
        ]}
      />
    );
  };

  const renderPassphrase = () => {
    const phrase = passphrase.split(' ');
    return missing.length > 0
      ? phrase.map((val, index) => {
        const optionIndex = missing.indexOf(index);
        const element = optionIndex >= 0 ? (
          generatePlaceholder(index, optionIndex, val)
        ) : (
          <P key={index} style={styles.word}>
            {val}
          </P>
        );
        return element;
      })
      : null;
  };

  useEffect(() => {
    const { setOptions } = navigation;
    setOptions({
      headerLeft: (props) => <HeaderBackButton {...props} onPress={prevStep} />,
      title:
          deviceHeight() >= SCREEN_HEIGHTS.SM
            ? t('Passphrase verification')
            : t('Verification'),
    });
    generateTest();
  }, []);

  return <SafeAreaView style={styles.wrapper}>
    {customHeader && <HeaderBackButton title={'settings.backup_phrase.confirm_phrase'} onPress={navigation.goBack} />}
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.box}>
          <P style={[styles.passphraseTitle, styles.horizontalPadding]}>
            {t('Tap and fill in the blanks:')}
          </P>
          <View
            style={[styles.passphraseContainer, styles.horizontalPadding]}
          >
            {renderPassphrase()}
          </View>
          <View
            testID="passphraseOptionsContainer"
            style={[styles.optionsContainer, styles.horizontalPadding]}
          >
            {options[visibleOptions] ? (
              options[visibleOptions].map(
                (value, idx) => (
                  <Button
                    noPredefinedStyle
                    testID={`passphraseOptionFor-${value}`}
                    style={styles.option}
                    textStyle={[styles.label, styles.labelOption]}
                    key={idx}
                    title={value}
                    onClick={() => fillOption(value)}
                  />
                )
              )
            ) : (
              <View style={styles.optionPlaceholder} />
            )}
          </View>
        </View>
      </View>
      <View style={[styles.buttonWrapper, styles.horizontalPadding]}>
        <PrimaryButton
          testID="registerConfirmButton"
          disabled={buttonStatus}
          noTheme={true}
          style={styles.button}
          onClick={() => nextStep({ passphrase })}
          title={t('Confirm')}
        />
      </View>
    </View>
  </SafeAreaView>;
};

export default translate()(Confirm);
