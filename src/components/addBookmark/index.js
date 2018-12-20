import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import { IconButton } from '../toolBox/button';
import Icon from '../toolBox/icon';
import reg from '../../constants/regex';
import Input from '../toolBox/input';
import { colors } from '../../constants/styleGuide';
import Avatar from '../avatar';
import Scanner from '../scanner';
import KeyboardAwareScrollView from '../toolBox/keyboardAwareScrollView';
import withTheme from '../withTheme';
import getStyles from './styles';
import {
  accountFollowed as accountFollowedAction,
  accountEdited as accountEditedAction,
} from '../../actions/accounts';
import { P, Small } from '../toolBox/typography';
import { decodeLaunchUrl } from '../../utilities/qrCode';

@connect(state => ({
  accounts: state.accounts.followed,
}), {
  accountFollowed: accountFollowedAction,
  accountEdited: accountEditedAction,
})
class AddToBookmark extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: params.title || '',
    };
  };

  activeInputRef = null;
  validator = {
    address: (str) => {
      if (str === '') return 2;
      return reg.address.test(str) ? 0 : 1;
    },
    label: (str) => {
      if (str === '') return 2;
      return (str.length > 20 ? 1 : 0);
    },
  };

  scannedData = {};
  state = {
    editMode: false,
    header: true,
    address: {
      value: '',
      validity: -1,
    },
    label: {
      value: '',
      validity: -1,
    },
    avatarPreview: false,
  };

  componentDidMount() {
    const { navigation, accounts } = this.props;
    const account = navigation.getParam('account', null);
    if (!account) {
      setTimeout(() => {
        this.addressRef.focus();
      }, 300);
    } else {
      const editMode = accounts.filter(item => item.address === account.address).length > 0;
      this.setState({
        editMode,
        label: { value: account.label || '' },
        incomingData: account,
      });
      setTimeout(() => {
        if (this.labelRef) this.labelRef.focus();
      }, 300);
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
    this.addressRef.focus();
  }

  setAddress = (value) => {
    clearTimeout(this.avatarPreviewTimeout);
    if (this.validator.address(value) === 0) {
      this.setAvatarPreviewTimeout();
    }
    this.setState({
      address: {
        value,
      },
      avatarPreview: false,
    });
  }

  setLabel = (value) => {
    this.setState({
      label: {
        value,
        validity: this.validator.label(value),
      },
    });
  }

  submitForm = () => {
    const { accountFollowed, navigation, accountEdited } = this.props;
    const {
      address, label, incomingData, editMode,
    } = this.state;
    const addressValidity = this.validator.address(address.value);
    const labelValidity = this.validator.label(label.value);
    if (incomingData && labelValidity === 0) {
      const action = editMode ? accountEdited : accountFollowed;
      action(
        incomingData.address,
        this.state.label.value,
      );
      navigation.goBack();
    } else if (addressValidity === 0 && labelValidity === 0) {
      accountFollowed(address.value, label.value);
      navigation.goBack();
    } else {
      this.setState({
        address: {
          value: address.value, validity: addressValidity,
        },
        label: {
          value: label.value, validity: labelValidity,
        },
      });
    }
  }

  render() {
    const {
      navigation, theme, styles,
    } = this.props;
    const {
      address, avatarPreview, label, incomingData, editMode,
    } = this.state;

    const errors = {
      label: 'The label must be shorter than 20 characters.',
      address: 'Invalid address',
    };

    const setError = (validity, fieldName) => {
      switch (validity) {
        case 1:
          return errors[fieldName];
        case 2:
          return `${fieldName} is required`;
        default:
          return '';
      }
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
            onSubmit={this.submitForm}
            button={{
              title: editMode ? 'Save changes' : 'Add to bookmarks',
            }}
            styles={{ container: styles.container, innerContainer: styles.innerContainer }}
          >
          <View style={styles.form}>
            {
              !incomingData ? <View style={styles.addressContainer}>
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
                  label='Address'
                  reference={(input) => { this.addressRef = input; }}
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
                  error={setError(address.validity, 'address')}
                  onFocus={() => { this.activeInputRef = 0; }}
                />
              </View> :
              <View style={styles.row}>
                <P style={[styles.label, styles.theme.label]}>Address</P>
                <View style={styles.staticAddressContainer}>
                  <Avatar address={incomingData.address || ''} style={styles.staticA} size={35}/>
                  <Small style={[styles.address, styles.theme.address]}>
                    {incomingData.address}
                  </Small>
                </View>
              </View>
            }
            <Input
              label='Label'
              reference={(input) => { this.labelRef = input; }}
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

export default withTheme(AddToBookmark, getStyles());
