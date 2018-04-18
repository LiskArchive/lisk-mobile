import React from 'react';
import { TextInput, Button, Text, ScrollView } from 'react-native';
import List from './list';
import Empty from './empty';

/**
 * The container component containing login and create account functionality
 * 
 * @todo 
 */
class Transactions extends React.Component {
  state = {
    reachEnd: true,
  };

  
  loadMore = ({nativeEvent}) => {

    const { transactions } = this.props;

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 20;
      return (layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom) && this.state.reachEnd;
    };
    if (isCloseToBottom(nativeEvent) && transactions.confirmed.length < transactions.count ) {
      console.log('end');
      this.props.loadMore();
      this.setState({
        reachEnd: false,
      });
    }
  }

  componentWillReceiveProps = () => {
    this.setState({
      reachEnd: true,
    });
  }

  render() {
    const { transactions, navigate, account } = this.props;

    return (<ScrollView onScroll={this.loadMore}
    scrollEventThrottle={400}>
      {
        !transactions || (transactions.count === 0 && transactions.pending.length === 0) ?
          <Empty /> :
          <List
            navigate={navigate}
            account={account}
            pending={transactions.pending}
            transactions={transactions.confirmed} />
      }
    </ScrollView>);
  }
}

export default Transactions;
