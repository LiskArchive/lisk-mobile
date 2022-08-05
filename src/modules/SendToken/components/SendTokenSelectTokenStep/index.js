import React from 'react';
import { Text, View } from 'react-native';
import { Controller } from 'react-hook-form';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import Picker from 'components/shared/Picker';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';

import getSendTokenSelectTokenStepStyles from './styles';
import { useGetTokensQuery } from '../../api/useGetTokensQuery';
import TokenSvg from '../../../../assets/svgs/TokenSvg';

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
        <Controller
          control={form.control}
          name="tokenID"
          render={({ field }) => {
            const selectedToken = tokens.data?.find(token => token.tokenID === field.value);

            return (
              <Picker value={field.value} onChange={field.onChange}>
                <Picker.Label>
                  <Text>Token</Text>
                </Picker.Label>

                <Picker.Toggle disabled={tokens.isLoading || tokens.error}>
                  <View style={[styles.tokenNameContainer]}>
                    {tokens.isLoading ? (
                      <Text>Loading...</Text>
                    ) : (
                      <>
                        <Text>{selectedToken.symbol}</Text>
                        <TokenSvg symbol={selectedToken.symbol} style={styles.tokenSvg} />
                      </>
                    )}
                  </View>
                </Picker.Toggle>

                <Picker.Menu>
                  {tokens.data?.map(token => (
                    <Picker.Item
                      key={token.tokenID}
                      value={token.tokenID}
                    >
                      <Text>{token.symbol}</Text>
                      <TokenSvg symbol={token.symbol} style={styles.tokenSvg} />
                    </Picker.Item>
                  ))}
                </Picker.Menu>
              </Picker>
            );
          }}
        />
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
