import React from 'react';
import { View, Text, Image } from 'react-native';
import { Controller } from 'react-hook-form';

import { PrimaryButton } from 'components/shared/toolBox/button';
import Picker from 'components/shared/Picker';
import Avatar from 'components/shared/avatar';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import { stringShortener } from 'utilities/helpers';
import { useTheme } from 'hooks/useTheme';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { useBlockchainApplicationExplorer } from '../../../BlockchainApplication/hooks/useBlockchainApplicationExplorer';

import getSendTokenApplicationsSelectStyles from './styles';

export default function SendTokenApplicationsSelect({
  nextStep,
  form
}) {
  const { applications } = useBlockchainApplicationExplorer();

  const { accounts } = useAccounts();

  const { styles } = useTheme({
    styles: getSendTokenApplicationsSelectStyles(),
  });

  if (applications.isLoading) {
    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={[styles.container]}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <Controller
          control={form.control}
          name="senderApplicationChainID"
          render={({ field }) => {
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
                    <Text>{senderApplication.name}</Text>
                    <Image
                      source={{ uri: senderApplication.images.logo.png }}
                      style={[styles.applicationLogoImage]}
                    />
                  </View>
                </Picker.Toggle>
              </Picker>
            );
          }}
        />

        <Controller
          control={form.control}
          name="recipientApplicationChainID"
          render={({ field }) => {
            const recipientApplication = applications?.data?.find(
              application => application.chainID === field.value
            );

            return (
              <Picker
                value={form.value}
                onChange={selectedApplicationChainID => field.onChange(selectedApplicationChainID)}
              >
                <Picker.Label>
                  To Application
                </Picker.Label>

                <Picker.Toggle
                  disabled={applications.loading}
                  placeholder="Select an Application"
                  style={{ container: { marginBottom: 16 } }}
                >
                  {recipientApplication && (
                    <View style={[styles.applicationNameContainer]}>
                      <Text>
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
                  {applications.data?.map((application) => (
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
          }}
        />

        <Controller
          control={form.control}
          name="recipientAccountAddress"
          render={({ field }) => {
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
          }}
        />
      </View>

      <PrimaryButton
        noTheme
        style={styles.button}
        onClick={() => nextStep()}
        title={'Continue'}
      />
    </View>
  );
}
