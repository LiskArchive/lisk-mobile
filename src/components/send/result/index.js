import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { PrimaryButton } from '../../toolBox/button';
import { A, P } from '../../toolBox/typography';
import withTheme from '../../withTheme';
import getStyles from './styles';

@connect(state => ({
  account: state.accounts.info,
  transactions: state.transactions,
  activeToken: state.settings.active,
  followedAccounts: state.accounts.followed,
}), {})
class Result extends React.Component {
  componentDidMount() {
    const { reset, navigation: { setParams } } = this.props;
    setParams({
      title: 'Sent',
      showButtonLeft: false,
      action: reset,
    });
    this.startDate = new Date();
  }

  componentWillUnmount() {
    const { navigation: { setParams } } = this.props;
    setParams({ title: 'Send' });
  }

  render() {
    const {
      t, styles, finalCallback, reset, navigation,
      followedAccounts, settings: { token }, sharedData: { address },
    } = this.props;

    const isNotFollowed = !followedAccounts[token.active].some(item => item.address === address);

    return (
      <View style={[styles.container, styles.theme.container]}>
        <P style={styles.theme.subtitle}>
          {t('Thank you. Your transaction is being processed. It may take up to 15 minutes to be secured on the blockchain.')}
        </P>
        <View style={styles.footer}>
          {isNotFollowed && (
            <A onPress={() => navigation.navigate('AddBookmark', { title: t('New bookmark'), account: { address } })} style={styles.anchor}>{t('Add address to bookmarks')}</A>
          )}
          <PrimaryButton
            style={styles.button}
            onClick={() => {
              finalCallback();
              reset();
            }}
            title={t('Continue')}
          />
        </View>
      </View>
    );
  }
}

export default withTheme(translate()(Result), getStyles());
