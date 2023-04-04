/* eslint-disable max-statements */
import React, { useEffect, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { useController } from 'react-hook-form';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useApplicationsExplorer } from 'modules/BlockchainApplication/hooks/useApplicationsExplorer';
import DataRenderer from 'components/shared/DataRenderer';
import { PrimaryButton } from 'components/shared/toolBox/button';
import ResultScreen from 'components/screens/ResultScreen';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';
import { validateAddress } from 'utilities/validators';

import getSendTokenSelectApplicationsStepStyles from './styles';
import {
  SendTokenRecipientAccountField,
  SendTokenRecipientApplicationField,
  SendTokenSenderApplicationField,
} from './components';

export default function SendTokenSelectApplicationsStep({ nextStep, form }) {
  const applications = useApplicationsExplorer();

  const { field: senderApplicationChainIDField } = useController({
    name: 'senderApplicationChainID',
    control: form.control,
  });

  const { field: recipientApplicationChainIDField } = useController({
    name: 'recipientApplicationChainID',
    control: form.control,
  });

  const { field: recipientAccountAddressField } = useController({
    name: 'recipientAccountAddress',
    control: form.control,
  });

  const isValidAddress = useMemo(
    () => validateAddress(recipientAccountAddressField.value) === 0,
    [recipientAccountAddressField.value]
  );

  useEffect(() => {
    if (isValidAddress) {
      form.handleChange(
        'params.recipientAddress',
        recipientAccountAddressField.value,
        recipientAccountAddressField.onChange
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidAddress]);

  const { field: addressFormatField } = useController({
    name: 'recipientAccountAddressFormat',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  const disableNextStepButton =
    !form.watch('senderApplicationChainID') ||
    !form.watch('recipientApplicationChainID') ||
    !isValidAddress;

  return (
    <ScrollView contentContainerStyle={styles.wrapper} style={[styles.theme.wrapper]}>
      <DataRenderer
        data={applications.data}
        isLoading={applications.isLoading}
        error={applications.error}
        renderData={(data) => (
          <>
            <View style={[styles.container]}>
              <SendTokenSenderApplicationField
                value={senderApplicationChainIDField.value}
                onChange={senderApplicationChainIDField.onChange}
                errorMessage={form.formState.errors.senderApplicationChainID?.message}
                applications={data}
                style={{ toggle: { container: { marginBottom: 16 } } }}
              />

              <SendTokenRecipientApplicationField
                value={recipientApplicationChainIDField.value}
                onChange={recipientApplicationChainIDField.onChange}
                errorMessage={form.formState.errors.recipientApplicationChainID?.message}
                applications={data}
                style={{ toggle: { container: { marginBottom: 16 } } }}
              />

              <SendTokenRecipientAccountField
                value={recipientAccountAddressField.value}
                onChange={recipientAccountAddressField.onChange}
                errorMessage={form.formState.errors.recipientAccountAddress?.message}
                addressFormat={addressFormatField.value}
                onAddressFormatChange={addressFormatField.onChange}
                isValidAddress={isValidAddress}
              />
            </View>

            <View style={[styles.footer]}>
              <PrimaryButton
                onClick={nextStep}
                disabled={disableNextStepButton}
                title={i18next.t('sendToken.applicationsSelect.nextStepButtonText')}
                noTheme
                testID="next-step-button"
              />
            </View>
          </>
        )}
        renderError={() => (
          <ResultScreen
            illustration={<ErrorIllustrationSvg />}
            description="Error loading blockchain applications data. Please try again later."
          />
        )}
      />
    </ScrollView>
  );
}
