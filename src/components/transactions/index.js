import React, { Fragment } from 'react';
import { View } from 'react-native';
import List from './list';
import Footer from './footer';
import { H3, Small, A } from '../toolBox/typography';
import styles from './styles';
import { fromRawLsk } from '../../utilities/conversions';
import Icon from '../toolBox/icon';
import colors from '../../constants/styleGuide/colors';


/**
 * The container component containing login and create account functionality
 *
 * @todo
 */
class Transactions extends React.Component {
  render() {
    const {
      transactions, navigate, account, footer,
    } = this.props;
    const balance = parseFloat(fromRawLsk(account.balance));
    return (<View style={styles.container}>
      {
        (!transactions ||
          (transactions.confirmed.length === 0 && transactions.pending.length === 0)) ?
          <Fragment></Fragment> :
          <Fragment>
            <H3 style={styles.title}>Activity</H3>
            {!account.initialized && balance >= 0.1 ?
              <View style={styles.initContainer}>
                <Icon name='warning' color={colors.action1} size={18} />
                <Small style={styles.initText}>Your Lisk ID is not initialized.
                  <A
                    style={styles.link}
                    onPress={() => {
                      navigate('Send', { initialize: true });
                    }}> Initialize it now</A>
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
    </View>);
  }
}

export default Transactions;
