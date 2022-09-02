import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';

import getSendTokenSelectTokenStepStyles from './styles';
import { useGetTokensQuery } from '../../api/useGetTokensQuery';
import {
  SendTokenDescriptionField,
  SendTokenPriorityField,
  SendTokenTransactionFeesLabels,
  TokenAmountField,
  TokenSelectField
} from './components';

export default function SendTokenSelectTokenStep({
  nextStep,
  prevStep,
  form,
}) {
  const [currentAccount] = useCurrentAccount();

  const tokens = useGetTokensQuery(currentAccount.metadata.address);

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <TokenSelectField form={form} tokens={tokens}/>
        <TokenAmountField form={form} tokens={tokens}/>
        <SendTokenDescriptionField form={form}/>
        <SendTokenPriorityField form={form}/>
        <SendTokenTransactionFeesLabels form={form} tokens={tokens}/>
      </View>

      <View style={[styles.row]}>
        <Button
          style={[styles.prevStepButton, styles.theme.prevStepButton]}
          onClick={prevStep}
          title={i18next.t('sendToken.tokenSelect.prevStepButtonText')}
        />

        <PrimaryButton
          noTheme
          onClick={nextStep}
          title={i18next.t('sendToken.tokenSelect.nextStepButtonText')}
          style={{ flex: 1 }}
        />

      </View>

    </View>
  );
}
