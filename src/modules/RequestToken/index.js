/* eslint-disable complexity */
/* eslint-disable max-statements, no-shadow */
import React, { useEffect, useMemo, useState } from 'react';
import {
  View, TouchableWithoutFeedback, SafeAreaView
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';

import Share from 'components/shared/share';
import HeaderBackButton from 'components/navigation/headerBackButton';
import {
  deviceWidth,
} from 'utilities/device';
import { P, B } from 'components/shared/toolBox/typography';
import reg from 'constants/regex';
import { useTheme } from 'hooks/useTheme';
import { useCopyToClipboard } from 'components/shared/copyToClipboard/hooks';
import { themes, colors } from 'constants/styleGuide';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import BottomModal from 'components/shared/BottomModal';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useAccountInfo } from 'modules/Accounts/hooks/useAccounts';
import { useBlockchainApplicationExplorer } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationExplorer';
import { pricesRetrieved } from 'actions/service';
import { SendTokenMessageField, SendTokenAmountField, TokenSelectField } from 'modules/SendToken/components/SelectTokenStep/components';
import { SendTokenRecipientApplicationField } from 'modules/SendToken/components/SelectApplicationsStep/components';
import { mockTokens } from 'modules/SendToken/__fixtures__';
import CopySvg from 'assets/svgs/CopySvg';

import { serializeQueryString } from './utils';
import getStyles from './styles';
import CheckSvg from '../../assets/svgs/CheckSvg';

export default function RequestToken() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { summary: account } = useAccountInfo();
  const { address, username } = account;
  const { applications } = useBlockchainApplicationExplorer();

  const [amount, setAmount] = useState({ value: '', validity: -1 });
  const [message, setMessage] = useState('');
  const [recipientApplication, setRecipientApplication] = useState(null);
  const [recipientToken, setRecipientToken] = useState(mockTokens.find(token => token.symbol === 'LSK')?.tokenID);
  const [modalOpen, setModalOpen] = useState(false);

  const { styles, theme } = useTheme({ styles: getStyles() });

  const qrCodeUrl = useMemo(() => {
    const validator = str => reg.amount.test(str);

    const amountValidity = validator(amount.value) ? 0 : 1;
    const queryString = serializeQueryString({
      recipient: address,
      amount: amountValidity === 0 ? amount.value : 0,
      recipientApplication: recipientApplication?.chainID,
      recipientToken: recipientToken?.tokenId
    });
    return `lisk://wallet${queryString}`;
  }, [address, amount.value, recipientApplication, recipientToken]);

  const [copiedToClipboard, handleCopyToClipboard] = useCopyToClipboard(qrCodeUrl);

  const qrCodeSize = deviceWidth() * 0.52;

  const handleApplicationChange = application => {
    setRecipientApplication(application);
    setRecipientToken(null);
  };

  useEffect(() => {
    dispatch(pricesRetrieved());
  }, [dispatch]);

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

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
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
            <P style={[styles.addressLabel, styles.theme.addressLabel]}>
              {i18next.t('requestTokens.recipient')}
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

            <SendTokenRecipientApplicationField
              value={recipientApplication}
              onChange={handleApplicationChange}
              applications={applications}
              style={{ toggle: { container: { marginBottom: 16 } } }}
            />

            <TokenSelectField
              value={recipientToken}
              onChange={setRecipientToken}
              style={{ toggle: { container: { marginBottom: 16 } } }}
            />

            <SendTokenAmountField
              value={amount.value}
              onChange={setAmount}
              tokenID={recipientToken?.tokenID}
              style={{ container: { marginBottom: 16 } }}
            />

            <SendTokenMessageField onChange={setMessage} value={message} />

          <PrimaryButton
            onPress={handleCopyToClipboard}
            adornments={{
              left: (
                !copiedToClipboard ? (
                  <CopySvg
                    color={colors.light.white}
                    variant="outline"
                    style={{ marginRight: 8 }}
                  />
                ) : (
                  <CheckSvg
                    color={colors.light.white}
                    height={14}
                    style={{ marginRight: 8 }}
                  />
                )
              )
            }}
          >
            {!copiedToClipboard ? 'Copy link' : 'Link copied!'}
          </PrimaryButton>
        </View>

      </KeyboardAwareScrollView>

      <BottomModal
        style={{ container: styles.modalContainer }}
        show={modalOpen}
        toggleShow={setModalOpen}
      >
        <Share
          type={TouchableWithoutFeedback}
          value={qrCodeUrl}
          title={qrCodeUrl}
        >
          <View>
            {renderQRCode(qrCodeSize)}
            <View style={styles.shareTextContainer}>
              <P style={[styles.shareText, styles.theme.shareText]}>
                {i18next.t('Tap on the QR Code to share it.')}
              </P>
            </View>
          </View>
        </Share>
      </BottomModal>
    </SafeAreaView>
  );
}
