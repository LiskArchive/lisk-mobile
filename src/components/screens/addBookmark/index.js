import React from 'react';
import { BackHandler, View } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import { IconButton } from '../../shared/toolBox/button';
import Input from '../../shared/toolBox/input';
import { colors } from '../../../constants/styleGuide';
import Avatar from '../../shared/avatar';
import Scanner from '../../shared/scanner';
import KeyboardAwareScrollView from '../../shared/toolBox/keyboardAwareScrollView';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';
import {
  accountFollowed as accountFollowedAction,
  accountEdited as accountEditedAction,
} from '../../../actions/accounts';
import { P, Small } from '../../shared/toolBox/typography';
import { decodeLaunchUrl } from '../../../utilities/qrCode';
import { tokenMap } from '../../../constants/tokens';
import HeaderBackButton from '../../screens/router/headerBackButton';
import { validateAddress } from '../../../utilities/validators';

@connect(
  state => ({ accounts: state.accounts.followed, activeToken: state.settings.token.active }),
  { accountFollowed: accountFollowedAction, accountEdited: accountEditedAction }
)
class AddToBookmark extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', '');
    const onBack = navigation.getParam('action', false);
    return {
      title,
      headerLeft: props => (
        <HeaderBackButton
          {...props}
          onPress={onBack || props.onPress}
          icon={onBack ? false : 'cross'}
        />
      ),
    };
  };

  activeInputRef = null;
  validateLabel = str => {
    if (str === '') {
      return -1;
    }
    return str.length > 20 ? 1 : 0;
  };
  scannedData = {};
  state = {
    editMode: false,
    header: true,
    address: {
      value: '',
      validity: 0,
    },
    label: {
      value: '',
      validity: 0,
    },
    avatarPreview: false,
  };

  componentDidMount() {
    const { navigation, accounts, activeToken } = this.props;
    const account = navigation.getParam('account', null);
    if (!account) {
      setTimeout(() => {
        this.addressRef.focus();
      }, 300);
    } else {
      const editMode = accounts[activeToken].filter(item => item.address === account.address).length > 0;
      this.setState({
        editMode,
        label: { value: account.label || '' },
        incomingData: account,
      });
      setTimeout(() => {
        if (this.labelRef) this.labelRef.focus();
      }, 300);
    }

    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressedAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressedAndroid);
  }

  onBackButtonPressedAndroid = () => {
    const action = this.props.navigation.getParam('action', false);
    if (action && typeof action === 'function') {
      action();
      return true;
    }
    return false;
  };

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
    this.addressRef.focus();
  };

  onCloseScanner = () => {
    this.props.navigation.setParams({
      action: false,
    });
  };

  setAddress = value => {
    clearTimeout(this.avatarPreviewTimeout);
    if (validateAddress(this.props.activeToken, value) === 0) {
      this.setAvatarPreviewTimeout();
    }
    this.setState({
      address: { value },
      avatarPreview: false,
    });
  };

  setLabel = value => {
    this.setState({
      label: {
        value,
        validity: this.validateLabel(value),
      },
    });
  };

  submitForm = () => {
    const {
      accountFollowed,
      navigation,
      accountEdited,
      activeToken,
    } = this.props;
    const { address, label, incomingData, editMode } = this.state;
    const addressValidity = validateAddress(activeToken, address.value);
    const labelValidity = this.validateLabel(label.value);
    if (incomingData && labelValidity === 0) {
      const action = editMode ? accountEdited : accountFollowed;
      action(incomingData.address, this.state.label.value);
      navigation.goBack();
    } else if (addressValidity === 0 && labelValidity === 0) {
      accountFollowed(address.value, label.value);
      navigation.goBack();
    } else {
      this.setState({
        address: {
          value: address.value,
          validity: addressValidity,
        },
        label: {
          value: label.value,
          validity: labelValidity,
        },
      });
    }
  };

  render() {
    const { navigation, styles, t, lng, activeToken } = this.props;
    const { address, label, incomingData, editMode } = this.state;
    const shouldDisplayAvatar = activeToken === tokenMap.LSK.key;
    const errors = {
      label: t('The label must be shorter than 20 characters.'),
      address: t('Invalid address.'),
    };
    const setError = (validity, fieldName) => {
      switch (validity) {
        case 1:
          return errors[fieldName];
        case -1:
          return t('This field is required.');
        default:
          return '';
      }
    };

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <Scanner
          ref={el => {
            this.scanner = el;
          }}
          navigation={navigation}
          readFromCameraRoll={true}
          onQRCodeRead={this.onQRCodeRead}
          onClose={this.onCloseScanner}
          permissionDialogTitle={t('Permission to use camera')}
          permissionDialogMessage={t('Lisk needs to connect to your camera')}
        />
        <KeyboardAwareScrollView
          onSubmit={this.submitForm}
          button={{
            title: editMode ? t('Save changes') : t('Add to bookmarks'),
          }}
          styles={{
            container: styles.container,
            innerContainer: styles.innerContainer,
          }}
        >
          <View style={styles.form}>
            {!incomingData ? (
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
                  iconSize={18}
                  color={colors.light.ultramarineBlue}
                />
                {shouldDisplayAvatar ? (
                  <Avatar
                    style={styles.avatar}
                    address={address.value}
                    size={24}
                  />
                ) : null}
                <Input
                  label={t('Address')}
                  reference={input => {
                    this.addressRef = input;
                  }}
                  autoCorrect={false}
                  innerStyles={{
                    errorMessage: styles.errorMessage,
                    input: [
                      styles.input,
                      styles.addressInput,
                      shouldDisplayAvatar ? styles.addressInputWithAvatar : {},
                    ],
                    containerStyle: styles.addressInputContainer,
                  }}
                  onChange={this.setAddress}
                  value={address.value}
                  error={setError(address.validity, 'address')}
                  onFocus={() => {
                    this.activeInputRef = 0;
                  }}
                />
              </View>
            ) : (
              <View style={styles.row}>
                <P style={[styles.label, styles.theme.label]}>Address</P>
                <View style={styles.staticAddressContainer}>
                  {shouldDisplayAvatar ? (
                    <Avatar
                      address={incomingData.address || ''}
                      style={styles.staticAvatar}
                      size={35}
                    />
                  ) : null}
                  <Small style={[styles.address, styles.theme.address]}>
                    {incomingData.address}
                  </Small>
                </View>
              </View>
            )}
            <Input
              label={t('Label')}
              reference={input => {
                this.labelRef = input;
              }}
              autoCorrect={false}
              innerStyles={{ input: styles.input }}
              multiline={false}
              onChange={this.setLabel}
              error={setError(label.validity, 'label')}
              value={label.value}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(AddToBookmark), getStyles());
