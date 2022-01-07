import React from 'react';
import { View, Animated } from 'react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import { IconButton } from '../../../../shared/toolBox/button';
import Input from '../../../../shared/toolBox/input';
import { colors } from '../../../../../constants/styleGuide';
import Avatar from '../../../../shared/avatar';
import Scanner from '../../../../shared/scanner';
import KeyboardAwareScrollView from '../../../../shared/toolBox/keyboardAwareScrollView';
import { merge } from '../../../../../utilities/helpers';
import { decodeLaunchUrl } from '../../../../../utilities/qrCode';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import Bookmarks from '../../../../shared/bookmarks';
import { validateAddress } from '../../../../../utilities/validators';
import DropDownHolder from '../../../../../utilities/alert';
import HeaderBackButton from '../../../router/headerBackButton';
import StepProgress from '../../../../shared/multiStep/stepProgress';
import { H4 } from '../../../../shared/toolBox/typography';

@connect(
  state => ({
    list: state.accounts.followed,
  }),
)
class Recipient extends React.Component {
  scannedData = {};

  state = {
    address: { value: '' },
    avatarPreview: false,
    wrapperStyle: {},
  };

  animatedStyles = {
    height: new Animated.Value(40),
    paddingTop: new Animated.Value(20),
  };

  componentDidMount() {
    const {
      sharedData,
      navigation: { setOptions },
    } = this.props;

    if (sharedData.address) {
      this.setAddress(sharedData.address);
      setTimeout(() => this.input.focus(), 250);
    }

    setOptions({
      title: null,
      headerLeft: () => <HeaderBackButton title={'Send LSK'} safeArea={true} noIcon={true} />,
      headerRight: () => <StepProgress currentIndex={1} length={3} />,
      headerShown: true,
    });
  }

  setAvatarPreviewTimeout = () => {
    this.avatarPreviewTimeout = setTimeout(() => {
      this.setState({
        avatarPreview: true,
      });
    }, 300);
  };

  onQRCodeRead = data => {
    const decodedData = decodeLaunchUrl(data);
    this.setAddress(decodedData.address);
    this.scannedData = decodedData;
    this.input.focus();
  };

  setAddress = value => {
    clearTimeout(this.avatarPreviewTimeout);

    if (validateAddress(this.props.settings.token.active, value) === 0) {
      this.setAvatarPreviewTimeout();
    }

    this.setState({
      address: { value },
      avatarPreview: false,
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

  forward = data => {
    const { sharedData, move } = this.props;
    const nextData = data
      ? merge(sharedData, data)
      : merge(sharedData, this.scannedData, {
        address: this.state.address.value,
      });

    move({
      to: 1,
      data: nextData,
    });
  };

  isCameraOpen = data => {
    this.props.isCameraOpen(data);
  };

  render() {
    const {
      settings: { token },
      navigation,
      styles,
      t,
      lng,
      list
    } = this.props;
    const { address } = this.state;
    const hasBookmarks = !!list[token.active]?.length;
    const placeholder = hasBookmarks ? t('Insert public address or a name') : t('Insert public address');

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <Scanner
          ref={el => {
            this.scanner = el;
          }}
          navigation={navigation}
          readFromCameraRoll={true}
          onQRCodeRead={this.onQRCodeRead}
          permissionDialogTitle={t('Permission to use camera')}
          permissionDialogMessage={t('Lisk needs to connect to your camera')}
        />

        <KeyboardAwareScrollView
          viewIsInsideTab
          onSubmit={this.submitForm}
          onStickyButton={true}
          styles={{
            innerContainer: styles.innerContainer,
          }}
          button={{
            title: t('Continue'),
            type: 'inBox',
          }}
        >
          <View style={styles.form}>
            <View style={styles.addressContainer}>
              <IconButton
                onPress={() => this.scanner.toggleCamera()}
                titleStyle={[
                  styles.scanButtonTitle,
                  styles.theme.scanButtonTitle,
                ]}
                style={[
                  styles.scanButton,
                  lng === 'de' ? styles.longTitle : null,
                ]}
                title={t('Scan')}
                icon="scanner"
                iconSize={19.5}
                color={colors.light.ultramarineBlue}
              />
              <Avatar
                style={styles.avatar}
                address={address.value}
                size={24.6}
              />
              <Input
                reference={input => {
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
                    styles.addressInputWithAvatar,
                  ],
                  containerStyle: styles.addressInputContainer,
                  inputLabel: styles.theme.inputLabel,
                }}
              />
            </View>
            {hasBookmarks && <View>
              <View style={[styles.titleContainer]} >
                <H4 style={styles.theme.title} >{t('Choose from bookmarks')}</H4>
              </View>
            </View>}
            <Bookmarks
              navigate={this.forward}
              query={this.state.address.value}
              renderEmpty={false}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(Recipient), getStyles());
