import React from 'react';
import { View, Animated } from 'react-native';
import { translate } from 'react-i18next';
import { IconButton } from '../../toolBox/button';
import { P } from '../../toolBox/typography';
import Icon from '../../toolBox/icon';
import { tokenMap } from '../../../constants/tokens';
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
import { deviceHeight, SCREEN_HEIGHTS } from '../../../utilities/device';
import { validateAddress } from '../../../utilities/validators';
import DropDownHolder from '../../../utilities/alert';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

class Recipient extends React.Component {
  scannedData = {};

  state = {
    address: { value: '' },
    avatarPreview: false,
  };

  animatedStyles = {
    height: new Animated.Value(40),
    paddingTop: new Animated.Value(20),
  }

  componentDidMount() {
    const { sharedData, navigation: { setParams } } = this.props;

    if (sharedData.address) {
      this.setAddress(sharedData.address);
      setTimeout(() => this.input.focus(), 250);
    }

    setParams({
      title: isSmallScreen ? 'Send' : 'Recipient',
      showButtonLeft: false,
      action: false,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lng !== this.props.lng) {
      const { navigation: { setParams } } = this.props;
      setParams({
        title: isSmallScreen ? 'Send' : 'Recipient',
      });
    }
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

    if (validateAddress(this.props.settings.token.active, value) === 0) {
      this.setAvatarPreviewTimeout();
    }

    this.setState({
      address: { value },
      avatarPreview: false,
    });
  }

  submitForm = () => {
    const { t, settings } = this.props;
    const { value } = this.state.address;
    const validity = validateAddress(settings.token.active, value);

    if (validity === 0) {
      DropDownHolder.closeAlert();
      return this.forward();
    }

    let errorMessage = '';

    if (validity === 1) {
      errorMessage = t('Invalid address.');
    } else if (validity === -1) {
      errorMessage = t('Please enter an address.');
    }

    DropDownHolder.error(t('Error'), errorMessage);
    return this.setState({ address: { value } });
  }

  forward = (data) => {
    const { accounts: { followed }, sharedData, move } = this.props;
    const isFollowedAccount = address => followed.some(item => item.address === address);

    const nextData = data
      ? merge(sharedData, data)
      : merge(sharedData, this.scannedData, {
        address: this.state.address.value,
      });

    move({
      to: isFollowedAccount(nextData.address) ? 2 : 1,
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
      settings, navigation, theme, styles, accounts, t, lng,
    } = this.props;
    const { address, avatarPreview } = this.state;

    const shouldDisplayAvatar = settings.token.active === tokenMap.LSK.key;

    const titles = {
      heading: accounts.followed.length ? t('Enter an address or search in bookmarks.') : t('Enter an address to send tokens to.'),
      inputLabel: accounts.followed.length ? t('Address or label') : t('Address'),
    };

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <Scanner
          ref={(el) => { this.scanner = el; }}
          navigation={navigation}
          readFromCameraRoll={true}
          onQRCodeRead={this.onQRCodeRead}
          permissionDialogTitle={t('Permission to use camera')}
          permissionDialogMessage={t('Lisk needs to connect to your camera')}
        />

        <KeyboardAwareScrollView
          onKeyboard={this.onKeyboardOpen}
          onSubmit={this.submitForm}
          hasTabBar={true}
          onStickyButton={true}
          styles={{
            container: styles.container,
            innerContainer: styles.innerContainer,
          }}
          button={{
            title: t('Continue'),
            type: 'inBox',
          }}
        >
          {!isSmallScreen ? (
            <Animated.View style={[styles.titleContainer, this.animatedStyles]}>
              <P style={[styles.subtitle, styles.theme.subtitle]}>{titles.heading}</P>
            </Animated.View>
          ) : null}

          <View style={styles.form}>
            <View style={styles.addressContainer}>
              <IconButton
                onPress={() => this.scanner.toggleCamera()}
                titleStyle={[styles.scanButtonTitle, styles.theme.scanButtonTitle]}
                style={[styles.scanButton, lng === 'de' ? styles.longTitle : null]}
                title={t('Scan')}
                icon='scanner'
                iconSize={16}
                color={colors.light.blue}
              />

              {shouldDisplayAvatar && (
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
              )}

              <Input
                reference={(input) => { this.input = input; }}
                label={titles.inputLabel}
                autoCorrect={false}
                onChange={this.setAddress}
                value={address.value}
                innerStyles={{
                  input: [
                    styles.input,
                    styles.addressInput,
                    (shouldDisplayAvatar ? styles.addressInputWithAvatar : {}),
                  ],
                  containerStyle: styles.addressInputContainer,
                }}
              />
            </View>

            <Bookmarks
              navigate={this.forward}
              query={this.state.address.value}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(Recipient), getStyles());
