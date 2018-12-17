import React from 'react';
import connect from 'redux-connect-decorator';
import { View, Animated } from 'react-native';
import { IconButton } from '../../toolBox/button';
import { P } from '../../toolBox/typography';
import Icon from '../../toolBox/icon';
import reg from '../../../constants/regex';
import Input from '../../toolBox/input';
import { colors } from '../../../constants/styleGuide';
import Avatar from '../../avatar';
import Scanner from '../../scanner';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import { merge } from '../../../utilities/helpers';
import { decodeLaunchUrl } from '../../../utilities/qrCode';
import withTheme from '../../withTheme';
import getStyles from './styles';
import Bookmarks from '../../bookmarks';

class Recipient extends React.Component {
  activeInputRef = null;
  validator = (str) => {
    if (str === '') return -1;
    return reg.address.test(str) ? 0 : 1;
  };
  scannedData = {};
  state = {
    header: true,
    address: {
      value: '',
      validity: -1,
    },
    avatarPreview: false,
  };
  animatedStyles = {
    height: new Animated.Value(40),
    paddingTop: new Animated.Value(20),
  }

  componentDidMount() {
    const { sharedData, navigation } = this.props;

    if (sharedData.address) {
      this.setAddress(sharedData.address);
      setTimeout(() => this.input.focus(), 250);
    }

    navigation.setParams({
      showButtonLeft: false,
      action: false,
    });
  }

  setAvatarPreviewTimeout = () => {
    this.avatarPreviewTimeout = setTimeout(() => {
      this.setState({
        avatarPreview: true,
      });
    }, 300);
  }

  onQRCodeRead = (data) => {
    const decodedData = decodeLaunchUrl(data);
    this.setAddress(decodedData.address);
    this.scannedData = decodedData;
    this.input.focus();
  }

  setAddress = (value) => {
    clearTimeout(this.avatarPreviewTimeout);
    if (this.validator(value) === 0) {
      this.setAvatarPreviewTimeout();
    }
    this.setState({
      address: {
        value,
      },
      avatarPreview: false,
    });
  }

  submitForm = () => {
    const { value } = this.state.address;
    const validity = this.validator(value);
    if (validity === 0) {
      this.forward();
    } else {
      this.setState({
        address: { value, validity },
      });
    }
  }

  forward = (data) => {
    const accountHasAlreadyFollowed = (address) => {
      const { followed } = this.props.accounts;
      return followed.some(item => item.address === address);
    };

    const {
      sharedData,
      move,
    } = this.props;
    const nextData = data ?
      merge(sharedData, data) :
      merge(sharedData, this.scannedData, {
        address: this.state.address.value,
      });

    move({
      to: accountHasAlreadyFollowed(nextData.address) ? 2 : 1,
      data: nextData,
    });
  }

  onKeyboardOpen = (header) => {
    const { height, paddingTop } = this.animatedStyles;
    if (!header) {
      Animated.parallel([
        Animated.timing(paddingTop, {
          toValue: 0,
          duration: 400,
          delay: 0,
        }),
        Animated.timing(height, {
          toValue: 0,
          duration: 400,
          delay: 0,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(height, {
          toValue: 40,
          duration: 400,
          delay: 0,
        }),
        Animated.timing(paddingTop, {
          toValue: 20,
          duration: 400,
          delay: 0,
        }),
      ]).start();
    }
  }

  render() {
    const {
      navigation, theme, styles, accounts,
    } = this.props;
    const {
      address, avatarPreview,
    } = this.state;

    const titles = {
      heading: accounts.followed.length ? 'Enter an address or search an existing one.' : 'Enter a valid address.',
      inputLabel: accounts.followed.length ? 'Address or label' : 'Address',
    };

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <Scanner
          ref={(el) => { this.scanner = el; }}
          navigation={navigation}
          readFromCameraRoll={true}
          onQRCodeRead={this.onQRCodeRead}
        />
        <KeyboardAwareScrollView
            onKeyboard={this.onKeyboardOpen}
            onSubmit={this.submitForm}
            hasTabBar={true}
            onStickyButton={true}
            button={{
              title: 'Continue',
              type: 'inBox',
            }}
            styles={{ container: styles.container, innerContainer: styles.innerContainer }}
          >
          <Animated.View style={[styles.titleContainer, this.animatedStyles]}>
            <P style={[styles.subtitle, styles.theme.subtitle]}>{titles.heading}</P>
          </Animated.View>
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
                avatarPreview ?
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
                label={titles.inputLabel}
                autoCorrect={false}
                reference={(input) => { this.input = input; }}
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
            <Bookmarks navigate={this.forward} query={this.state.address.value} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(Recipient, getStyles());
