import React from 'react';
import { View, Linking, ScrollView } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import { transactionAdded as transactionAddedAction } from '../../../actions/transactions';
import FormattedNumber from '../../formattedNumber';
import { toRawLsk, fromRawLsk } from '../../../utilities/conversions';
import { SecondaryButton } from '../../toolBox/button';
import Avatar from '../../avatar';
import Icon from '../../toolBox/icon';
import { H4, B, P, A, Small } from '../../toolBox/typography';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { colors } from '../../../constants/styleGuide';
import { deviceHeight, SCREEN_HEIGHTS } from '../../../utilities/device';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const getTranslatedMessages = t => ({
  initialize: {
    title: t('Initialize your account'),
    subtitle: t('By initializing your account, you are taking an additional step towards securing your account.'),
    button: t('Initialize now'),
    reference: t('Account initialization'),
  },
  send: {
    title: t('Ready to send'),
    subtitle: t('You are about to send LSK tokens to the following address.'),
    button: t('Send now'),
  },
});

@connect(null, {
  transactionAdded: transactionAddedAction,
})
class Overview extends React.Component {
  state = {
    initialize: false,
    errorMessage: null,
    busy: false,
  }

  componentDidMount() {
    const { t, prevStep, navigation } = this.props;
    const { send, initialize } = getTranslatedMessages(t);

    let nextNavigationParams = {
      title: send.title,
      action: () => prevStep(),
      showButtonLeft: true,
    };

    if (navigation.state.params.initialize) {
      this.setState({
        initialize: true,
      });

      nextNavigationParams = {
        title: initialize.title,
        action: navigation.back,
        showButtonLeft: false,
      };
    }

    navigation.setParams({
      ...nextNavigationParams,
      initialize: false,
    });
  }

  componentDidUpdate(prevProps) {
    const { t, lng, navigation } = this.props;

    if (prevProps.lng !== lng) {
      const { initialize, send } = getTranslatedMessages(t);

      navigation.setParams({
        title: navigation.state.params.initialize ? initialize : send,
      });
    }
  }

  componentWillUnmount() {
    const { t, navigation: { setParams } } = this.props;
    setParams({ title: t('Send') });
  }


  send = () => {
    this.setState({ busy: true });

    const {
      accounts, nextStep, transactionAdded, t,
      sharedData: {
        amount, address, reference, secondPassphrase, fee,
      },
    } = this.props;

    transactionAdded({
      recipientAddress: address,
      amount: toRawLsk(amount),
      fee,
      passphrase: accounts.passphrase,
      secondPassphrase,
      reference,
    }, nextStep, (err) => {
      this.setState({ errorMessage: err.message || t('An error happened. Please try later.') });
    });
  }

  openAcademy = () => {
    Linking.openURL('https://help.lisk.io/account-security/should-i-initialize-my-lisk-account')
      // eslint-disable-next-line no-console
      .catch(err => console.error('An error occurred', err));
  }

  render() {
    const {
      t,
      styles,
      navigation,
      settings,
      accounts: { followed },
      sharedData: {
        address, amount, reference, fee,
      },
    } = this.props;

    const actionType = navigation.state.params.initialize || this.state.initialize ?
      'initialize' : 'send';

    const translatedMessages = getTranslatedMessages(t);
    const bookmark = followed.find(item => item.address === address);

    return (
      <ScrollView
        style={[styles.container, styles.theme.container]}
        contentContainerStyle={styles.innerContainer}
      >
        <View>
          {!isSmallScreen ? (
            <P style={styles.theme.subtitle}>
              {translatedMessages[actionType].subtitle}

              {actionType === 'initialize' ? (
                <A style={[styles.link, styles.theme.link]} onPress={this.openAcademy}>
                  {t('Read more')}
                </A>
              ) : ''}
            </P>
          ) : null}

          <View style={[styles.row, styles.theme.row, styles.addressContainer]}>
            <Avatar address={address || ''} style={styles.avatar} size={50} />

            {bookmark ? (
              <H4 style={styles.theme.text}>
                {bookmark.label}
              </H4>
            ) : null}

            <P style={[styles.text, styles.theme.text, styles.address]}>
              {address}
            </P>
          </View>

          <View style={[styles.row, styles.theme.row]}>
            <Icon
              name={actionType === 'initialize' ? 'tx-fee' : 'amount'}
              style={styles.icon}
              size={20}
              color={colors[this.props.theme].gray2}
            />

            <View style={styles.rowContent}>
              <P style={[styles.label, styles.theme.label]}>
                {actionType === 'initialize' ? t('Transaction Fee') : t('Amount')}
              </P>
              <B style={[styles.text, styles.theme.text]}>
                <FormattedNumber
                  tokenType={settings.token.active}
                >
                  {amount}
                </FormattedNumber>
              </B>
            </View>
          </View>

          {actionType !== 'initialize' ? (
            <View style={[styles.row, styles.theme.row]}>
              <Icon
                name='tx-fee'
                style={styles.icon}
                size={20}
                color={colors[this.props.theme].gray2}
              />

              <View style={styles.rowContent}>
                <P style={[styles.label, styles.theme.label]}>
                  {t('Transaction Fee')}
                </P>
                <B style={[styles.text, styles.theme.text]}>
                  <FormattedNumber
                    tokenType={settings.token.active}
                  >
                    {fromRawLsk(fee)}
                  </FormattedNumber>
                </B>
              </View>
            </View>
          ) : null}

          {reference ? (
            <View style={[styles.row, styles.theme.row]}>
              <Icon
                name='reference'
                style={styles.icon}
                size={20}
                color={colors[this.props.theme].gray2}
              />

              <View style={styles.rowContent}>
                <P style={[styles.label, styles.theme.label]}>
                  {t('Reference')}
                </P>
                <B style={[styles.text, styles.theme.text]}>
                  {reference}
                </B>
              </View>
            </View>
          ) : null}
        </View>

        <View>
          <View style={[styles.errorContainer, this.state.errorMessage ? styles.visible : null]}>
            <Icon
              size={16}
              name='warning'
              style={styles.errorIcon}
            />

            <Small style={styles.error}>
              {this.state.errorMessage}
            </Small>
          </View>

          <SecondaryButton
            disabled={this.state.busy}
            style={styles.button}
            onClick={this.send}
            title={translatedMessages[actionType].button}
          />
        </View>
      </ScrollView>
    );
  }
}

export default withTheme(translate()(Overview), getStyles());
