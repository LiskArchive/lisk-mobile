import React from 'react';
import { View, Text } from 'react-native';

import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';

import getExternalApplicationSignatureRequestStyles from './styles';

export default function ExternalAppSignatureRequestSign({ onSubmit, onCancel }) {
  const { styles } = useTheme({ styles: getExternalApplicationSignatureRequestStyles });

  return (
    <>
      {/* TODO: Implement SignTransaction component based on WC RPC. */}
      {/* <SignTransaction .../> */}

      <Text style={{ marginBottom: 16 }}>ExternalAppSignatureRequestSign</Text>

      <View style={[styles.buttonContainer]}>
        <Button style={[styles.button]} onPress={onCancel}>
          Back
        </Button>

        <PrimaryButton style={[styles.button]} onPress={onSubmit}>
          Approve
        </PrimaryButton>
      </View>
    </>
  );
}
