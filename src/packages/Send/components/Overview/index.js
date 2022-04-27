import React from 'react';
import { View, ScrollView } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';

import { SafeAreaView } from 'react-native-safe-area-context';
import FormattedNumber from 'components/shared/formattedNumber';
import { toRawLsk, fromRawLsk } from 'utilities/conversions';
import { PrimaryButton } from 'components/shared/toolBox/button';
import Avatar from 'components/shared/avatar';
import Icon from 'components/shared/toolBox/icon';
import { P } from 'components/shared/toolBox/typography';
import withTheme from 'components/shared/withTheme';
import { colors } from 'constants/styleGuide';
import { tokenMap } from 'constants/tokens';
import DropDownHolder from 'utilities/alert';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { transactionAdded as transactionAddedAction } from '../../actions/transactions';
import getStyles from './styles';
import ReadMore from './readMore';

const getTranslatedMessages = (t) => ({
  initialize: {
    title: t('Initialize your account'),
    subtitle: t(
      'By initializing your account, you are taking an additional step towards securing your account.'
    ),
    button: t('Initialize now'),
    reference: t('Account initialization')
  },
  send: {
    title: t('Send LSk'),
    button: t('Send now'),
    buttonBusy: t('Sending')
  }
});

@connect(
  (state) => ({
    language: state.settings.language
  }),
  {
    transactionAdded: transactionAddedAction
  }
)
class Overview extends React.Component {
  state = {
    initialize: false,
    busy: false
  };

  componentWillUnmount() {
    const {
      t,
      navigation: { setParams }
    } = this.props;
    setParams({ title: t('Send') });
  }

  send = () => {
    const {
      nextStep,
      transactionAdded,
      t,
      accounts: { passphrase },
      sharedData: {
        amount, address, reference, secondPassphrase, fee, dynamicFeePerByte
      }
    } = this.props;

    DropDownHolder.closeAlert();

    this.setState({ busy: true }, () => {
      transactionAdded(
        {
          recipientAddress: address,
          amount: toRawLsk(amount),
          fee,
          passphrase,
          secondPassphrase,
          reference,
          dynamicFeePerByte
        },
        nextStep,
        (error = {}) => {
          this.setState({ busy: false });
          DropDownHolder.error(
            t('Error'),
            error.message || t('An error happened. Please try later.')
          );
        }
      );
    });
  };

  // eslint-disable-next-line complexity
  render() {
    const {
      t,
      styles,
      theme,
      route,
      settings,
      accounts: { followed },
      sharedData: {
        address, amount, reference, fee, priority
      },
      settings: { token },
      language,
      prevStep
    } = this.props;

    const actionType = route.params?.initialize || this.state.initialize ? 'initialize' : 'send';

    const translatedMessages = getTranslatedMessages(t);
    const bookmark = followed[token.active].find((item) => item.address === address);

    return (
      <SafeAreaView style={[styles.flex, styles.theme.container]} >
        <HeaderBackButton
          title={route.params?.initialize ? 'Initialize your account' : 'Send LSK'}
          onPress={prevStep}
          currentIndex={3}
          length={3}
          step={true}
        />
        <ScrollView
          style={[styles.container, styles.theme.container]}
          contentContainerStyle={styles.innerContainer}
        >
          <View>
            <ReadMore actionType={actionType} styles={styles} messages={translatedMessages} t={t} />

            <View style={[styles.rowContent, styles.theme.rowContent]}>
              <View style={[styles.addressContainer]}>
                <View>
                  <P style={styles.theme.text}>{t('Wallet details')}</P>
                  {bookmark ? (
                    <P style={[styles.bookmark, styles.text, styles.theme.text]}>
                      {bookmark.label}
                    </P>
                  ) : null}
                </View>
                {settings.token.active === tokenMap.LSK.key ? (
                  <Avatar address={address || ''} style={styles.avatar} size={50} />
                ) : (
                  <View style={[styles.addressIconContainer, styles.theme.addressIconContainer]}>
                    <Icon
                      name="btc"
                      style={styles.addressIcon}
                      color={colors[theme].white}
                      size={20}
                    />
                  </View>
                )}
              </View>

              <P style={[styles.theme.address, styles.address]}>{address}</P>
            </View>

            <View style={[styles.rowContent, styles.theme.rowContent]}>
              <P style={[styles.label, styles.theme.label]}>
                {actionType === 'initialize' ? t('Transaction fee') : t('Amount')}
              </P>
              <P style={[styles.text, styles.theme.text]}>
                <FormattedNumber tokenType={settings.token.active} language={language}>
                  {amount}
                </FormattedNumber>
              </P>
            </View>
            {priority && (
              <View style={[styles.rowContent, styles.theme.rowContent]}>
                <P style={[styles.label, styles.theme.label]}>{t('Priority')}</P>
                <P style={[styles.text, styles.theme.text]}>{priority}</P>
              </View>
            )}
            {reference ? (
              <View style={[styles.rowContent, styles.theme.rowContent]}>
                <P style={[styles.label, styles.theme.label]}>{t('Message')}</P>
                <P style={[styles.text, styles.theme.text]}>{reference}</P>
              </View>
            ) : null}
            {actionType !== 'initialize' ? (
              <View style={[styles.rowContent, styles.theme.rowContent]}>
                <P style={[styles.label, styles.theme.label]}>{t('Transaction fee')}</P>
                <P style={[styles.text, styles.theme.text]}>
                  <FormattedNumber tokenType={settings.token.active} language={language}>
                    {fromRawLsk(fee)}
                  </FormattedNumber>
                </P>
              </View>
            ) : null}
          </View>

          <View>
            <PrimaryButton
              disabled={this.state.busy}
              style={styles.button}
              onClick={this.send}
              title={
                this.state.busy
                  ? translatedMessages[actionType].buttonBusy
                  : translatedMessages[actionType].button
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withTheme(translate()(Overview), getStyles());
