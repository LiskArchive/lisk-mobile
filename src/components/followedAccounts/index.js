import React, { Fragment } from 'react';
import connect from 'redux-connect-decorator';
import { FormLabel } from 'react-native-elements';
import List from './list';
import Empty from './empty';

/**
 * The container component containing login and create account functionality
 *
 * @todo
 */
@connect(state => ({
  accounts: state.accounts,
}), {})
class FollowedAccounts extends React.Component {
  render() {
    const { accounts } = this.props;
    return (<Fragment>
      {
        accounts.followed.length === 0 ?
          <Empty /> :
          <Fragment>
            <FormLabel>Followed Accounts</FormLabel>
            <List
              navigate={this.props.navigation.navigate}
              followedAccounts={accounts.followed} />
          </Fragment>
      }
    </Fragment>);
  }
}

export default FollowedAccounts;
