import React from 'react';
import { View, Text } from 'react-native';
import connect from 'redux-connect-decorator';
import { Icon } from 'react-native-elements';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction,
} from '../../actions/accounts';
import Avatar from '../avatar';
import { fromRawLsk } from '../../utilities/conversions';
import Modal from '../followedAccountsModal';
import styles from './styles';
import FormattedNumber from '../formattedNumber';
import CopyToClipBoard from '../copyToClipboard';

@connect(state => ({
  followedAccounts: state.accounts.followed,
}), {
  accountFollowed: accountFollowedAction,
  accountUnFollowed: accountUnFollowedAction,
})
class AccountSummary extends React.Component {
  state = {
    modalVisible: false,
  }

  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }

  render() {
    const { account, followedAccounts, children } = this.props;
    const followedAccount = followedAccounts.filter(item =>
      item.address === account.address)[0];
    const iconName = (followedAccount && followedAccount.address) ? 'star' : 'star-o';

    return (<View>
      {
        account && account.address ?
        <View style={styles.container}>
          { children }
          <Avatar address={account.address} size={200}/>
          <CopyToClipBoard style={styles.address} value={account.address} icon={false} />
          <Text style={styles.balance}>
            <Text style={styles.value}>
              <FormattedNumber>{fromRawLsk(account.balance)}</FormattedNumber>
            </Text>
            <Text style={styles.unit}>LSK</Text>
          </Text>
          <Icon
            name={iconName}
            type='font-awesome'
            color='#f50'
            onPress={this.toggleModal.bind(this)} />
        </View> :
        <Text h4>Fetching account info</Text>
      }
      <Modal
        hide={this.toggleModal.bind(this)}
        address={account.address}
        isVisible={this.state.modalVisible}/>
    </View>);
  }
}

export default AccountSummary;
