import React from 'react';
import { View, Text } from 'react-native';
import { useController } from 'react-hook-form';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton } from 'components/shared/toolBox/button';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import Input from 'components/shared/toolBox/input';

import getConfirmAndSignTransactionStyles from './styles';
import { useCurrentAccount } from '../../../Accounts/hooks/useAccounts/useCurrentAccount';
import useConfirmAndSignTransactionForm from './hooks';
import useSendTokenMutation from '../../api/useSendTokenMutation';

export default function ConfirmAndSignTransaction({
  amount,
  token,
  onSuccess,
  onError
}) {
  const [currentAccount] = useCurrentAccount();

  const sendTokenMutation = useSendTokenMutation();

  const form = useConfirmAndSignTransactionForm({
    sendTokenMutation, onSuccess, onError
  });

  const { field } = useController({
    name: 'password',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getConfirmAndSignTransactionStyles(),
  });

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.contentContainer]}>
        <Text
          style={[styles.title, styles.theme.title]}
        >
          Enter your password
        </Text>

        <Text
          style={[styles.instructionsText, styles.theme.instructionsText]}
        >
          Please provide your device password to sign a transaction.
        </Text>

        <Avatar
          address={currentAccount.metadata?.address}
          size={56}
        />

        <Text
          style={[styles.accountNameText, styles.theme.accountNameText]}
        >
          {currentAccount.metadata?.name}
        </Text>

        <Text style={[styles.accountAddressText, styles.theme.accountAddressText]}>
          {stringShortener(currentAccount.metadata?.address, 5, 5)}
        </Text>

        <Input
          innerStyles={{
            containerStyle: {
              paddingTop: 0,
              paddingRight: 0,
              paddingLeft: 0,
              marginBottom: 16
            },
            inputLabel: {
              marginBottom: 8
            },
            input: {
              padding: 16
            }
          }}
          placeholder={'Enter password'}
          secureTextEntry
          onChange={field.onChange}
          value={field.value}
        />
      </View>

      <PrimaryButton
        noTheme
        onClick={form.handleSubmit}
        title={sendTokenMutation.isLoading ? 'Loading...' : `Confirm and send ${amount} ${token.symbol}`}
        style={{ marginBottom: 24 }}
        disabled={sendTokenMutation.isLoading}
      />
    </View>
  );
}
