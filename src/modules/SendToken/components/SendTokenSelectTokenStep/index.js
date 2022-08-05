import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';

import getSendTokenSelectTokenStepStyles from './styles';
import { useGetTokensQuery } from '../../api/useGetTokensQuery';
import { TokenAmountField, TokenSelectField } from './components';

export default function SendTokenSelectTokenStep({
  nextStep,
  prevStep,
  form
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
      </View>

      <PrimaryButton
        noTheme
        onClick={() => nextStep()}
        title={'Proceed to confirmation'}
      />

      <Button
        style={{ marginTop: 16 }}
        onClick={() => prevStep()}
        title={'Back'}
      />
    </View>
  );
}
