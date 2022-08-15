import React from 'react';
import { View, Text } from 'react-native';
import { useController } from 'react-hook-form';
import { translate } from 'react-i18next';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton } from 'components/shared/toolBox/button';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import Input from 'components/shared/toolBox/input';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import useSendTokenMutation from '../../api/useSendTokenMutation';

import getConfirmAndSignTransactionStyles from './styles';
import useConfirmAndSignTransactionForm from './hooks';

function ConfirmAndSignTransaction({
  amount,
  token,
  onSuccess,
  onError,
  t
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
      <View style={[styles.contentContainer, styles.theme.contentContainer]}>
        <Text
          style={[styles.title, styles.theme.title]}
        >
          {t('sendToken.confirmAndSign.title')}
        </Text>

        <Text
          style={[styles.instructionsText, styles.theme.instructionsText]}
        >
          {t('sendToken.confirmAndSign.description')}
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
          placeholder={t('sendToken.confirmAndSign.passwordInputPlaceholder')}
          secureTextEntry
          onChange={field.onChange}
          value={field.value}
        />
      </View>

      <PrimaryButton
        noTheme
        onClick={form.handleSubmit}
        title={
          sendTokenMutation.isLoading
            ? t('sendToken.confirmAndSign.loadingText')
            : t('sendToken.confirmAndSign.sendTokenSubmitButtonText',
              { amount, tokenSymbol: token.symbol })
          }
        style={{ marginBottom: 24 }}
        disabled={sendTokenMutation.isLoading}
      />
    </View>
  );
}

export default translate()(ConfirmAndSignTransaction);
