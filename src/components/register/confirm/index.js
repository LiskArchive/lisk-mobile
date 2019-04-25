import React from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import styles from './styles';
import { B, P } from '../../toolBox/typography';
import { PrimaryButton, Button } from '../../toolBox/button';
import verifyImage from '../../../assets/images/registrationProcess/verify3x.png';
import verifiedImage from '../../../assets/images/registrationProcess/verified3x.png';
import { SCREEN_HEIGHTS, deviceHeight } from '../../../utilities/device';
import { assembleWordOptions } from '../../../utilities/passphrase';

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
  }
  while (list.includes(index));
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

class Confirm extends React.Component {
  state = {
    buttonStatus: true,
    missing: [],
    options: [],
    answers: [
      {
        value: undefined,
        style: {},
      },
      {
        value: undefined,
        style: {},
      },
    ],
    visibleOptions: -1,
  };

  componentDidMount() {
    const { t, prevStep, navigation: { setParams } } = this.props;
    setParams({
      action: prevStep,
      title: deviceHeight() >= SCREEN_HEIGHTS.SM ? t('Passphrase verification') : t('Verification'),
    });
    this.generateTest();
  }

  generateTest = () => {
    const passphrase = this.props.sharedData.passphrase.split(' ');
    const words = this.props.sharedData.passphrase.match(/\w+/g);

    const missing = chooseRandomWords(2, words);
    this.setState({
      missing,
      options: assembleWordOptions(passphrase, missing),
      answers: [
        {
          value: undefined,
          style: {},
        },
        {
          value: undefined,
          style: {},
        },
      ],
    });
  }

  confirm = (status) => {
    this.setState({
      buttonStatus: !status,
    });
  }
  toggleOptions(index) {
    const temp = this.state.answers;
    temp[index].value = undefined;
    temp[index].style = {};
    this.setState({
      visibleOptions: index,
      answers: temp,
    });
  }

  fillOption = (item) => {
    const temp = this.state.answers;
    temp[this.state.visibleOptions] = { value: item, style: styles.selectedPlaceholder };
    this.setState({
      answers: temp,
      visibleOptions: false,
    });
    this.checkAnswers(temp);
  }

  checkAnswers = (answers) => {
    const passphrase = this.props.sharedData.passphrase.split(' ');
    const start = answers.filter(item => item.value).length;
    const result = answers.filter(item => passphrase.includes(item.value)).length;
    if (start === 2) {
      if (result !== 2) {
        setTimeout(() => {
          this.generateTest();
        }, 1000);
      }
      const finalAnswers = answers.map(item => (
        {
          value: item.value,
          style: result === 2 ? styles.successButton : styles.errorButton,
        }
      ));
      this.setState({
        answers: finalAnswers,
        buttonStatus: (result !== 2),
      });
    }
  }

  renderPassphrase = () => {
    const passphrase = this.props.sharedData.passphrase.split(' ');
    return this.state.missing.length > 0 ? passphrase.map((val, index) => {
      const optionIndex = this.state.missing.indexOf(index);
      const element = optionIndex >= 0 ?
        this.generatePlaceholder(index, optionIndex) :
        <B key={index} style={styles.word}>{val}</B>;
      return element;
    }) : null;
  }

  generatePlaceholder(index, optionIndex) {
    const style = this.state.visibleOptions === optionIndex ? null : styles.deActivePlaceholder;
    return <Button
      key={index}
      title={this.state.answers[optionIndex].value}
      onClick={() => this.toggleOptions(optionIndex)}
      style={[styles.placeholder, style, this.state.answers[optionIndex].style]} />;
  }

  render() {
    const { t, nextStep, sharedData: { passphrase } } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.horizontalPadding}>
            <B style={styles.subHeader}>
              {t('Fill in the blanks.')}
            </B>
          </View>
          <P style={[styles.passphraseTitle, styles.horizontalPadding]}>
            {t('Choose the correct option for missing words:')}
          </P>
          <View style={[styles.passphraseContainer, styles.horizontalPadding]}>
            { this.renderPassphrase() }
          </View>
          <View style={[styles.optionsContainer, styles.horizontalPadding]}>
            {this.state.options[this.state.visibleOptions] ?
              this.state.options[this.state.visibleOptions].map((val, idx) =>
                <Button style={styles.option} key={idx}
                  title={val} onClick={() => this.fillOption(val)} />)
              : null
            }
          </View>
          {
            deviceHeight() >= SCREEN_HEIGHTS.SM ?
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={this.state.buttonStatus ? verifyImage : verifiedImage}
                />
                <P style={styles.caption}>{t('Keep it safe!')}</P>
              </View> : null
          }
        </View>
        <View style={[styles.buttonWrapper, styles.horizontalPadding]}>
          <PrimaryButton
            disabled={this.state.buttonStatus}
            noTheme={true}
            style={styles.button}
            onClick={() => nextStep({ passphrase })}
            title={t('Confirm')}
          />
        </View>
      </View>);
  }
}

export default translate()(Confirm);
