import React from 'react';
import { View, Text } from 'react-native';
import i18next from 'i18next';

import { useController } from 'react-hook-form';
import { useTheme } from 'contexts/ThemeContext';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { PrimaryButton } from 'components/shared/toolBox/button';
import Avatar from 'components/shared/avatar';
import Input from 'components/shared/toolBox/input';
import { stringShortener } from 'utilities/helpers';

import getConfirmTransactionStyles from './styles';

export default function ConfirmTransaction({ amount, token, isLoading, isValidationError, form }) {
  const [currentAccount] = useCurrentAccount();

  const { field } = useController({
    name: 'userPassword',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getConfirmTransactionStyles(),
  });

  const submitDisabled = isLoading || !field.value || isValidationError;

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
        {isValidationError && (
          <Text style={[styles.errorText]}>{i18next.t('sendToken.errors.generalMessage')}</Text>
        )}

        <PrimaryButton
          noTheme
          onClick={form.handleSubmit}
          style={{ marginBottom: 24 }}
          disabled={submitDisabled}
        >
          {isLoading
            ? i18next.t('sendToken.confirmAndSign.loadingText')
            : i18next.t('sendToken.confirmAndSign.sendTokenSubmitButtonText', {
                amount,
                tokenSymbol: token?.symbol,
              })}
        </PrimaryButton>
      </View>
    </View>
  );
}
