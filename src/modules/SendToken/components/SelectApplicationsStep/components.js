import React from 'react';
import { View, Text, Image } from 'react-native';
import { useController } from 'react-hook-form';

import Picker from 'components/shared/Picker';
import Avatar from 'components/shared/avatar';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import { stringShortener } from 'utilities/helpers';
import { useTheme } from 'hooks/useTheme';

import getSendTokenSelectApplicationsStepStyles from './styles';

export function SendTokenSenderApplicationField({ form, applications, t }) {
  const { field } = useController({
    name: 'senderApplicationChainID',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  const senderApplication = applications?.data?.find(
    application => application.chainID === field.value
  );

  return (
    <Picker
      value={field.value}
      onChange={field.onChange}
      error={form.formState.errors.senderApplicationChainID?.message}
    >
      <Picker.Label>
        {t('sendToken.applicationsSelect.senderApplicationFieldLabel')}
      </Picker.Label>

      <Picker.Toggle
        disabled
        placeholder={t('sendToken.applicationsSelect.senderApplicationFieldPlaceholder')}
      >
        {senderApplication && (
          <View style={[styles.applicationNameContainer]}>
            <Text style={[styles.text, styles.theme.text]}>
              {senderApplication.name}
            </Text>

            <Image
              source={{ uri: senderApplication.images.logo.png }}
              style={[styles.applicationLogoImage]}
            />
          </View>
        )}
      </Picker.Toggle>
    </Picker>
  );
}

export function SendTokenRecipientApplicationField({ form, applications, t }) {
  const { field } = useController({
    name: 'recipientApplicationChainID',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  const recipientApplication = applications?.data?.find(
    application => application.chainID === field.value
  );

  return (
    <Picker
      value={form.value}
      onChange={field.onChange}
      error={form.formState.errors.recipientApplicationChainID?.message}
    >
      <Picker.Label style={{ marginTop: 16 }}>
        {t('sendToken.applicationsSelect.recipientApplicationFieldLabel')}
      </Picker.Label>

      <Picker.Toggle
        disabled={applications?.loading}
        placeholder={
          t('sendToken.applicationsSelect.recipientApplicationFieldPlaceholder')
        }
      >
        {recipientApplication && (
          <View style={[styles.applicationNameContainer]}>
            <Text style={[styles.text, styles.theme.text]}>
              {recipientApplication.name}
            </Text>

            <Image
              source={{ uri: recipientApplication.images.logo.png }}
              style={[styles.applicationLogoImage]}
            />
          </View>
        )}
      </Picker.Toggle>

      <Picker.Menu>
        {applications?.data?.map((application) => (
          <Picker.Item
            key={application.chainID}
            value={application.chainID}
          >

            <Text style={[styles.text, styles.theme.text]}>
              {application.name}
            </Text>

            <Image
              source={{ uri: application.images.logo.png }}
              style={[styles.applicationLogoImage]}
            />
          </Picker.Item>
        ))}
      </Picker.Menu>
    </Picker>
  );
}

export function SendTokenRecipientAccountField({ form, accounts, t }) {
  const { field } = useController({
    name: 'recipientAccountAddress',
    control: form.control,
  });

  const { styles } = useTheme({
    styles: getSendTokenSelectApplicationsStepStyles(),
  });

  const recipientAccount = accounts.find(
    account => account.metadata.address === field.value
  );

  return (
    <Picker
      value={form.value}
      onChange={field.onChange}
      error={form.formState.errors.recipientAccountAddress?.message}
    >
      <Picker.Label style={ { marginTop: 16 } }>
        {t('sendToken.applicationsSelect.recipientAccountFieldLabel')}
      </Picker.Label>

      <Picker.Toggle
        disabled
        placeholder={t('sendToken.applicationsSelect.recipientAccountFieldPlaceholder')}
      >
        {recipientAccount && (
          <>
            <View style={[styles.applicationNameContainer]}>
              <Avatar
                address={recipientAccount.metadata.address}
                size={24}
                style={{ marginRight: 8 }}
              />

              <Text style={[styles.text, styles.theme.text]}>
                {recipientAccount.metadata.name}
              </Text>

              <Text style={[styles.accountAddress, styles.theme.accountAddress]}>
                {stringShortener(recipientAccount.metadata.address, 5, 5)}
              </Text>
            </View>

            <CircleCheckedSvg variant="fill" />
          </>
        )}
      </Picker.Toggle>
    </Picker>
  );
}
