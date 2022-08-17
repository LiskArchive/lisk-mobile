import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';

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

function SendTokenSelectTokenStep({
  nextStep,
  prevStep,
  form,
  t
}) {
  const [currentAccount] = useCurrentAccount();

  const tokens = useGetTokensQuery(currentAccount.metadata.address);

  const { styles } = useTheme({
    styles: getSendTokenSelectTokenStepStyles(),
  });

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <TokenSelectField form={form} tokens={tokens} t={t}/>
        <TokenAmountField form={form} tokens={tokens} t={t}/>
        <SendTokenDescriptionField form={form} t={t}/>
        <SendTokenPriorityField form={form} t={t}/>
        <SendTokenTransactionFeesLabels form={form} tokens={tokens} t={t}/>
      </View>

      <View style={[styles.row]}>
        <Button
          style={[styles.prevStepButton, styles.theme.prevStepButton]}
          onClick={prevStep}
          title={t('sendToken.tokenSelect.prevStepButtonText')}
        />

        <PrimaryButton
          noTheme
          onClick={nextStep}
          title={t('sendToken.tokenSelect.nextStepButtonText')}
          style={{ flex: 1 }}
        />

      </View>

    </View>
  );
}

export default translate()(SendTokenSelectTokenStep);
