import React from 'react';
import { View, Image, Animated } from 'react-native';
import connect from 'redux-connect-decorator';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction,
} from '../../actions/accounts';
import Avatar from '../avatar';
import { fromRawLsk } from '../../utilities/conversions';
import Modal from '../followedAccountsModal';
import styles, { consts } from './styles';
import FormattedNumber from '../formattedNumber';
import Share from '../share';
import { H4, P, H2 } from '../toolBox/typography';
import stripes from '../../assets/images/stripes.png';


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

  interpolate(props) {
    return Object.keys(props).reduce((interpolated, key) => {
      interpolated[key] = this.props.scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: props[key],
        extrapolate: 'clamp',
      });

      return interpolated;
    }, {});
  }

  render() {
    const { account } = this.props;
    const itpl = this.interpolate.bind(this);

    return (<View style={this.props.style}>
      <Animated.View style={[
        styles.bg,
        itpl({ height: [consts.bg.expanded, consts.bg.shrunk] }),
      ]}>
        <Image style={styles.bgImage} source={stripes} />
      </Animated.View>
      {
        account && account.address ?
        <Animated.View style={[
          styles.container,
          itpl({
            height: [consts.container.expanded, consts.container.shrunk],
          })]}>
          <Animated.View style={[
            styles.avatar,
            itpl({
              left: [consts.avatar.expanded.left, consts.avatar.shrunk.left],
              top: [consts.avatar.expanded.top, consts.avatar.shrunk.top],
            }),
          ]}>
            <Avatar address={account.address} size={80} />
          </Animated.View>
          <Animated.View style={[
            styles.address,
            itpl({
              top: [consts.address.expanded.top, consts.address.shrunk.top],
              paddingLeft: [consts.address.expanded.paddingLeft, consts.address.shrunk.paddingLeft],
            }),
          ]}>
            <Share type={P} style={styles.addressP}
              containerStyle={styles.addressContainer}
              value={account.address} icon={true} />
          </Animated.View>
          <Animated.View style={[
            styles.balance,
            itpl({
              top: [consts.balance.expanded.top, consts.balance.shrunk.top],
              paddingLeft: [consts.balance.expanded.paddingLeft, consts.balance.shrunk.paddingLeft],
            }),
          ]}>
            <H2 style={styles.value}>
              <FormattedNumber>{fromRawLsk(account.balance)}</FormattedNumber>
            </H2>
            <H2 style={styles.unit}>Ⱡ</H2>
          </Animated.View>
          <Animated.View style={[
            styles.box,
            itpl({
              top: [consts.box.expanded.top, consts.box.shrunk.top],
              height: [consts.box.expanded.height, consts.box.shrunk.height],
            }),
          ]} />
        </Animated.View> :
        <H4>Fetching account info</H4>
      }
      <Modal
        hide={this.toggleModal.bind(this)}
        address={account ? account.address : {}}
        isVisible={this.state.modalVisible}/>
    </View>);
  }
}

export default AccountSummary;
