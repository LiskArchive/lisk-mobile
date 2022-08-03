import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';

import getSendTokenApplicationsSelectStyles from './styles';
import Picker from '../../../../components/shared/Picker';
import { useBlockchainApplicationExplorer } from '../../../BlockchainApplication/hooks/useBlockchainApplicationExplorer';

export default function SendTokenApplicationsSelect({
  nextStep,
  // navigation,
  // route,
}) {
  const { applications } = useBlockchainApplicationExplorer();

  const { styles } = useTheme({
    styles: getSendTokenApplicationsSelectStyles(),
  });

  const [recipientApplication, setRecipientApplication] = useState(undefined);

  const defaultApplication = applications.data?.find(
    application => application.isDefault
  );

  function handleOnChangeRecipientApplication(selectedApplicationChainID) {
    const selectedApplication = applications.data?.find(
      application => application.chainID === selectedApplicationChainID
    );

    setRecipientApplication(selectedApplication);
  }

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <Picker>
          <Picker.Label>
            From Application
          </Picker.Label>

          <Picker.Toggle disabled style={{ container: { marginBottom: 16 } }}>
            {
              applications.isLoading ? (
                <Text>Loading...</Text>
              ) : (
                <View style={[styles.applicationNameContainer]}>
                  <Text>{defaultApplication?.name}</Text>
                  <Image
                    source={{ uri: defaultApplication?.images.logo.png }}
                    style={[styles.applicationLogoImage]}
                  />
                </View>
              )
            }
          </Picker.Toggle>
        </Picker>

        <Picker
          value={recipientApplication}
          onChange={handleOnChangeRecipientApplication}
        >
          <Picker.Label>
            To Application
          </Picker.Label>

          <Picker.Toggle
            disabled={applications.loading}
            placeholder="Select an Application"
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
