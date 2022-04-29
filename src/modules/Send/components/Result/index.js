import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { A, B, P } from 'components/shared/toolBox/typography';
import withTheme from 'components/shared/withTheme';
import { themes } from 'constants/styleGuide';
import TxSuccesSvg from 'assets/svgs/TxSuccesSvg';
import TxSuccessDarkSvg from 'assets/svgs/TxSuccessDarkSvg';
import getStyles from './styles';

@connect(
  (state) => ({
    account: state.accounts.info,
    transactions: state.transactions,
    activeToken: state.settings.active,
    followedAccounts: state.accounts.followed
  }),
  {}
)
class Result extends React.Component {
  state = {
    step: 0,
    txConfirmed: false
  };

  animation = [];

  timeouts = {
    created: null,
    confirmed: null
  };

  componentDidMount() {
    const {
      navigation: { setOptions }
    } = this.props;
    setOptions({
      headerShown: false
    });
    this.startDate = new Date();
  }

  componentWillUnmount() {
    const {
      navigation: { setOptions }
    } = this.props;
    clearTimeout(this.timeouts.created);
    clearTimeout(this.timeouts.confirmed);
    setOptions({ title: 'Send', headerShown: true });
  }

  render() {
    const {
      t,
      styles,
      finalCallback,
      reset,
      navigation,
      followedAccounts,
      settings: { token },
      sharedData: { address },
      theme,
    } = this.props;

    const isNotFollowed = !followedAccounts[token.active].some((item) => item.address === address);

    return (
      <View style={[styles.container, styles.theme.container]}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            {theme === themes.dark ? <TxSuccessDarkSvg /> : <TxSuccesSvg />}
          </View>
          <B style={[styles.title, styles.theme.title]}>{t('Transaction Submitted')}</B>
          <P style={[styles.subtitle, styles.theme.subtitle]}>
            {t(
              'Your transaction has been submitted and will be confirmed in a few moments.'
            )}
          </P>
        </View>
        <View style={styles.footer}>
          {isNotFollowed && (
            <A
              onPress={() =>
                navigation.navigate({
                  name: 'AddBookmark',
                  params: {
                    title: t('New bookmark'),
                    account: { address }
                  }
                })
              }
              style={styles.anchor}
            >
              {t('Add address to bookmarks')}
            </A>
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
