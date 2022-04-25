import React from 'react';
import { View, Animated } from 'react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton, IconButton } from 'components/shared/toolBox/button';
import Input from 'components/shared/toolBox/input';
import { colors } from 'constants/styleGuide';
import Avatar from 'components/shared/avatar';
import Scanner from 'components/shared/scanner';
import KeyboardAwareScrollView from 'components/shared/toolBox/keyboardAwareScrollView';
import { merge } from 'utilities/helpers';
import { decodeLaunchUrl } from 'utilities/qrCode';
import withTheme from 'components/shared/withTheme';
import Bookmarks from 'components/shared/bookmarks';
import { validateAddress } from 'utilities/validators';
import DropDownHolder from 'utilities/alert';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { H4 } from 'components/shared/toolBox/typography';
import { tokenMap } from 'constants/tokens';
import getStyles from './styles';

@connect((state) => ({
  list: state.accounts.followed.LSK?.filter(
    (list) => validateAddress(tokenMap[0], list.address) === 0
  )
}))
class Recipient extends React.Component {
  scannedData = {};

  state = {
    address: { value: '' },
    avatarPreview: false,
    wrapperStyle: {}
  };

  animatedStyles = {
    height: new Animated.Value(40),
    paddingTop: new Animated.Value(20)
  };

  componentDidMount() {
    const {
      sharedData,
      navigation: { setOptions }
    } = this.props;

    if (sharedData.address) {
      this.setAddress(sharedData.address);
      setTimeout(() => this.input.focus(), 250);
    }

    setOptions({
      headerShown: false
    });
  }

  setAvatarPreviewTimeout = () => {
    this.avatarPreviewTimeout = setTimeout(() => {
      this.setState({
        avatarPreview: true
      });
    }, 300);
  };

  onQRCodeRead = (data) => {
    const decodedData = decodeLaunchUrl(data);
    this.setAddress(decodedData.address);
    this.scannedData = decodedData;
    this.input.focus();
  };

  setAddress = (value) => {
    clearTimeout(this.avatarPreviewTimeout);

    if (validateAddress(this.props.settings.token.active, value) === 0) {
      this.setAvatarPreviewTimeout();
    }

    this.setState({
      address: { value },
      avatarPreview: false
    });
  };

  submitForm = () => {
    const { t, settings } = this.props;
    const { value } = this.state.address;
    const validity = validateAddress(settings.token.active, value);

    switch (validity) {
      default:
        DropDownHolder.closeAlert();
        this.forward();
        break;

      case 1:
        DropDownHolder.error(t('Error'), t('Invalid address.'));
        this.setState({ address: { value } });
        break;

      case -1:
        DropDownHolder.error(t('Error'), t('Please enter an address.'));
        this.setState({ address: { value } });
        break;
    }
  };

  forward = (data) => {
    const { sharedData, move } = this.props;
    const nextData = data
      ? merge(sharedData, data)
      : merge(sharedData, this.scannedData, {
        address: this.state.address.value
      });

    move({
      to: 1,
      data: nextData
    });
  };

  isCameraOpen = (data) => {
    this.props.isCameraOpen(data);
  };

  render() {
    const {
      navigation, styles, t, lng, list
    } = this.props;
    const { address } = this.state;
    const hasBookmarks = !!list?.length;
    const placeholder = hasBookmarks
      ? t('Insert public address or a name')
      : t('Insert public address');

    return (
      <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
        <HeaderBackButton title={'Send LSK'} noIcon={true} currentIndex={1} length={3} step={true} />
        <Scanner
          reference={(el) => {
            this.scanner = el;
          }}
          navigation={navigation}
          readFromCameraRoll={true}
          onQRCodeRead={this.onQRCodeRead}
          permissionDialogTitle={t('Permission to use camera')}
          permissionDialogMessage={t('Lisk needs to connect to your camera')}
        />
        <View style={styles.form}>
          <View style={styles.addressContainer}>
            <IconButton
              onPress={() => this.scanner.toggleCamera()}
              titleStyle={[styles.scanButtonTitle, styles.theme.scanButtonTitle]}
              style={[styles.scanButton, lng === 'de' ? styles.longTitle : null]}
              title={t('Scan')}
              icon="scanner"
              iconSize={19.5}
              color={colors.light.ultramarineBlue}
            />
            <Avatar style={styles.avatar} address={address.value} size={24.6} />
            <Input
              reference={(input) => {
                this.input = input;
              }}
              label={t('Recipient')}
              autoCorrect={false}
              onChange={this.setAddress}
              value={address.value}
              placeholder={placeholder}
              innerStyles={{
                input: [
                  styles.input,
                  styles.theme.input,
                  styles.addressInput,
                  styles.addressInputWithAvatar
                ],
                containerStyle: styles.addressInputContainer,
                inputLabel: styles.theme.inputLabel
              }}
              placeholderTextColor={colors.light.mountainMist}
            />
          </View>
          {hasBookmarks && (
            <View>
              <View style={[styles.titleContainer]}>
                <H4 style={styles.theme.title}>{t('Choose from bookmarks')}</H4>
              </View>
            </View>
          )}
          <KeyboardAwareScrollView
            viewIsInsideTab
            styles={{
              innerContainer: [styles.innerContainer, styles.flex],
              container: styles.flex
            }}
            noFooterButton
          >
            <Bookmarks
              navigate={this.forward}
              query={this.state.address.value}
              renderEmpty={false}
              filterAddress
            />
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.footerButtonContainer}>
          <PrimaryButton title={t('Continue')} onClick={this.submitForm} />
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(translate()(Recipient), getStyles());
