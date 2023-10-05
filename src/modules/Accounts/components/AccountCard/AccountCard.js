/* eslint-disable max-statements */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from 'contexts/ThemeContext';
import { useAccountCanSendTokens } from 'modules/SendToken/hooks/useAccountCanSendTokens';
import { P } from 'components/shared/toolBox/typography';
import { useAuth } from 'modules/Auth/hooks/useAuth';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import { colors } from 'constants/styleGuide';
import SwitchSvg from 'assets/svgs/SwitchSvg';
import MultiSignatureSvg from 'assets/svgs/MultiSignatureSvg';
import CopyToClipboard from 'components/shared/CopyToClipboard/CopyToClipboard';
import useAccountManagerModal from '../../hooks/useAccountManagerModal';

import { useCurrentAccount } from '../../hooks/useCurrentAccount';

import getAccountDetailsStyles from './AccountCard.styles';

export default function AccountCard({ account }) {
  const accountManager = useAccountManagerModal();

  const navigation = useNavigation();

  const [currentAccount] = useCurrentAccount();

  const { data: accountSummary } = useAuth(account.address);
  const accountIsMultisignature = accountSummary?.numberOfSignatures > 0;

  const { styles } = useTheme({ styles: getAccountDetailsStyles() });

  const isCurrentAccount = currentAccount.metadata.address === account.address;

  const {
    data: accountCanSendTokensData,
    isLoading: isLoadingAccountCanSendTokens,
    isError: isErrorAccountCanSendTokens,
  } = useAccountCanSendTokens(currentAccount.metadata.address);

  const disableSendTokenButton =
    !accountCanSendTokensData || isLoadingAccountCanSendTokens || isErrorAccountCanSendTokens;

  const handleRequestTokensPress = () => navigation.navigate('Request');

  const handleSendTokensPress = () =>
    navigation.navigate({
      name: 'Send',
      params: !isCurrentAccount && {
        recipient: account.address,
      },
    });

  return (
    <LinearGradient
      colors={[colors.light.ultramarineBlue, colors.light.inkBlue]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.container]}
    >
      <View style={[styles.row]}>
        <Avatar address={account.address} size={48} />

        <View style={[styles.detailsContainer]}>
          <View style={styles.row}>
            {account.name && (
              <P style={[styles.usernameText, styles.theme.usernameText]} testID="username-label">
                {account.name}
              </P>
            )}
            {accountIsMultisignature && (
              <View style={styles.multisigContainer}>
                <MultiSignatureSvg size={0.8} />
              </View>
            )}
          </View>

          <View>
            <CopyToClipboard
              key={account.address}
              value={account.address}
              labelStyle={[styles.addressText, styles.theme.addressText]}
              label={stringShortener(account.address, 7, 6)}
              iconColor={colors.light.platinumGray}
              testID="address-copy-to-clipboard"
            />
          </View>
        </View>

        {isCurrentAccount && (
          <TouchableOpacity
            style={[styles.switchContainer]}
            onPress={accountManager.open}
            testID="switch-account"
          >
            <SwitchSvg />
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.row, styles.buttonContainer]}>
        {isCurrentAccount && (
          <TouchableOpacity
            style={[styles.button, styles.requestButton]}
            onPress={handleRequestTokensPress}
            testID="request-tokens-button"
          >
            <P style={[styles.buttonText]}>Request</P>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            styles.sendButton,
            disableSendTokenButton && styles.sendButtonDisabled,
          ]}
          onPress={handleSendTokensPress}
          disabled={disableSendTokenButton}
          testID="send-tokens-button"
        >
          <P style={[styles.buttonText, styles.sendButtonText]}>Send</P>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
