/* eslint-disable complexity */
/* eslint-disable max-statements, no-shadow */
import React, { useMemo, useState } from 'react';
import { View, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import { useModal } from 'hooks/useModal';
import { useApplicationsExplorer } from 'modules/BlockchainApplication/hooks/useApplicationsExplorer';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import { mockTokensMeta } from 'modules/Transactions/__fixtures__';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import {
  SendTokenMessageField,
  SendTokenAmountField,
  TokenSelectField,
} from 'modules/SendToken/components/SelectTokenStep/components';
import { SendTokenRecipientApplicationField } from 'modules/SendToken/components/SelectApplicationsStep/components';
import DataRenderer from 'components/shared/DataRenderer';
import Share from 'components/shared/share';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { P, B } from 'components/shared/toolBox/typography';
import { useCopyToClipboard } from 'components/shared/copyToClipboard/hooks';
import Avatar from 'components/shared/avatar';
import { PrimaryButton } from 'components/shared/toolBox/button';
import reg from 'constants/regex';
import { themes, colors } from 'constants/styleGuide';
import { deviceWidth } from 'utilities/device';
import { stringShortener, serializeQueryString } from 'utilities/helpers';
import CopySvg from 'assets/svgs/CopySvg';
import CheckSvg from 'assets/svgs/CheckSvg';

import getStyles from './styles';

export default function RequestToken() {
  const navigation = useNavigation();
  const modal = useModal();

  const [currentAccount] = useCurrentAccount();

  const [currentApplication] = useCurrentApplication();

  const applications = useApplicationsExplorer();

  const [amount, setAmount] = useState({ value: '', validity: -1 });
  const [message, setMessage] = useState('');
  const [recipientApplicationChainID, setRecipientApplicationChainID] = useState(
    currentApplication.data?.chainID
  );
  const [tokenID, setTokenID] = useState(
    mockTokensMeta.find((token) => token.symbol === 'LSK')?.tokenID
  );

  const { styles, theme } = useTheme({ styles: getStyles() });

  const qrCodeUrl = useMemo(() => {
    const validator = (str) => reg.amount.test(str);

    const amountValidity = validator(amount.value) ? 0 : 1;

    const queryString = serializeQueryString({
      recipientAccountAddress: currentAccount.metadata.address,
      amount: amountValidity === 0 ? amount.value : 0,
      recipientApplicationChainID,
      tokenID,
      message,
    });

    return `lisk://wallet${queryString}`;
  }, [
    currentAccount.metadata.address,
    amount.value,
    recipientApplicationChainID,
    tokenID,
    message,
  ]);

  const [copiedToClipboard, handleCopyToClipboard] = useCopyToClipboard(qrCodeUrl);

  const qrCodeSize = deviceWidth() * 0.52;

  const renderQRCode = (size) => (
    <QRCode
      value={qrCodeUrl}
      size={size}
      color={theme === themes.light ? colors.light.black : colors.dark.white}
      backgroundColor={theme === themes.light ? colors.light.white : colors.dark.maastrichtBlue}
    />
  );

  const renderFullCode = () => (
    <View style={styles.shareContainer}>
      <Share type={TouchableWithoutFeedback} value={qrCodeUrl} title={qrCodeUrl}>
        {renderQRCode(qrCodeSize)}
      </Share>

      <P style={[styles.shareText, styles.theme.shareText]}>
        {i18next.t('Tap on the QR Code to share it.')}
      </P>
    </View>
  );

  const openQrCode = () => modal.open(renderFullCode());

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]} testID="request-token-screen">
      <HeaderBackButton
        title="requestTokens.title"
        onPress={navigation.goBack}
        rightIconComponent={() => (
          <TouchableOpacity onPress={openQrCode}>{renderQRCode(20)}</TouchableOpacity>
        )}
      />

      <KeyboardAwareScrollView
        viewIsInsideTab
        enableOnAndroid
        enableResetScrollToCoords={false}
        contentContainerStyle={{ flex: 1 }}
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

          <DataRenderer
            data={applications.data}
            isLoading={applications.isLoading}
            error={applications.error}
            renderData={(data) => (
              <SendTokenRecipientApplicationField
                value={recipientApplicationChainID}
                onChange={setRecipientApplicationChainID}
                applications={data}
                style={{ toggle: { container: { marginBottom: 16 } } }}
              />
            )}
          />

          <TokenSelectField
            value={tokenID}
            onChange={setTokenID}
            recipientApplication={currentApplication.data}
            style={{ toggle: { container: { marginBottom: 16 } } }}
          />

          <SendTokenAmountField
            value={amount.value}
            onChange={(value) => setAmount((prevValue) => ({ ...prevValue, value }))}
            tokenID={tokenID}
            recipientApplication={currentApplication.data}
            style={{ container: { marginBottom: 16 } }}
          />

          <SendTokenMessageField onChange={setMessage} value={message} />
        </View>

        <View style={styles.footer} testID="request-token-link-button">
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
    </SafeAreaView>
  );
}
