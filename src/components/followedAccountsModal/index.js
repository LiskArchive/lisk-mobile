import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import Modal from 'react-native-modal';
import { FormLabel, FormInput } from 'react-native-elements';
import {
  accountUnFollowed as accountUnFollowedAction,
  accountEdited as accountEditedAction,
} from '../../actions/accounts';
import { Button } from '../toolBox/button';
import styles from './styles';
import regex from '../../constants/regex';

@connect(state => ({
  accounts: state.accounts,
}), {
  accountUnFollowed: accountUnFollowedAction,
  accountEdited: accountEditedAction,
})
class FAModal extends React.Component {
  state = {
    label: {
      value: '',
      validity: -1,
    },
    address: {
      value: '',
      validity: -1,
    },
  }

  validator = {
    label: str => (str.length > 3 && str.length <= 16),
    address: str => regex.address.test(str),
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isVisible && nextProps.isVisible) {
      const followedAccount = nextProps.accounts.followed.filter(item =>
        item.address === nextProps.address);
      this.setState({
        address: {
          value: nextProps.address || '',
          validity: 0,
        },
        label: {
          value: followedAccount.length ? followedAccount[0].label : '',
          validity: followedAccount.length ? 0 : -1,
        },
        isFollowed: followedAccount.length,
      });
    }
  }

  update() {
    this.props.accountEdited(this.props.address, {
      address: this.state.address.value,
      label: this.state.label.value,
    });
    this.props.hide();
  }

  delete() {
    this.props.accountUnFollowed(this.props.address);
    this.props.hide();
  }

  /**
   * @param {String} name - the key to set on state
   * @param {Any} value the Value corresponding the given key
   *
   * @returns {Number} - -1 for clean, 0 for valid, 1 for invalid
   */
  changeHandler = (name, value) => {
    let validity = -1;
    if (value !== '') {
      validity = this.validator[name](value) ? 0 : 1;
    }

    this.setState({
      [name]: {
        value,
        validity,
      },
    });
  }

  render() {
    const { isFollowed } = this.state;
    return (
      <Modal
        backdropColor='black'
        backdropOpacity={0.70}
        style={styles.modal}
        onBackdropPress={() => this.props.hide()}
        isVisible={this.props.isVisible}>
          <View style={styles.modalWrapper}>
            <FormLabel>Editing {
              this.props.label || this.props.address
            }</FormLabel>

            <FormLabel>Address</FormLabel>
            <FormInput
              ref={(input) => { this.addressInput = input; }}
              value={this.state.address.value}
              onChangeText={value => this.changeHandler('address', value)}/>


            <FormLabel>Label (Optional)</FormLabel>
            <FormInput
              ref={(input) => { this.labelInput = input; }}
              value={this.state.label.value}
              onChangeText={value => this.changeHandler('label', value)}/>

            <View style={styles.actionBar}>
              <Button
                onClick={() => this.props.hide()}
                style={[styles.button, styles.cancelButton]}>Cancel</Button>
              <Button
                onClick={this.update.bind(this)}
                style={[styles.button, styles.updateButton]}>{ isFollowed ? 'Update' : 'Follow' }</Button>
              {
                isFollowed ?
                  <Button
                    onClick={this.delete.bind(this)}
                    style={[styles.button, styles.deleteButton]}>Unfollow</Button> : null
              }
            </View>
          </View>
      </Modal>
    );
  }
}

export default FAModal;
