import React from 'react';
import { View, Image, Animated, Dimensions } from 'react-native';
import connect from 'redux-connect-decorator';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction,
} from '../../actions/accounts';
import Avatar from '../avatar';
import { fromRawLsk } from '../../utilities/conversions';
import Modal from '../followedAccountsModal';
import styles, { animationRanges } from './styles';
import FormattedNumber from '../formattedNumber';
import Share from '../share';
import { H4, P, H2 } from '../toolBox/typography';
import easings from '../../utilities/easing';
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
    balanceWidth: 0,
    addressWidth: 0,
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    this.screenWidth = Dimensions.get('window').width;
    this.initialFadeIn();
  }

  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }

  interpolate = (key, props, range = [0, 80]) =>
    props.reduce((interpolated, prop) => {
      interpolated[prop] = this.props.scrollY.interpolate({
        inputRange: range,
        outputRange: animationRanges[key][prop],
        extrapolate: 'clamp',
        easing: easings.easeOutQuad,
      });

      return interpolated;
    }, {});

  setPadding = (e, name) => {
    if (animationRanges[name].left[0] === 33) {
      const { width } = e.nativeEvent.layout;
      animationRanges[name].left[0] = Math.floor((this.screenWidth - width) / 2);
    }
  }

  initialFadeIn = () => {
    Animated.timing(this.state.opacity, {
      toValue: 100,
      duration: 500,
    }).start();
  }

  render() {
    const { account } = this.props;
    const Anim = Animated.View;
    const itpl = this.interpolate;
    const { opacity } = this.state;

    return (<View style={this.props.style}>
      <Anim style={[styles.bg, { opacity }, itpl('bg', ['height'])]}>
        <Image style={styles.bgImage} source={stripes} />
      </Anim>
      {
        account && account.address ?
        <Anim style={[styles.container, itpl('container', ['height'])]}>
          <Anim style={[styles.avatar, { opacity },
            itpl('avatar', ['width', 'height', 'left', 'top'], [0, 35, 70])]}>
            <Avatar address={account.address} size={80} />
          </Anim>
          <Anim onLayout={e => this.setPadding(e, 'address')}
            style={[styles.address, { opacity }, itpl('address', ['top', 'left'])]}>
            <Share type={P} style={styles.addressP}
              containerStyle={styles.addressContainer}
              value={account.address} icon={true} />
          </Anim>
          <Anim onLayout={e => this.setPadding(e, 'balance')}
            style={[styles.balance, { opacity }, itpl('balance', ['top', 'left'])]}>
            <H2 style={styles.value}>
              <FormattedNumber>{fromRawLsk(account.balance)}</FormattedNumber>
            </H2>
            <H2 style={styles.unit}>Ⱡ</H2>
          </Anim>
          <Anim style={[styles.box, itpl('box', ['top', 'height'])]} />
        </Anim> :
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
