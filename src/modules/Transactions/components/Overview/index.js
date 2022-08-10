/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { translate } from 'react-i18next';

import { SafeAreaView } from 'react-native-safe-area-context';
import FormattedNumber from 'components/shared/formattedNumber';
import { toRawLsk, fromRawLsk } from 'utilities/conversions';
import { PrimaryButton } from 'components/shared/toolBox/button';
import Avatar from 'components/shared/avatar';
import { P } from 'components/shared/toolBox/typography';
import withTheme from 'components/shared/withTheme';
import DropDownHolder from 'utilities/alert';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useDispatch, useSelector } from 'react-redux';
import { transactionAdded } from '../../actions/transactions';
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

const Overview = ({
  t,
  styles,
  route,
  accounts: { followed, passphrase },
  sharedData: {
    address, amount, reference, fee, priority, secondPassphrase, dynamicFeePerByte
  },
  nextStep,
  prevStep,
  navigation: { setParams }
}) => {
  const [busy, setBusy] = useState(false);
  const language = useSelector(state => state.settings.language);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => setParams({ title: t('Send') });
  }, []);

  const send = () => {
    DropDownHolder.closeAlert();

    setBusy(true);
    dispatch(transactionAdded(
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
        setBusy(false);
        DropDownHolder.error(
          t('Error'),
          error.message || t('An error happened. Please try later.')
        );
      }
    ));
  };

  const actionType = route.params?.initialize ? 'initialize' : 'send';

  const translatedMessages = getTranslatedMessages(t);
  const bookmark = followed.find((item) => item.address === address);

  return <SafeAreaView style={[styles.flex, styles.theme.container]} >
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
              <Avatar address={address || ''} style={styles.avatar} size={50} />
          </View>

          <P style={[styles.theme.address, styles.address]}>{address}</P>
        </View>

        <View style={[styles.rowContent, styles.theme.rowContent]}>
          <P style={[styles.label, styles.theme.label]}>
            {actionType === 'initialize' ? t('Transaction fee') : t('Amount')}
          </P>
          <P style={[styles.text, styles.theme.text]}>
            <FormattedNumber tokenType={'LSK'} language={language}>
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
              <FormattedNumber tokenType={'LSK'} language={language}>
                {fromRawLsk(fee)}
              </FormattedNumber>
            </P>
          </View>
        ) : null}
      </View>

      <View>
        <PrimaryButton
          disabled={busy}
          style={styles.button}
          onClick={send}
          title={
            busy
              ? translatedMessages[actionType].buttonBusy
              : translatedMessages[actionType].button
          }
        />
      </View>
    </ScrollView>
  </SafeAreaView>;
};

export default withTheme(translate()(Overview), getStyles());
