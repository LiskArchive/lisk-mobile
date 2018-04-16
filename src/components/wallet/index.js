import React from 'react';
import connect from 'redux-connect-decorator';
import { Text, View } from 'react-native';
import BackgroundImage from '../background';
import Logo from '../logo';
import { getNetwork, networks } from '../../utilities/networks';
import Router from '../router';
import { activePeerSet } from '../../actions/peers';
import { getTransactions, getAccount, extractAddress } from '../../utilities/http';
import actionTypes from '../../constants/actions';
import AccountSummary from '../accountSummary';
import Transactions from '../transactions';

@connect(state => ({
  accounts: state.accounts,
  transactions: state.transactions,
}), {
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
  state = {
    account: {},
  }

  componentDidMount() {
    this.address = this.props.navigation.state.params.address;
    this.setTransactions();
    this.setAccount();
  }

  setTransactions() {
    getTransactions({
      senderId: this.address,
      recipientId: this.address,
    }).then((res) => {
      const { transactions, count } = res;
      this.setState({
        transactions: {
          count,
          confirmed: transactions,
          pending: [],
        },
      });
    });
  }

  setAccount() {
    getAccount(this.address)
      .then((account) => {
        this.setState({ account });
      });
  }

  render() {
    return (<View>
      {
        this.state.account ?
          <AccountSummary account={this.state.account} /> : <Text>Loading account</Text>
      }
      
      <Transactions transactions={this.state.transactions}
        account={this.state.account.address} />
    </View>);
  }
}

export default Wallet;
