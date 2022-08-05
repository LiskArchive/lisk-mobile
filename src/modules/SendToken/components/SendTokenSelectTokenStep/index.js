import React from 'react';
import { Text, View } from 'react-native';
import { Controller } from 'react-hook-form';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import Picker from 'components/shared/Picker';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts';

import getSendTokenSelectTokenStepStyles from './styles';
import { useGetTokensQuery } from '../../api/useGetTokensQuery';

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
            const token = tokens.data?.find(_token => _token.tokenID === field.value);

            return (
              <Picker value={field.value} onChange={field.onChange}>
                <Picker.Label>
                  <Text>Token</Text>
                </Picker.Label>

                <Picker.Toggle>
                  <View style={[styles.applicationNameContainer]}>
                    {tokens.isLoading ? (
                      <Text>Loading...</Text>
                    ) : (
                      <>
                        <Text>{token.name}</Text>
                        {/* <Image
                        source={{ uri: senderApplication.images.logo.png }}
                        style={[styles.applicationLogoImage]}
                        /> */}
                      </>
                    )}
                  </View>
                </Picker.Toggle>
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
