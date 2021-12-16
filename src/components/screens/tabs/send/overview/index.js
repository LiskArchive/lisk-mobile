import React from 'react';
import { View, ScrollView } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';

import { transactionAdded as transactionAddedAction } from '../../../../../actions/transactions';
import FormattedNumber from '../../../../shared/formattedNumber';
import { toRawLsk, fromRawLsk } from '../../../../../utilities/conversions';
import { PrimaryButton } from '../../../../shared/toolBox/button';
import Avatar from '../../../../shared/avatar';
import Icon from '../../../../shared/toolBox/icon';
import { P } from '../../../../shared/toolBox/typography';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import { colors } from '../../../../../constants/styleGuide';
import { tokenMap } from '../../../../../constants/tokens';
import DropDownHolder from '../../../../../utilities/alert';
import HeaderBackButton from '../../../router/headerBackButton';
import ReadMore from './readMore';
import StepProgress from '../../../../shared/multiStep/stepProgress';

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

  componentDidMount() {
    const {
      t, prevStep, navigation, route
    } = this.props;
    const { send, initialize } = getTranslatedMessages(t);
    let options = {
      title: null,
      headerLeft: (props) => <HeaderBackButton
        {...props}
        onPress={prevStep}
        safeArea={true}
        title={send.title}
      />,
      headerRight: () => <StepProgress currentIndex={3} length={3} />
    };

    if (route.params?.initialize) {
      this.setState({
        initialize: true
      });

      options = {
        title: initialize.title,
        headerLeft: () => null,
      };
    }

    navigation.setOptions(options);
    navigation.setParams({ initialize: false });
  }

  componentDidUpdate(prevProps) {
    const {
      t, lng, navigation, route
    } = this.props;

    if (prevProps.lng !== lng) {
      const { initialize, send } = getTranslatedMessages(t);

      navigation.setOptions({
        title: route.params?.initialize ? initialize : send
      });
    }
  }

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
      language
    } = this.props;

    const actionType = route.params?.initialize || this.state.initialize ? 'initialize' : 'send';

    const translatedMessages = getTranslatedMessages(t);
    const bookmark = followed[token.active].find((item) => item.address === address);

    return (
      <ScrollView
        style={[styles.container, styles.theme.container]}
        contentContainerStyle={styles.innerContainer}
      >
        <View>
          <ReadMore actionType={actionType} styles={styles} messages={translatedMessages} t={t} />

          <View style={[styles.rowContent, styles.theme.rowContent]} >
            <View style={[styles.addressContainer]} >
              <View>
                <P style={styles.theme.text} >{t('Wallet details')}</P>
                {bookmark
                  ? <P style={[styles.bookmark, styles.text, styles.theme.text]}>
                    {bookmark.label}
                  </P>
                  : null}
              </View>
              {settings.token.active === tokenMap.LSK.key ? (
                <Avatar address={address || ''} style={styles.avatar} size={50} />
              ) : (
                <View style={[styles.addressIconContainer, styles.theme.addressIconContainer]}>
                  <Icon name="btc" style={styles.addressIcon} color={colors[theme].white} size={20} />
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
    );
  }
}

export default withTheme(translate()(Overview), getStyles());
