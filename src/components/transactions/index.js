import React, { Fragment } from 'react';
import { View } from 'react-native';
import List from './list';
import Empty from './empty';
import { H1 } from '../toolBox/typography';
import styles from './styles';

/**
 * The container component containing login and create account functionality
 *
 * @todo
 */
class Transactions extends React.Component {
  render() {
    const { transactions, navigate, account } = this.props;

    return (<View style={styles.container}>
      {
        (!transactions ||
          (transactions.confirmed.length === 0 && transactions.pending.length === 0)) ?
          <Empty /> :
          <Fragment>
            <H1>Activity</H1>
            <List
              navigate={navigate}
              account={account}
              pending={transactions.pending}
              transactions={transactions.confirmed} />
          </Fragment>
      }
    </View>);
  }
}

export default Transactions;
