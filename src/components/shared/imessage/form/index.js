import React, { Component, Fragment } from 'react'
import { Text, View, Picker } from 'react-native'
import reg from 'constants/regex'
import { colors } from 'constants/styleGuide'
import { PrimaryButton, IconButton } from '../../toolBox/button'
import Icon from '../../toolBox/icon'
import Input from '../../toolBox/input'
import Avatar from '../../avatar'
import { P, Small } from '../../toolBox/typography'
import styles from './styles'

class LiskMessageExtension extends Component {
  state = {
    address: {
      value: '',
      validity: -1,
    },
    amount: {
      validity: -1,
    },
    avatarPreview: false,
    num: [0, 0, 0, 0],
  }

  validator = {
    address: (str) => {
      if (str === '') return 2
      return reg.address.test(str) ? 0 : 1
    },
  }

  componentDidMount() {
    const { MessagesEvents, inputAddress } = this.props
    MessagesEvents.addListener('didStartSendingMessage', this.onStartSendingMessage)
    this.setAddress(inputAddress.value)
  }

  onStartSendingMessage = () => {
    this.setState(
      {
        num: [0, 0, 0, 0],
      },
      () => this.setAddress(this.props.inputAddress.value)
    )
  }

  setAddress = (value) => {
    clearTimeout(this.avatarPreviewTimeout)
    const validity = this.validator.address(value)

    if (validity === 0) {
      this.setAvatarPreviewTimeout()
    }

    this.setState({
      address: {
        value,
        validity,
      },
      avatarPreview: false,
    })
  }

  changePicker = (itemValue, itemIndex) => {
    this.setState({
      amount: { validity: -1 },
      num: this.state.num.map((item, index) => (index === itemIndex ? itemValue : item)),
    })
  }

  setAvatarPreviewTimeout = () => {
    this.avatarPreviewTimeout = setTimeout(() => {
      this.setState({
        avatarPreview: true,
      })
    }, 300)
  }

  send = () => {
    const { composeMessage, inputAddress } = this.props
    const { num, address } = this.state
    const firstDigit = parseInt(num[0], 10) > 0 ? num[0] : ''

    const amount = `${firstDigit}${num[1]}.${num[2]}${num[3]}`
    if (parseFloat(amount) > 0) {
      composeMessage({
        address: address.value.length === 0 ? inputAddress : address,
        amount,
      })
    } else {
      this.setState({
        amount: {
          validity: 0,
        },
      })
    }
  }

  render() {
    const { address, avatarPreview, num, amount } = this.state

    const { inputAddress, keyBoardFocused, presentationStyle } = this.props

    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const pickerActiveColor =
      amount.validity === -1 ? colors.light.black : colors.light.burntSieanna

    return (
      <Fragment>
        <View>
          <P style={styles.title}>Request LSK</P>
        </View>
        <View style={styles.rowContainer}>
          <Small style={styles.pickerCurrency}>LSK</Small>
          <View style={styles.innerContainer}>
            <Text style={[styles.pickerPoint, { color: pickerActiveColor }]}>.</Text>
            {num.map((val, index) => (
              <Picker
                key={index}
                selectedValue={num[index]}
                style={styles.pickers}
                itemStyle={styles.pickerItem}
                itemTextStyle={{ fontSize: 18, color: 'blue' }}
                onValueChange={(itemValue) => this.changePicker(itemValue, index)}
              >
                {data.map((item) => (
                  <Picker.Item
                    key={item}
                    label={item.toString()}
                    value={item}
                    color={num[index] === item ? pickerActiveColor : 'rgba(0, 0, 0, 0.3)'}
                  />
                ))}
              </Picker>
            ))}
          </View>
        </View>
        <View style={styles.errorContainer}>
          <Small style={styles.pickerError}>
            {amount.validity === -1 ? '' : 'amount should be greater than 0'}
          </Small>
        </View>
        <View style={styles.addressContainer}>
          {avatarPreview && this.props.avatarPreview ? (
            <Avatar style={styles.avatar} address={address.value || inputAddress.value} size={30} />
          ) : (
            <Icon
              style={styles.avatar}
              name="avatar-placeholder"
              size={34}
              color={colors.light.mystic}
            />
          )}
          <Input
            autoCorrect={false}
            placeholder="Enter a address"
            reference={(input) => {
              this.input = input
            }}
            onChange={this.setAddress}
            onFocus={keyBoardFocused}
            value={address.value || inputAddress.value}
            error={address.validity === 1 ? 'Invalid address.' : ''}
            innerStyles={{
              errorMessage: styles.errorMessage,
              input: [styles.input, styles.addressInput],
              containerStyle: styles.addressInputContainer,
            }}
          />
          {presentationStyle === 'compact' ? (
            <IconButton
              style={styles.iconButton}
              title=""
              icon={'forward'}
              color={colors.light.white}
              iconSize={20}
              onClick={this.send}
            />
          ) : null}
        </View>
        {presentationStyle === 'expanded' ? (
          <PrimaryButton
            style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}
            title="Request"
            onClick={this.send}
          />
        ) : null}
      </Fragment>
    )
  }
}

export default LiskMessageExtension
