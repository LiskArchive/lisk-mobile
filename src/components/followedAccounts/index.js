import React, { Fragment } from 'react';
import connect from 'redux-connect-decorator';
import { FormLabel } from 'react-native-elements';
import List from './list';
import Empty from './empty';
import Modal from '../followedAccountsModal';

/**
 * The container component containing login and create account functionality
 *
 * @todo
 */
@connect(state => ({
  accounts: state.accounts,
}), {})
class FollowedAccounts extends React.Component {
  state = {
    modalVisible: false,
    account: null,
  }

  toggleModal(address) {
    this.setState({
      modalVisible: !this.state.modalVisible,
      account: this.props.accounts.followed.filter(item => item.address === address)[0],
    });
  }

  render() {
    const { accounts } = this.props;
    const { modalVisible, account } = this.state;
    return (<Fragment>
      {
        accounts.followed.length === 0 ?
          <Empty /> :
          <Fragment>
            <FormLabel>Followed Accounts</FormLabel>
            <List
              edit={this.toggleModal.bind(this)}
              navigate={this.props.navigation.navigate}
              followedAccounts={accounts.followed} />
            <Modal
              hide={this.toggleModal.bind(this)}
              address={account ? account.address : null}
              label={account ? account.label : null}
              isVisible={modalVisible}/>
          </Fragment>
      }
    </Fragment>);
  }
}

export default FollowedAccounts;
