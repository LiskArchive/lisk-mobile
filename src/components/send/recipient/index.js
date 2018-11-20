import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import { IconButton } from '../../toolBox/button';
import { P, H1 } from '../../toolBox/typography';
import Icon from '../../toolBox/icon';
import reg from '../../../constants/regex';
import Input from '../../toolBox/input';
import { colors } from '../../../constants/styleGuide';
import Avatar from '../../avatar';
import Scanner from './scanner';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import withTheme from '../../withTheme';
import getStyles from './styles';

@connect(state => ({
  account: state.accounts.active,
}))
class Recipient extends React.Component {
  activeInputRef = null;
  validator = {
    address: (str) => {
      if (str === '') return -1;
      return reg.address.test(str) ? 0 : 1;
    },
  };
  state = {
    address: {
      value: '',
      validity: -1,
    },
    amount: {
      value: '',
      validity: -1,
    },
    reference: {
      value: '',
      validity: 0,
    },
    avatarPreview: true,
  };

  componentDidMount() {
    const { prevState, navigation } = this.props;

    if (Object.keys(prevState).length) {
      this.setFormState(prevState);
    } else if (navigation.state.params && navigation.state.params.query) {
      this.setFormState(navigation.state.params.query);
    }

    this.props.navigation.setParams({ showButtonLeft: false });
  }

  componentDidUpdate(prevProps) {
    const { navigation: { state: { params } }, account } = this.props;
    const prevParams = (prevProps.navigation.state ? prevProps.navigation.state.params : {});

    if (params && params.query && (prevParams.query !== params.query)) {
      this.setFormState(params.query);
    }

    if (prevProps.account && account && (account.balance !== prevProps.account.balance)) {
      const { amount: { value } } = this.state;
      this.setState({
        amount: {
          value,
          validity: this.validator.amount(value),
        },
      });
    }
  }

  setFormState = ({ address = '' }) => {
    clearTimeout(this.avatarPreviewTimeout);

    this.setState({
      address: {
        value: address,
        validity: this.validator.address(address),
      },
      avatarPreview: false,
    });

    this.setAvatarPreviewTimeout();
  }

  setAvatarPreviewTimeout = () => {
    this.avatarPreviewTimeout = setTimeout(() => {
      this.setState({
        avatarPreview: true,
      });
    }, 300);
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

    this.setAvatarPreviewTimeout();
  }

  forward = () => {
    const { secondPublicKey } = this.props.account;
    const to = secondPublicKey ? 1 : 2;
    const stepData = {
      address: this.state.address.value,
    };

    this.props.move({ to, stepData });
  }

  render() {
    const {
      navigation, theme, styles,
    } = this.props;
    const {
      address, avatarPreview,
    } = this.state;

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <Scanner
          ref={(el) => { this.scanner = el; }}
          navigation={navigation}
          setAddress={this.setAddress}
          setAmount={this.setAmount}
        />
        <KeyboardAwareScrollView
            disabled={address.validity !== 0}
            onSubmit={this.forward}
            hasTabBar={true}
            button={{
              title: 'Continue',
              type: 'inBox',
            }}
            styles={{ container: styles.container, innerContainer: styles.innerContainer }}
          >
          <View style={styles.titleContainer}>
            <View style={styles.headings}>
              <H1 style={[styles.title, styles.theme.title]}>Recipient</H1>
              <P style={[styles.subtitle, styles.theme.subtitle]}>
              Insert address or search a bookmark.
              </P>
            </View>
          </View>
          <View style={styles.form}>
            <View style={styles.addressContainer}>
              <IconButton
                onPress={() => this.scanner.toggleCamera()}
                titleStyle={[styles.scanButtonTitle, styles.theme.scanButtonTitle]}
                style={styles.scanButton}
                title='Scan'
                icon='scanner'
                iconSize={18}
                color={colors.light.blue}
              />
              {
                address.validity === 0 && avatarPreview ?
                  <Avatar
                    style={styles.avatar}
                    address={address.value}
                    size={34}
                  /> :
                  <Icon
                    style={styles.avatar}
                    name='avatar-placeholder'
                    size={34}
                    color={colors[theme].gray5}
                  />
              }
              <Input
                label='Address'
                autoCorrect={false}
                reference={(input) => { this.references = input; }}
                innerStyles={{
                  errorMessage: styles.errorMessage,
                  input: [
                    styles.input,
                    styles.addressInput,
                  ],
                  containerStyle: styles.addressInputContainer,
                }}
                onChange={this.setAddress}
                value={address.value}
                error={
                  address.validity === 1 ?
                    'Invalid address' : ''
                }
                onFocus={() => { this.activeInputRef = 0; }}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(Recipient, getStyles());
