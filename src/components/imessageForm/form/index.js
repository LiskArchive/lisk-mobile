import React, { Component, Fragment } from 'react';
import {
  Text,
  View,
  Picker,
} from 'react-native';
import { SecondaryButton, IconButton } from '../../toolBox/button';
import Icon from '../../toolBox/icon';
import reg from '../../../constants/regex';
import { colors } from '../../../constants/styleGuide';
import Input from '../../toolBox/input';
import Avatar from '../../avatar/index';
import styles from './styles';

class LiskMessageExtension extends Component {
  state = {
    account: 'yashar',
    address: {
      value: '',
      validity: -1,
    },
    avatarPreview: false,
    num: [0, 0, 0, 0],
  };

  validator = {
    address: (str) => {
      if (str === '') return 2;
      return reg.address.test(str) ? 0 : 1;
    },
  };

  setAddress = (value) => {
    clearTimeout(this.avatarPreviewTimeout);
    const validity = this.validator.address(value);
    if (validity === 0) {
      this.setAvatarPreviewTimeout();
    }
    this.setState({
      address: {
        value,
        validity,
      },
      avatarPreview: false,
    });
  };

  changePicker = (itemValue, itemIndex) => {
    this.setState({
      num: this.state.num.map((item, index) =>
        (index === itemIndex ? itemValue : item)),
    });
  };

  setAvatarPreviewTimeout = () => {
    this.avatarPreviewTimeout = setTimeout(() => {
      this.setState({
        avatarPreview: true,
      });
    }, 300);
  };

  componentDidMount() {
    this.props.MessagesEvents.addListener(
      'didStartSendingMessage',
      () => this.setState({
        num: [0, 0, 0, 0],
        address: this.props.inputAddress,
      }),
    );
  }

  render() {
    const {
      address, avatarPreview, num,
    } = this.state;

    const {
      composeMessage, inputAddress, keyBoardFocused, presentationStyle,
    } = this.props;

    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const send = () => composeMessage({
      address: address.value.length === 0 ? inputAddress : address,
      amount: `${num[0]}${num[1]}.${num[2]}${num[3]}`,
    });


    return (
      <Fragment>
        <View style={styles.rowContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.pickerPoint}>.</Text>
            {num.map((val, index) => (
              <Picker
                key={index}
                selectedValue={num[index]}
                style={styles.pickers}
                itemStyle={styles.pickerItem}
                itemTextStyle={{ fontSize: 18, color: 'blue' }}
                onValueChange={itemValue =>
                  this.changePicker(itemValue, index)
                }
              >
                {data.map(item => (
                  <Picker.Item
                    key={item}
                    label={item.toString()}
                    value={item}
                    color={num[index] === item ? '#000' : 'rgba(0, 0, 0, 0.3)'}
                  />
                ))}
              </Picker>
            ))}
          </View>
        </View>
        <View style={styles.addressContainer}>
          {
            avatarPreview || this.props.avatarPreview ?
              <Avatar
                style={styles.avatar}
                address={address.value || inputAddress.value}
                size={34}
              /> :
              <Icon
                style={styles.avatar}
                name='avatar-placeholder'
                size={34}
                color={colors.light.gray5}
              />
          }
          <Input
            autoCorrect={false}
            placeholder='Enter a address'
            reference={(input) => {
              this.input = input;
            }}
            onChange={this.setAddress}
            onFocus={keyBoardFocused}
            value={address.value || inputAddress.value}
            error={address.validity === 1 ? 'Invalid address' : ''}

            innerStyles={{
              errorMessage: styles.errorMessage,
              input: [
                styles.input,
                styles.addressInput,
              ],
              containerStyle: styles.addressInputContainer,
            }}
          />
          {
            presentationStyle === 'compact' ?
              <IconButton
                style={styles.iconButton}
                title=''
                icon={'forward'}
                color={colors.light.white}
                iconSize={20}
                onClick={send} /> : null
          }
        </View>
        {
          presentationStyle === 'expanded' ?
            <SecondaryButton
              style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}
              title="Request"
              onClick={send}
            /> : null
        }

      </Fragment>
    );
  }
}

export default LiskMessageExtension;
