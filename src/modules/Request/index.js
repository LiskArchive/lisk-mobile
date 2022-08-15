/* eslint-disable complexity */
/* eslint-disable max-statements, no-shadow */
import React, { useEffect, useMemo, useState } from 'react';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  deviceWidth,
} from 'utilities/device';
import { P, B } from 'components/shared/toolBox/typography';
import reg from 'constants/regex';
import {useTheme} from 'hooks/useTheme';
import { themes, colors } from 'constants/styleGuide';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import BottomModal from 'components/shared/BottomModal';
import { useAccountInfo } from 'modules/Accounts/hooks/useAccounts';
import { languageMap } from 'constants/languages';
import { useBlockchainApplicationExplorer } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationExplorer';
import { pricesRetrieved } from 'actions/service';
import Picker from 'components/shared/Picker';
import getStyles from './styles';
import { useGetTokensQuery } from '../SendToken/api/useGetTokensQuery';
import AmountInput from './components/AmountInput';
import { useCurrencyConverter } from './hooks/useCurrencyConverter';
import MessageInput from './components/MessageInput';
import { serializeQueryString } from './utils';

const qrCodeSize = deviceWidth() * 0.52;

const Request = ({
  t, navigation
}) => {
  const { styles, theme } = useTheme({ styles: getStyles() });
  const { summary: account } = useAccountInfo();
  const language = useSelector(state => state.settings.language);
  const { currency } = useSelector(state => state.settings);
  const { address, username } = account;
  const [amount, setAmount] = useState({ value: '', validity: -1 });
  const [message, setMessage] = useState('');
  const [recipientApplication, setRecipientApplication] = useState(null);
  const [recipientToken, setRecipientToken] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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
    setAmount(amount);
  };

  const qrCodeUrl = useMemo(() => {
    const amountValidity = validator(amount.value) ? 0 : 1;
    const queryString = serializeQueryString({
      recipient: address,
      amount: amountValidity === 0 ? amount.value : 0,
      recipientApplication: recipientApplication?.chainID,
      recipientToken: recipientToken?.tokenId
    });
    return `lisk://wallet${queryString}`;
  }, [address, amount.value, recipientApplication, recipientToken]);

  const handleApplicationChange = application => {
    setRecipientApplication(application);
    setRecipientToken(null);
  };

  useEffect(() => {
    dispatch(pricesRetrieved());
  }, []);

  const renderQRCode = (size) => <QRCode
    value={qrCodeUrl}
    size={size}
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
  />;

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
      rightIconComponent={() => <TouchableOpacity
        onPress={() => setModalOpen(true)}>{renderQRCode(20)}</TouchableOpacity>}
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
            <Avatar style={styles.avatar} address={address} size={40} />
            <View>
              {username && <B style={styles.theme.username} >{username}</B>}
              <P style={[styles.address, styles.theme.address]} >
                {stringShortener(address, 9, 6)}
              </P>
            </View>
          </View>
          <Picker onChange={handleApplicationChange} >
            <Picker.Label>{t('requestTokens.recipientApplication')}</Picker.Label>
            <Picker.Toggle style={{ container: { marginBottom: 16 } }}>
              <View style={[styles.applicationNameContainer]}>
                {recipientApplication ? (
                  <>
                    <P style={styles.theme.username} >{recipientApplication.name}</P>
                    <Image
                      source={{ uri: recipientApplication.images.logo.png }}
                      style={[styles.applicationLogoImage]}
                    />
                  </>
                ) : <P style={styles.theme.username}>{t('requestTokens.selectApplication')}</P>}
              </View>
            </Picker.Toggle>
            <Picker.Menu>
              {applications.data?.map((application) => (
                <Picker.Item
                  key={application.chainID}
                  value={application}
                >
                  <P style={styles.theme.username}>{application.name}</P>
                  <Image
                    source={{ uri: application.images.logo.png }}
                    style={[styles.applicationLogoImage]}
                  />
                </Picker.Item>
              ))}
            </Picker.Menu>
          </Picker>

          <Picker onChange={setRecipientToken} >
            <Picker.Label>{t('requestTokens.token')}</Picker.Label>
            <Picker.Toggle
              disabled={!recipientApplication}
              style={{ container: { marginBottom: 16 } }}>
              <View style={[styles.applicationNameContainer]}>
                {recipientToken ? (
                  <>
                    <P style={styles.theme.username}>{recipientToken.name}</P>
                    <TokenSvg symbol={recipientToken.symbol} style={styles.tokenSvg} />
                  </>
                ) : <P style={styles.theme.username}>{t('requestTokens.selectToken')}</P>}
              </View>
            </Picker.Toggle>
            <Picker.Menu>
              {tokens?.map((token) => (
                <Picker.Item
                  key={token.tokenID}
                  value={token}
                >
                  <P style={styles.theme.username}>{token.name}</P>
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

          <MessageInput onChange={setMessage} value={message} />

        </View>
      </View>
    </KeyboardAwareScrollView>
    <BottomModal style={styles.modalContainer} show={modalOpen} toggleShow={setModalOpen} >
      <Share
        type={TouchableWithoutFeedback}
        value={qrCodeUrl}
        title={qrCodeUrl}
      >
        <View>
          {renderQRCode(qrCodeSize)}
          <View style={styles.shareTextContainer}>
            <P style={[styles.shareText, styles.theme.shareText]}>
              {t('Tap on the QR Code to share it.')}
            </P>
          </View>
        </View>
      </Share>
    </BottomModal>
  </SafeAreaView>;
};

export default translate()(Request)
