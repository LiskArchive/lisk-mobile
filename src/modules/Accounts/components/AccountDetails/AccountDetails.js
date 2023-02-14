/* eslint-disable max-statements */
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import { P } from 'components/shared/toolBox/typography';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import { colors } from 'constants/styleGuide';
import SwitchSvg from 'assets/svgs/SwitchSvg';
import CopyToClipboard from 'components/shared/copyToClipboard';
import TransactionList from 'modules/Transactions/components/TransactionList/TransactionList';
import TokenList from '../TokenList/TokenList';
import AccountsManagerModal from '../AccountsManagerModal';

import getAccountDetailsStyles from './AccountDetails.styles';
import { useCurrentAccount } from '../../hooks/useCurrentAccount';

/**
 * Renders a account detailed information given an address by route params.
 */
export default function AccountDetails({ account }) {
  const [showManageAccountsModal, setShowManageAccountsModal] = useState(false);

  const navigation = useNavigation();

  const [currentAccount] = useCurrentAccount();

  const { styles } = useTheme({ styles: getAccountDetailsStyles() });

  const handleRequestTokensClick = () => navigation.navigate('Request');
  const handleSendTokensClick = () => navigation.navigate('Send');

  const isCurrentAccount = currentAccount.metadata.address === account.address;

  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.accountCard]}>
          <View style={[styles.row]}>
            <Avatar address={account.address} size={48} />

            <View style={[styles.detailsContainer]}>
              <P style={[styles.usernameText, styles.theme.usernameText]} testID="username-label">
                {account.username}
              </P>

              <View>
                <CopyToClipboard
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
                onPress={() => setShowManageAccountsModal(true)}
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
                onPress={handleRequestTokensClick}
              >
                <P style={[styles.buttonText]}>Request</P>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.sendButton]}
              onPress={handleSendTokensClick}
            >
              <P style={[styles.buttonText, styles.sendButtonText]}>Send</P>
            </TouchableOpacity>
          </View>
        </View>

        <TokenList
          mode="overview"
          accountAddress={account.address}
          style={{ container: styles.tokenListContainer }}
        />

        <TransactionList mode="overview" style={{ container: styles.transactionListContainer }} />
      </View>

      <AccountsManagerModal show={showManageAccountsModal} setShow={setShowManageAccountsModal} />
    </>
  );
}
