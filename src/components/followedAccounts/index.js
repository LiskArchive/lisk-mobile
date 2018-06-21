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
  followedAccounts: state.accounts.followed,
}), {})
class FollowedAccounts extends React.Component {
  state = {
    modalVisible: false,
    address: null,
  }

  toggleModal(address) {
    this.setState({
      modalVisible: !this.state.modalVisible,
      address: address || '',
    });
  }

  render() {
    const { followedAccounts } = this.props;
    const { modalVisible, address } = this.state;
    return (<Fragment>
      {
        followedAccounts.length === 0 ?
          <Empty /> :
          <Fragment>
            <FormLabel>Followed Accounts</FormLabel>
            <List
              edit={this.toggleModal.bind(this)}
              navigate={this.props.navigation.navigate}
              followedAccounts={followedAccounts} />
          </Fragment>
      }
      <Modal
        hide={this.toggleModal.bind(this)}
        address={address}
        isVisible={modalVisible}/>
    </Fragment>);
  }
}

export default FollowedAccounts;
