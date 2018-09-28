import React, { Fragment } from 'react';
import { View, Animated } from 'react-native';
import List from './list';
import Footer from './footer';
import { H3, Small, A } from '../toolBox/typography';
import styles from './styles';
import { fromRawLsk } from '../../utilities/conversions';
import Icon from '../toolBox/icon';
import colors from '../../constants/styleGuide/colors';
import easing from '../../utilities/easing';


/**
 * The container component containing login and create account functionality
 *
 * @todo
 */
class Transactions extends React.Component {
  state = {
    initialAnimations: {
      opacity: new Animated.Value(0),
      top: new Animated.Value(20),
    },
  }

  componentDidMount() {
    this.initialFadeIn();
  }

  initialFadeIn = () => {
    const { opacity, top } = this.state.initialAnimations;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay: 100,
    }).start();
    Animated.timing(top, {
      toValue: 0,
      duration: 400,
      delay: 100,
      easing: easing.easeInOutQuart,
    }).start();
  }

  onPress = () => {
    this.props.navigate('Send', { initialize: true });
  }

  render() {
    const {
      transactions, navigate, account, footer,
    } = this.props;
    const balance = parseFloat(fromRawLsk(account.balance));
    const Anim = Animated.View;
    const { opacity, top } = this.state.initialAnimations;

    return (<Anim style={[styles.container, { opacity, top }]}>
      {
        (!transactions ||
          (transactions.confirmed.length === 0 && transactions.pending.length === 0)) ?
          <Fragment></Fragment> :
          <Fragment>
            <H3 style={styles.title}>Activity</H3>
            {!account.initialized && balance >= 0.2 ?
              <View style={styles.initContainer}>
                <Icon name='warning' color={colors.action1} size={18} />
                <Small style={styles.initText}>Your account is not initialized.
                  <A
                    style={styles.link}
                    onPress={this.onPress}> Initialize it now</A>
                </Small>
              </View> : null
            }
            <List
              navigate={navigate}
              account={account.address}
              pending={transactions.pending}
              transactions={transactions.confirmed} />
            {
              footer ? <Footer /> : null
            }
          </Fragment>
      }
    </Anim>);
  }
}

export default Transactions;
