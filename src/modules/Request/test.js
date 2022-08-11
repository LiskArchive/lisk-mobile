/* eslint-disable complexity */
/* eslint-disable max-statements, no-shadow */
import React, { useEffect, useState } from 'react';
import {
  View, TouchableWithoutFeedback, SafeAreaView, Image
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from 'react-i18next';
import Share from 'components/shared/share';
import HeaderBackButton from 'components/navigation/headerBackButton';
import TokenSvg from 'assets/svgs/TokenSvg';
import { P, B } from 'components/shared/toolBox/typography';
import reg from 'constants/regex';
import withTheme from 'components/shared/withTheme';
import { themes, colors } from 'constants/styleGuide';
import Avatar from 'components/shared/avatar';
import CopyToClipboard from 'components/shared/copyToClipboard';
import { useAccountInfo } from 'modules/Accounts/hooks/useAccounts';
import { languageMap } from 'constants/languages';
import { useBlockchainApplicationExplorer } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationExplorer';
import { pricesRetrieved } from 'actions/service';
import Picker from 'components/shared/Picker';
import getStyles from './styles';
import { useGetTokensQuery } from '../SendToken/api/useGetTokensQuery';
import AmountInput from './components/AmountInput';
import { useCurrencyConverter } from './hooks/useCurrencyConverter';

const Request = ({
  styles, theme, t, navigation
}) => {
  const { summary: account } = useAccountInfo();
  const language = useSelector(state => state.settings.language);
  const { currency } = useSelector(state => state.settings);
  const { address } = account;
  const [amount, setAmount] = useState({ value: '', validity: -1 });
  const [recipientApplication, setRecipientApplication] = useState(null);
  const [recipientToken, setRecipientToken] = useState(null);
  const [url, setUrl] = useState('');
  const { applications } = useBlockchainApplicationExplorer();
  const { data: tokens } = useGetTokensQuery(account.address);
  const valueInCurrency = useCurrencyConverter(amount.value);
  const dispatch = useDispatch();
  const validator = str => reg.amount.test(str);

  const changeHandler = val => {
    if (language === languageMap.en.code) {
      val = val.replace(/,/g, '.');
    } else {
      val = val.replace(/\./g, ',');
    }

    let amountValidity = -1;
    let amount = val;

    if (val !== '') {
      amountValidity = validator(val) ? 0 : 1;
      amount = {
        value: val,
        validity: amountValidity,
      };
    }
    setUrl(amountValidity === 0
      ? `lisk://wallet?recipient=${address}&amount=${val}`
      : address);
    setAmount(amount);
  };

  const handleApplicationChange = application => {
    setRecipientApplication(application);
    setRecipientToken(null);
  };

  useEffect(() => {
    dispatch(pricesRetrieved());
  }, []);

  if (applications.isLoading) {
    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={[styles.container]}>
          <P>Loading...</P>
        </View>
      </View>
    );
  }

  return <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
    <HeaderBackButton
      title="requestTokens.title"
      onPress={navigation.goBack}
    />
    <KeyboardAwareScrollView
      viewIsInsideTab
      enableOnAndroid={true}
      enableResetScrollToCoords={false}
    >
      <View style={[styles.innerContainer, styles.theme.innerContainer]}>
        <View style={styles.body}>
          <P style={[styles.addressLabel, styles.theme.addressLabel]}>
            {t('requestTokens.recipient')}
          </P>
          <View style={styles.addressContainer}>
            <Avatar style={styles.avatar} address={address} size={24} />
            <CopyToClipboard
              style={styles.copyContainer}
              labelStyle={[styles.address, styles.theme.address]}
              showIcon={true}
              iconSize={18}
              value={address}
              type={B}
            />
          </View>
          <Picker onChange={handleApplicationChange} >
            <Picker.Label>Recipient Application</Picker.Label>
            <Picker.Toggle style={{ container: { marginBottom: 16 } }}>
              <View style={[styles.applicationNameContainer]}>
                {recipientApplication ? (
                  <>
                    <P>{recipientApplication.name}</P>
                    <Image
                      source={{ uri: recipientApplication.images.logo.png }}
                      style={[styles.applicationLogoImage]}
                    />
                  </>
                ) : <P>Select Application</P>}
              </View>
            </Picker.Toggle>
            <Picker.Menu>
              {applications?.data?.map((application) => (
                <Picker.Item
                  key={application.chainID}
                  value={application}
                >
                  <P>{application.name}</P>
                  <Image
                    source={{ uri: application.images.logo.png }}
                    style={[styles.applicationLogoImage]}
                  />
                </Picker.Item>
              ))}
            </Picker.Menu>
          </Picker>

          <Picker onChange={setRecipientToken} >
            <Picker.Label>Token</Picker.Label>
            <Picker.Toggle
              disabled={!recipientApplication}
              style={{ container: { marginBottom: 16 } }}>
              <View style={[styles.applicationNameContainer]}>
                {recipientToken ? (
                  <>
                    <P>{recipientToken.name}</P>
                    <TokenSvg symbol={recipientToken.symbol} style={styles.tokenSvg} />
                  </>
                ) : <P>Select Token</P>}
              </View>
            </Picker.Toggle>
            <Picker.Menu>
              {tokens?.map((token) => (
                <Picker.Item
                  key={token.tokenID}
                  value={token}
                >
                  <P>{token.name}</P>
                  <TokenSvg symbol={token.symbol} style={styles.tokenSvg} />
                </Picker.Item>
              ))}
            </Picker.Menu>
          </Picker>

          <AmountInput
            currency={currency}
            valueInCurrency={valueInCurrency}
            onChange={changeHandler}
            value={amount.value}
          />

          <View style={styles.shareContainer}>
            <Share
              type={TouchableWithoutFeedback}
              value={url || address}
              title={url || address}
            >
              <View style={styles.shareContent}>
                <QRCode
                  value={url || address}
                  size={0.72}
                  color={
                    theme === themes.light
                      ? colors.light.black
                      : colors.dark.white
                  }
                  backgroundColor={
                    theme === themes.light
                      ? colors.light.white
                      : colors.dark.maastrichtBlue
                  }
                />

                <View style={styles.shareTextContainer}>
                  <P style={[styles.shareText, styles.theme.shareText]}>
                    {t('Tap on the QR Code to share it.')}
                  </P>
                </View>
              </View>
            </Share>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  </SafeAreaView>;
};

export default withTheme(translate()(Request), getStyles());
