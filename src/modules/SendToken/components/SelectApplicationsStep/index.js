/* eslint-disable max-statements */
import React, { useEffect, useMemo, useState } from 'react';
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
  const [address, setAddress] = useState('');

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

  const isValidAddress = useMemo(() => validateAddress(address) === 0, [address]);

  useEffect(() => {
    if (isValidAddress) {
      form.handleChange('params.recipientAddress', address, recipientAccountAddressField.onChange);
    }
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
    <ScrollView style={[styles.wrapper, styles.theme.wrapper]}>
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
                value={address}
                onChange={setAddress}
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
