import React, { useState } from 'react';
import { View, Text } from 'react-native';

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

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <View style={[styles.container]}>
        <Picker
          value={recipientApplication}
          onChange={(selectedApplication) => setRecipientApplication(selectedApplication)}
        >
          <Picker.Label>
            From Application
          </Picker.Label>

          <Picker.Toggle disabled style={{ container: { marginBottom: 16 } }}>
            <Text>
              {applications.isLoading ? 'Loading...'
                : applications.data?.find(
                  application => application.isDefault
                )?.name}
            </Text>
          </Picker.Toggle>
        </Picker>

        <Picker
          value={recipientApplication}
          onChange={(selectedApplication) => setRecipientApplication(selectedApplication)}
        >
          <Picker.Label>
            To Application
          </Picker.Label>

          <Picker.Toggle
            disabled={applications.loading}
            placeholder="Select an Application"
          >
            {recipientApplication && (
              <Text>
                {applications.data?.find(
                  application => application.chainID === recipientApplication
                )?.name}
              </Text>
            )}
          </Picker.Toggle>

          <Picker.Menu>
            {applications.data?.map((application) => (
              <Picker.Item
                key={application.chainID}
                value={application.chainID}
              >
                {application.name}
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
