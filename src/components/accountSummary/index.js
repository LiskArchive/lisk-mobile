import React from 'react';
import { View, Image } from 'react-native';
import connect from 'redux-connect-decorator';
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
import { H4, P, H2 } from '../toolBox/typography';
import stripes from '../../assets/images/strapes.png';

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
    const { account } = this.props;

    return (<View style={this.props.style}>
      <View style={styles.bg}>
        <Image style={styles.bgImage} source={stripes} />
      </View>
      {
        account && account.address ?
        <View style={[styles.container, styles.profileShadow]}>
          <View style={styles.row}>
            <Avatar address={account.address} size={80} style={styles.avatar} />
          </View>
          <CopyToClipBoard type={P} style={styles.address} value={account.address} icon={false} />
          <View style={styles.row}>
            <H2 style={styles.value}>
              <FormattedNumber>{fromRawLsk(account.balance)}</FormattedNumber>
            </H2>
            <H2 style={styles.unit}>Ⱡ</H2>
          </View>
        </View> :
        <H4>Fetching account info</H4>
      }
      <Modal
        hide={this.toggleModal.bind(this)}
        address={account.address}
        isVisible={this.state.modalVisible}/>
    </View>);
  }
}

export default AccountSummary;
