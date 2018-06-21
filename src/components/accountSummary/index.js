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
import styles from './styles';
import FormattedNumber from '../formattedNumber';

@connect(state => ({
  followedAccounts: state.accounts.followed,
}), {
  accountFollowed: accountFollowedAction,
  accountUnFollowed: accountUnFollowedAction,
})
class AccountSummary extends React.Component {
  toggleFollow(address) {
    const {
      account, followedAccounts, accountFollowed, accountUnFollowed,
    } = this.props;
    if (!followedAccounts.includes(account.address)) {
      accountFollowed(address);
    } else {
      accountUnFollowed(address);
    }
  }

  render() {
    const { account, followedAccounts, children } = this.props;
    const iconName = followedAccounts.includes(account.address) ? 'star' : 'star-o';
    return (<View>
      {
        account && account.address ?
        <View style={styles.container}>
          { children }
          <Avatar address={account.address} size={200}/>
          <Text style={styles.address}>{ account.address }</Text>
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
            onPress={this.toggleFollow.bind(this, account.address)} />
        </View> :
        <Text h4>Fetching account info</Text>
      }
    </View>);
  }
}

export default AccountSummary;
