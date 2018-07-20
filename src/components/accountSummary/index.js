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
import stripes from '../../assets/images/stripes.png';

const { width } = Dimensions.get('window');

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
        <View style={styles.container}>
          <View style={[styles.row, styles.avatar]}>
            <Avatar address={account.address} size={80} />
          </View>
          <View style={[styles.row, styles.address]}>
            <CopyToClipBoard type={P} style={styles.addressP}
              value={account.address} icon={false} />
          </View>
          <View style={[styles.row, styles.balance]}>
            <H2 style={styles.value}>
              <FormattedNumber>{fromRawLsk(account.balance)}</FormattedNumber>
            </H2>
            <H2 style={styles.unit}>Ⱡ</H2>
          </View>
          <View style={styles.box} />
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
