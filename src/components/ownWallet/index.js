import React from 'react';
import connect from 'redux-connect-decorator';
import { Text, View } from 'react-native';
import BackgroundImage from '../background';
import Logo from '../logo';
import { getNetwork, networks } from '../../utilities/networks';
import Router from '../router';
import { activePeerSet } from '../../actions/peers';
import { accountsRetrieved } from '../../actions/accounts';
import { transactionsLoaded } from '../../actions/transactions';
import actionTypes from '../../constants/actions';
import AccountSummary from '../accountSummary';
import Transactions from '../transactions';
import extractAddress from '../../utilities/http';

@connect(state => ({
  accounts: state.accounts,
  transactions: state.transactions,
}), {
  transactionsLoaded,
})


/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Login
 *
 * @todo Implement saved language detection
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */
class Wallet extends React.Component {
  componentWillMount() {
    this.activeAccount = this.props.accounts.active;
  }

  componentDidMount() {
    this.props.transactionsLoaded({
      senderId: this.activeAccount.address,
      recipientId: this.activeAccount.address,
    });
  }

  render() {
    return (<View>
      {/* Here we can have a component to show some activity */}
      <Transactions transactions={this.props.transactions}
        navigate={this.props.navigation.navigate}
        account={this.activeAccount.address} />
    </View>);
  }
}

export default Wallet;
