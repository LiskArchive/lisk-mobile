/* eslint-disable complexity */
/* eslint-disable max-statements, no-shadow */
import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'hooks/useTheme';
import { useBlockchainApplicationExplorer } from 'modules/BlockchainApplication/hooks/useBlockchainApplicationExplorer';
import { mockTokens } from 'modules/SendToken/__fixtures__';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import { useCurrentBlockchainApplication } from 'modules/BlockchainApplication/hooks/useCurrentBlockchainApplication';
import {
  SendTokenMessageField,
  SendTokenAmountField,
  TokenSelectField,
} from 'modules/SendToken/components/SelectTokenStep/components';
import { SendTokenRecipientApplicationField } from 'modules/SendToken/components/SelectApplicationsStep/components';
import Share from 'components/shared/share';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { P, B } from 'components/shared/toolBox/typography';
import { useCopyToClipboard } from 'components/shared/copyToClipboard/hooks';
import Avatar from 'components/shared/avatar';
import BottomModal from 'components/shared/BottomModal';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { pricesRetrieved } from 'actions/service';
import reg from 'constants/regex';
import { themes, colors } from 'constants/styleGuide';
import { deviceWidth } from 'utilities/device';
import { stringShortener, serializeQueryString } from 'utilities/helpers';
import CopySvg from 'assets/svgs/CopySvg';
import CheckSvg from 'assets/svgs/CheckSvg';

import getStyles from './styles';

export default function RequestToken() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [currentAccount] = useCurrentAccount();

  const [currentApplication] = useCurrentBlockchainApplication();

  const { applicationsMetadata } = useBlockchainApplicationExplorer();

  const [amount, setAmount] = useState({ value: '', validity: -1 });
  const [message, setMessage] = useState('');
  const [recipientApplicationChainID, setRecipientApplicationChainID] = useState(
    currentApplication.chainID
  );
  const [recipientTokenID, setRecipientTokenID] = useState(
    mockTokens.find((token) => token.symbol === 'LSK')?.tokenID
  );
  const [modalOpen, setModalOpen] = useState(false);

  const { styles, theme } = useTheme({ styles: getStyles() });

  const qrCodeUrl = useMemo(() => {
    const validator = (str) => reg.amount.test(str);

    const amountValidity = validator(amount.value) ? 0 : 1;
    const queryString = serializeQueryString({
      recipient: currentAccount.metadata.address,
      amount: amountValidity === 0 ? amount.value : 0,
      recipientApplication: recipientApplicationChainID,
      recipientToken: recipientTokenID,
    });
    return `lisk://wallet${queryString}`;
  }, [
    currentAccount.metadata.address,
    amount.value,
    recipientApplicationChainID,
    recipientTokenID,
  ]);

  const [copiedToClipboard, handleCopyToClipboard] = useCopyToClipboard(qrCodeUrl);

  const qrCodeSize = deviceWidth() * 0.52;

  useEffect(() => {
    dispatch(pricesRetrieved());
  }, [dispatch]);

  const renderQRCode = (size) => (
    <QRCode
      value={qrCodeUrl}
      size={size}
      color={theme === themes.light ? colors.light.black : colors.dark.white}
      backgroundColor={theme === themes.light ? colors.light.white : colors.dark.maastrichtBlue}
    />
  );

  if (applicationsMetadata.isLoading) {
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
        rightIconComponent={() => (
          <TouchableOpacity onPress={() => setModalOpen(true)}>{renderQRCode(20)}</TouchableOpacity>
        )}
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
            <Avatar style={styles.avatar} address={currentAccount.metadata.address} size={40} />

            <View>
              {currentAccount.metadata.name && (
                <B style={styles.theme.username}>{currentAccount.metadata.name}</B>
              )}

              <P style={[styles.address, styles.theme.address]}>
                {stringShortener(currentAccount.metadata.address, 9, 6)}
              </P>
            </View>
          </View>

          <SendTokenRecipientApplicationField
            value={recipientApplicationChainID}
            onChange={setRecipientApplicationChainID}
            applications={applicationsMetadata}
            style={{ toggle: { container: { marginBottom: 16 } } }}
          />

          <TokenSelectField
            value={recipientTokenID}
            onChange={setRecipientTokenID}
            style={{ toggle: { container: { marginBottom: 16 } } }}
          />

          <SendTokenAmountField
            value={amount.value}
            onChange={setAmount}
            tokenID={recipientTokenID}
            style={{ container: { marginBottom: 16 } }}
          />

          <SendTokenMessageField onChange={setMessage} value={message} />

          <PrimaryButton
            onPress={handleCopyToClipboard}
            adornments={{
              left: !copiedToClipboard ? (
                <CopySvg color={colors.light.white} variant="outline" style={{ marginRight: 8 }} />
              ) : (
                <CheckSvg color={colors.light.white} height={14} style={{ marginRight: 8 }} />
              ),
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
        <Share type={TouchableWithoutFeedback} value={qrCodeUrl} title={qrCodeUrl}>
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
