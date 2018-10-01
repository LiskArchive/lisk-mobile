import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { H1, H4, P } from '../../toolBox/typography';
import { SecondaryButton, Button } from '../../toolBox/button';
import verifyImage from '../../../assets/images/registrationProcess/verify3x.png';
import verifiedImage from '../../../assets/images/registrationProcess/verified3x.png';
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
    passphrase: '',
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
    this.props.navigation.setParams({ action: this.props.prevStep });
    this.generateTest();
  }

  generateTest = () => {
    const passphrase = this.props.passphrase.split(' ');
    const words = this.props.passphrase.match(/\w+/g);

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
    const passphrase = this.props.passphrase.split(' ');
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
    const passphrase = this.props.passphrase.split(' ');
    return this.state.missing.length > 0 ? passphrase.map((val, index) => {
      const optionIndex = this.state.missing.indexOf(index);
      const element = optionIndex >= 0 ?
        this.generatePlaceholder(index, optionIndex) :
        <H4 key={index} style={styles.word}>{val}</H4>;
      return element;
    }) : null;
  }

  generatePlaceholder(index, optionIndex) {
    const style = this.state.visibleOptions === optionIndex ?
      styles.placeholder : styles.deActivePlaceholder;
    return <Button
      key={index}
      title={this.state.answers[optionIndex].value}
      onClick={() => this.toggleOptions(optionIndex)}
      style={[style, this.state.answers[optionIndex].style]} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <H1 style={styles.header}>Verify your passphrase</H1>
          <P style={styles.subHeader}>
            Please tap on the empty boxes and select{'\n'}the correct word from the options.
          </P>
          <View style={styles.imageContainer} >
            <Image
              style={styles.image}
              source={this.state.buttonStatus ? verifyImage : verifiedImage}
            />
          </View>
          <View style={styles.passphraseContainer}>
            { this.renderPassphrase() }
          </View>
          <View style={styles.optionsContainer}>
            {this.state.options[this.state.visibleOptions] ?
              this.state.options[this.state.visibleOptions].map((val, idx) =>
                <Button style={styles.option} key={idx}
                  title={val} onClick={() => this.fillOption(val)} />)
              : null
            }
          </View>
        </View>
        <View>
          <SecondaryButton
            disabled={this.state.buttonStatus}
            style={styles.button}
            onClick={() => {
              this.props.nextStep({
                passphrase: this.state.passphrase,
              });
            }}
            title='Confirm' />
        </View>
      </View>);
  }
}

export default Confirm;
