import React from 'react';
import { View, Text, Image } from 'react-native';
import { useController } from 'react-hook-form';

import Picker from 'components/shared/Picker';
import Avatar from 'components/shared/avatar';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import { stringShortener } from 'utilities/helpers';
import { useTheme } from 'hooks/useTheme';

import getSendTokenSelectApplicationsStepStyles from './styles';

export function SendTokenSenderApplicationField({ form, applications }) {
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
    <Picker>
      <Picker.Label>
        From Application
      </Picker.Label>

      <Picker.Toggle disabled style={{ container: { marginBottom: 16 } }}>
        <View style={[styles.applicationNameContainer]}>
          {senderApplication ? (
            <>
              <Text>{senderApplication.name}</Text>
              <Image
                source={{ uri: senderApplication.images.logo.png }}
                style={[styles.applicationLogoImage]}
              />
            </>
          ) : <Text>No application found.</Text> }
        </View>
      </Picker.Toggle>
    </Picker>
  );
}

export function SendTokenRecipientApplicationField({ form, applications }) {
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
      >
        <Picker.Label>
          To Application
        </Picker.Label>

        <Picker.Toggle
          disabled={applications?.loading}
          placeholder="Select an Application"
          style={{ container: { marginBottom: 16 } }}
        >
          {recipientApplication ? (
            <View style={[styles.applicationNameContainer]}>
              <Text>
                {recipientApplication.name}
              </Text>
              <Image
                source={{ uri: recipientApplication.images.logo.png }}
                style={[styles.applicationLogoImage]}
              />
            </View>
          ) : <Text>No application found.</Text>}
        </Picker.Toggle>

        <Picker.Menu>
          {applications?.data?.map((application) => (
            <Picker.Item
              key={application.chainID}
              value={application.chainID}
            >

              <Text>{application.name}</Text>

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

export function SendTokenRecipientAccountField({ form, accounts }) {
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
      <Picker>
        <Picker.Label>Recipient</Picker.Label>

        <Picker.Toggle disabled>
          <View style={[styles.applicationNameContainer]}>
            <Avatar
              address={recipientAccount.metadata.address}
              size={24}
              style={{ marginRight: 8 }}
            />

            <Text>{recipientAccount.metadata.name}</Text>

            <Text style={[styles.accountAddress, styles.theme.accountAddress]}>
              {stringShortener(recipientAccount.metadata.address, 5, 5)}
            </Text>
          </View>

          <CircleCheckedSvg variant="fill" />
        </Picker.Toggle>
      </Picker>
  );
}
