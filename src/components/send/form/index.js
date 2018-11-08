import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import { TextEncoder } from 'text-encoding';
import { IconButton } from '../../toolBox/button';
import { fromRawLsk } from '../../../utilities/conversions';
import transactions from '../../../constants/transactions';
import { P, H1, H2, Small } from '../../toolBox/typography';
import Icon from '../../toolBox/icon';
import styles from './styles';
import reg from '../../../constants/regex';
import Input from '../../toolBox/input';
import FormattedNumber from '../../formattedNumber';
import { colors } from '../../../constants/styleGuide';
import Avatar from '../../avatar';
import Scanner from './scanner';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';

@connect(state => ({
  account: state.accounts.active,
}), {})
class Form extends React.Component {
    references = [];

    validator = {
      address: (str) => {
        if (str === '') return -1;
        return reg.address.test(str) ? 0 : 1;
      },
      amount: (str) => {
        const { account } = this.props;
        if (str === '') return -1;
        return (reg.amount.test(str) &&
          account && account.balance > transactions.send.fee &&
          parseFloat(str) <= fromRawLsk(account.balance - transactions.send.fee)) ? 0 : 1;
      },
      reference: (str) => {
        const uint8array = new TextEncoder().encode(str);
        return uint8array.length > 64 ? 1 : 0;
      },
    };
    activeInputRef = null;

    state = {
      address: { value: '', validity: this.validator.address('') },
      amount: { value: '', validity: this.validator.amount('') },
      reference: { value: '', validity: this.validator.reference('') },
      secondaryButtonOpacity: 1,
      avatarPreview: true,
    };

  /**
   * @param {String} name - the key to set on state
   * @param {Any} value the Value corresponding the given key
   */
  setReference = (value) => {
    this.setState({
      reference: {
        value,
        validity: this.validator.reference(value),
      },
    });
  }

  setAddress = (value) => {
    clearTimeout(this.avatarPreviewTimeout);
    this.setState({
      address: {
        value,
        validity: this.validator.address(value),
      },
      avatarPreview: false,
    });
    this.avatarPreviewTimeout = setTimeout(() => {
      this.setState({
        avatarPreview: true,
      });
    }, 300);
  }

  setAmount = (value) => {
    const normalizedValue = value.replace(',', '.');
    this.setState({
      amount: {
        value,
        validity: this.validator.amount(normalizedValue),
      },
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({ showButtonLeft: false });
    if (this.props.prevState.address) {
      const state = {
        address: {
          value: this.props.prevState.address,
          validity: 0,
        },
        amount: {
          value: this.props.prevState.amount,
          validity: 0,
        },
        reference: {
          value: this.props.prevState.reference || '',
          validity: 0,
        },
      };
      this.setState(state);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.state.amount;
    const validator = this.validator.amount;
    if (nextProps.account && this.props.account.balance !== nextProps.account.balance) {
      this.setState({
        amount: {
          validity: validator(value),
          value,
        },
      });
    }
  }

  changeButtonOpacity = (val) => {
    this.setState({ secondaryButtonOpacity: val });
  }

  changeInputFocus = (direction = 1) => {
    let focusingRef = this.activeInputRef + direction;
    if (focusingRef < 0) {
      focusingRef = 0;
    }
    if (focusingRef > 2) {
      focusingRef = 2;
    }
    this.references[`${focusingRef}`].focus();
  }

  forward = () => {
    const { secondPublicKey } = this.props.account;
    const to = secondPublicKey ? 1 : 2;
    const stepData = {
      amount: this.state.amount.value,
      address: this.state.address.value,
      reference: this.state.reference.value,
    };

    this.props.move({ to, stepData });
  }

  render() {
    const {
      address, amount, reference, avatarPreview,
    } = this.state;
    return (
      <View style={styles.wrapper}>
        <Scanner
          ref={(el) => { this.scanner = el; }}
          navigation={this.props.navigation}
          setAddress={this.setAddress}
          setAmount={this.setAmount}/>
        <KeyboardAwareScrollView
          disabled={address.validity !== 0 || amount.validity !== 0 || reference.validity !== 0}
          onSubmit={this.forward}
          hasTabBar={true}
          button={{
            title: 'Continue',
            type: 'inBox',
          }}
          styles={{ container: styles.container, innerContainer: styles.innerContainer }}>
          <View style={styles.titleContainer}>
            <View style={styles.headings}>
              <H1>Send</H1>
              <P style={styles.subtitle}>Send LSK tokens to other accounts.</P>
            </View>
            <View style={styles.balanceWrapper}>
              <Small style={styles.subtitle}>YOUR CURRENT BALANCE</Small>
              <View style={styles.balanceValue}>
                <H2 style={styles.number}>
                  <FormattedNumber>
                    {fromRawLsk(this.props.account ? this.props.account.balance : 0)}
                  </FormattedNumber>
                </H2>
                <H2 style={styles.unit}>Ⱡ</H2>
              </View>
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.addressContainer}>
              <IconButton
                onPress={() => this.scanner.toggleCamera()}
                titleStyle={styles.scanButtonTitle}
                style={styles.scanButton}
                title='Scan'
                icon='scanner'
                iconSize={18}
                color={colors.primary5} />
              {
                address.validity === 0 && avatarPreview ?
                  <Avatar
                    style={styles.avatar}
                    address={address.value}
                    size={34} /> :
                  <Icon
                    style={styles.avatar}
                    name='avatar-placeholder'
                    size={34}
                    color={colors.grayScale4} />
              }
              <Input
                label='Address'
                autoCorrect={false}
                reference={(input) => { this.references[0] = input; }}
                styles={{
                  errorMessage: styles.errorMessage,
                  input: [
                    styles.input,
                    styles.addressInput,
                  ],
                  containerStyle: styles.addressInputContainer,
                }}
                onChange={value => this.setAddress(value)}
                value={address.value}
                error={
                  address.validity === 1 ?
                    'Invalid address' : ''
                }
                onFocus={() => { this.activeInputRef = 0; }}
              />
            </View>
            <Input
              label='Amount (Ⱡ)'
              autoCorrect={false}
              reference={(input) => { this.references[1] = input; }}
              styles={{ input: styles.input }}
              onChange={value => this.setAmount(value)}
              value={amount.value}
              keyboardType='numeric'
              error={
                amount.validity === 1 ?
                  'Invalid amount value' : ''
              }
              onFocus={() => { this.activeInputRef = 1; }}
            />
            <Input
              label='Reference (Optional)'
              autoCorrect={false}
              reference={(input) => { this.references[2] = input; }}
              styles={{ errorMessage: styles.errorMessage, input: styles.input }}
              multiline={true}
              onChange={this.setReference}
              value={this.state.reference.value}
              error={
                this.state.reference.validity === 1 ?
                  'Maximum length of 64 characters is exceeded.' : ''
              }
              onFocus={() => { this.activeInputRef = 2; }}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Form;
