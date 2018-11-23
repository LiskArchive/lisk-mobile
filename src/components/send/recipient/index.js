import React from 'react';
import { View, Animated } from 'react-native';
import { IconButton } from '../../toolBox/button';
import { P, H1 } from '../../toolBox/typography';
import Icon from '../../toolBox/icon';
import reg from '../../../constants/regex';
import Input from '../../toolBox/input';
import { colors } from '../../../constants/styleGuide';
import Avatar from '../../avatar';
import Scanner from './scanner';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import { merge } from '../../../utilities/helpers';
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
    height: new Animated.Value(100),
    paddingTop: new Animated.Value(36),
  }

  componentDidMount() {
    const { sharedData, navigation } = this.props;

    if (sharedData.address) {
      this.setAddress(sharedData.address);
      setTimeout(() => this.input.focus(), 500);
    }

    navigation.setParams({ showButtonLeft: false });
  }

  setAvatarPreviewTimeout = () => {
    this.avatarPreviewTimeout = setTimeout(() => {
      this.setState({
        avatarPreview: true,
      });
    }, 300);
  }

  onQRCodeRead = (data) => {
    this.setAddress(data.address);
    this.scannedData = data;
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
    const nextData = data ?
      merge(this.props.sharedData, data) :
      merge(this.props.sharedData, this.scannedData, {
        address: this.state.address.value,
      });

    this.props.nextStep(nextData);
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
          toValue: 100,
          duration: 400,
          delay: 0,
        }),
        Animated.timing(paddingTop, {
          toValue: 36,
          duration: 400,
          delay: 0,
        }),
      ]).start();
    }
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
          setValues={this.onQRCodeRead}
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
            <View style={styles.headings}>
              <H1 style={[styles.title, styles.theme.title]}>Recipient</H1>
              <P style={[styles.subtitle, styles.theme.subtitle]}>
              Insert address or search a bookmark.
              </P>
            </View>
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
                label='Address or label'
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
