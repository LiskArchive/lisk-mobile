import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useController } from 'react-hook-form';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton } from 'components/shared/toolBox/button';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import Input from 'components/shared/toolBox/input';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';

import getConfirmAndSignTransactionStyles from './styles';

export default function ConfirmAndSignTransaction({ amount, token, form, onSuccess, onError }) {
  const { field } = useController({
    name: 'userPassword',
    control: form.control,
  });

  const [currentAccount] = useCurrentAccount();

  const { styles } = useTheme({
    styles: getConfirmAndSignTransactionStyles(),
  });

  useEffect(() => {
    if (form.broadcastTransactionMutation.isSuccess) {
      onSuccess();
      form.broadcastTransactionMutation.reset();
    }

    if (form.broadcastTransactionMutation.error) {
      onError(form.broadcastTransactionMutation.error);
      form.broadcastTransactionMutation.reset();
    }
  }, [form.broadcastTransactionMutation, onSuccess, onError]);

  const submitDisabled =
    form.broadcastTransactionMutation.isLoading ||
    !field.value ||
    Object.keys(form.formState.errors).length > 0;

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.contentContainer, styles.theme.contentContainer]}>
        <Text style={[styles.title, styles.theme.title]}>
          {i18next.t('sendToken.confirmAndSign.title')}
        </Text>

        <Text style={[styles.instructionsText, styles.theme.instructionsText]}>
          {i18next.t('sendToken.confirmAndSign.description')}
        </Text>

        <Avatar address={currentAccount.metadata?.address} size={56} />

        <Text style={[styles.accountNameText, styles.theme.accountNameText]}>
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
              marginBottom: 16,
            },
            inputLabel: {
              marginBottom: 8,
            },
            input: {
              padding: 16,
            },
          }}
          placeholder={i18next.t('sendToken.confirmAndSign.passwordInputPlaceholder')}
          secureTextEntry
          onChange={field.onChange}
          value={field.value}
        />
      </View>

      <View>
        {Object.keys(form.formState.errors).length > 0 && (
          <Text style={[styles.errorText]}>{i18next.t('sendToken.errors.generalMessage')}</Text>
        )}

        <PrimaryButton
          noTheme
          onClick={form.handleSubmit}
          title={
            form.broadcastTransactionMutation.isLoading
              ? i18next.t('sendToken.confirmAndSign.loadingText')
              : i18next.t('sendToken.confirmAndSign.sendTokenSubmitButtonText', {
                  amount,
                  tokenSymbol: token?.symbol,
                })
          }
          style={{ marginBottom: 24 }}
          disabled={submitDisabled}
        />
      </View>
    </View>
  );
}
